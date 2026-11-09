import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { isSupabaseConfigured, apiBaseUrl, supabase } from '../lib/supabase';
import { BookingConfirmationParams } from '../types/navigation';
import { OPTIONAL_EXTRAS } from '../data/extras';

export type LocalUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export type BookingActivity = {
  id: string;
  title: string;
  createdAt: string;
};

export type NotificationItem = BookingActivity & {
  message: string;
  readAt: string | null;
};

export type EmailDelivery = {
  customerSent: boolean;
  adminSent: boolean;
  emailError?: string;
};

export type OrderActivity = {
  id: string;
  item: string;
  amount: number;
  status: string;
  type: 'booking' | 'membership';
  createdAt: string;
};

type AuthContextValue = {
  user: LocalUser | null;
  bookings: BookingConfirmationParams[];
  activity: BookingActivity[];
  orders: OrderActivity[];
  notifications: NotificationItem[];
  isLoading: boolean;
  storageError: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveBooking: (booking: BookingConfirmationParams) => Promise<EmailDelivery>;
  saveOrder: (itemName: string, itemType: 'booking' | 'membership', totalAmount: number, billingPeriod?: string) => Promise<EmailDelivery>;
  refreshData: () => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function requireSupabase() {
  if (!supabase) {
    throw new Error('Supabase is not configured. Add the Supabase URL and publishable key to the app environment.');
  }
  return supabase;
}

function mapUser(authUser: User): LocalUser {
  return {
    id: authUser.id,
    name: String(authUser.user_metadata?.full_name ?? ''),
    email: authUser.email ?? '',
    createdAt: authUser.created_at,
  };
}

function throwIfError(error: { message: string } | null): void {
  if (error) throw new Error(error.message);
}

async function notifyServer(session: Session, type: 'booking' | 'order', id: string): Promise<EmailDelivery> {
  if (!apiBaseUrl) {
    return {
      customerSent: false,
      adminSent: false,
      emailError: 'Email service is not configured in the app. Set EXPO_PUBLIC_API_BASE_URL.',
    };
  }

  try {
    const response = await fetch(`${apiBaseUrl}/api/order-notification`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, id }),
    });
    const result = await response.json() as { customerSent?: boolean; adminSent?: boolean; error?: string };
    if (!response.ok) {
      return {
        customerSent: Boolean(result.customerSent),
        adminSent: Boolean(result.adminSent),
        emailError: result.error ?? 'The record was saved, but email delivery failed.',
      };
    }
    return {
      customerSent: Boolean(result.customerSent),
      adminSent: Boolean(result.adminSent),
    };
  } catch (error) {
    return {
      customerSent: false,
      adminSent: false,
      emailError: error instanceof Error ? error.message : 'The record was saved, but email delivery failed.',
    };
  }
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<BookingConfirmationParams[]>([]);
  const [activity, setActivity] = useState<BookingActivity[]>([]);
  const [orders, setOrders] = useState<OrderActivity[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    const client = requireSupabase();
    const { data: { user: currentUser }, error: sessionError } = await client.auth.getUser();
    throwIfError(sessionError);
    setAuthUser(currentUser);
    if (!currentUser) {
      setBookings([]);
      setActivity([]);
      setOrders([]);
      setNotifications([]);
      return;
    }

    const [profileResult, bookingResult, orderResult, notificationResult] = await Promise.all([
      client.from('profiles').select('full_name').eq('id', currentUser.id).maybeSingle(),
      client.from('bookings')
        .select('id, booking_ref, first_name, surname, email, phone, experience, players, hours, extras, subtotal, vat, total, preferred_date, preferred_time, special_request, created_at')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false }),
      client.from('checkout_orders')
        .select('id, item, amount, status, order_type, created_at')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false }),
      client.from('notifications')
        .select('id, title, message, read_at, created_at')
        .eq('user_id', currentUser.id)
        .order('created_at', { ascending: false }),
    ]);

    throwIfError(profileResult.error);
    throwIfError(bookingResult.error);
    throwIfError(orderResult.error);
    throwIfError(notificationResult.error);
    if (!bookingResult.data || !orderResult.data || !notificationResult.data) {
      throw new Error('Supabase returned incomplete account data. Please try again.');
    }
    const profileName = profileResult.data?.full_name;
    if (profileName && currentUser.user_metadata?.full_name !== profileName) {
      const { error } = await client.auth.updateUser({ data: { ...currentUser.user_metadata, full_name: profileName } });
      throwIfError(error);
    }

    const savedBookings = bookingResult.data.map((row) => {
      const extras = Array.isArray(row.extras) ? row.extras : [];
      const names = extras.map((extra: { name?: string }) => extra.name ?? '').filter(Boolean);
      return {
        name: row.first_name,
        surname: row.surname,
        email: row.email,
        phone: row.phone,
        experienceId: row.experience === 'ESPORTS ARENA'
          ? 'esports'
          : String(row.experience).toLowerCase().replaceAll(' ', '-'),
        experienceTitle: row.experience,
        players: row.players,
        sessionHours: row.hours,
        selectedExtraIds: names,
        subtotal: Number(row.subtotal),
        discount: 0,
        vat: Number(row.vat),
        total: Number(row.total),
        date: row.preferred_date ?? '',
        time: row.preferred_time ?? '',
        specialRequest: row.special_request ?? '',
        bookingRef: row.booking_ref ?? row.id.slice(0, 8).toUpperCase(),
      } satisfies BookingConfirmationParams;
    });

    const savedNotifications = notificationResult.data.map((row) => ({
      id: row.id,
      title: row.title,
      message: row.message,
      readAt: row.read_at,
      createdAt: row.created_at,
    }));
    const savedOrders = orderResult.data.map((row) => ({
      id: row.id,
      item: row.item,
      amount: Number(row.amount),
      status: row.status,
      type: row.order_type as 'booking' | 'membership',
      createdAt: row.created_at,
    }));

    setBookings(savedBookings);
    setOrders(savedOrders);
    setNotifications(savedNotifications);
    setActivity(savedNotifications.map(({ id, title, createdAt }) => ({ id, title, createdAt })));
    setStorageError(null);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setStorageError('Supabase is not configured. Add the app environment variables to connect your account.');
      setIsLoading(false);
      return;
    }

    let active = true;
    const client = supabase;
    void client.auth.getSession().then(async ({ data, error }) => {
      if (error) throw error;
      if (data.session) {
        setAuthUser(data.session.user);
        await refreshData();
      }
    }).catch((error: unknown) => {
      if (active) setStorageError(error instanceof Error ? error.message : 'Unable to load your account.');
    }).finally(() => {
      if (active) setIsLoading(false);
    });

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null);
      if (!session) {
        setBookings([]);
        setActivity([]);
        setOrders([]);
        setNotifications([]);
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [refreshData]);

  const value = useMemo<AuthContextValue>(() => ({
    user: authUser ? mapUser(authUser) : null,
    bookings,
    activity,
    orders,
    notifications,
    isLoading,
    storageError,
    signUp: async (name, email, password) => {
      const client = requireSupabase();
      const { data, error } = await client.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { full_name: name.trim() } },
      });
      throwIfError(error);
      if (!data.session) {
        throw new Error('Account created. Check your email to confirm the address, then log in. To sign in immediately, disable email confirmation in Supabase Auth settings.');
      }
      setAuthUser(data.user);
      await refreshData();
    },
    signIn: async (email, password) => {
      const client = requireSupabase();
      const { data, error } = await client.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      throwIfError(error);
      setAuthUser(data.user);
      await refreshData();
    },
    signOut: async () => {
      const { error } = await requireSupabase().auth.signOut();
      throwIfError(error);
      setAuthUser(null);
      setBookings([]);
      setActivity([]);
      setOrders([]);
      setNotifications([]);
    },
    saveBooking: async (booking) => {
      const client = requireSupabase();
      const { data: { session }, error: sessionError } = await client.auth.getSession();
      throwIfError(sessionError);
      if (!session) throw new Error('Sign in before saving a booking.');

      const experience = booking.experienceTitle.trim().toUpperCase();
      const { data, error } = await client.from('bookings').insert({
        user_id: session.user.id,
        first_name: booking.name.trim(),
        surname: booking.surname.trim(),
        email: booking.email.trim().toLowerCase(),
        phone: booking.phone.trim(),
        experience,
        players: booking.players,
        hours: booking.sessionHours,
        extras: booking.selectedExtraIds.map((id) => {
          const extra = OPTIONAL_EXTRAS.find((item) => item.id === id);
          if (!extra) throw new Error(`Unknown booking extra: ${id}`);
          return { name: extra.name };
        }),
        preferred_date: booking.date,
        preferred_time: booking.time,
        special_request: booking.specialRequest ?? '',
        booking_ref: booking.bookingRef,
      }).select('id, total').single();
      throwIfError(error);
      if (!data) throw new Error('Supabase did not return the saved booking.');

      const delivery = await notifyServer(session, 'booking', data.id);
      await refreshData();
      return delivery;
    },
    saveOrder: async (itemName, itemType, totalAmount, billingPeriod) => {
      const client = requireSupabase();
      const { data: { session }, error: sessionError } = await client.auth.getSession();
      throwIfError(sessionError);
      if (!session) throw new Error('Sign in before submitting an order.');
      const { data, error } = await client.from('checkout_orders').insert({
        user_id: session.user.id,
        order_type: itemType,
        item: itemName,
        amount: totalAmount,
        billing_period: billingPeriod ?? null,
      }).select('id').single();
      throwIfError(error);
      if (!data) throw new Error('Supabase did not return the saved order.');
      const delivery = await notifyServer(session, 'order', data.id);
      await refreshData();
      return delivery;
    },
    refreshData,
    markNotificationRead: async (id) => {
      const client = requireSupabase();
      const { error } = await client.from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id);
      throwIfError(error);
      await refreshData();
    },
  }), [activity, authUser, bookings, isLoading, notifications, orders, refreshData, storageError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}
