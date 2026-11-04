import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { BookingConfirmationParams } from '../types/navigation';

const ACCOUNTS_STORAGE_KEY = 'next-level-gaming.accounts.v1';
const SESSION_STORAGE_KEY = 'next-level-gaming.session.v1';

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

type AccountRecord = {
  user: LocalUser;
  passwordSalt: string;
  passwordHash: string;
  bookings: BookingConfirmationParams[];
  activity: BookingActivity[];
};

type AuthContextValue = {
  user: LocalUser | null;
  bookings: BookingConfirmationParams[];
  activity: BookingActivity[];
  isLoading: boolean;
  storageError: string | null;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  saveBooking: (booking: BookingConfirmationParams) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function readAccounts(): Promise<AccountRecord[]> {
  const serialized = await AsyncStorage.getItem(ACCOUNTS_STORAGE_KEY);
  if (!serialized) return [];

  const accounts: unknown = JSON.parse(serialized);
  if (!Array.isArray(accounts)) {
    throw new Error('Saved account data is invalid. Clear app storage and try again.');
  }

  return accounts as AccountRecord[];
}

async function writeAccounts(accounts: AccountRecord[]): Promise<void> {
  await AsyncStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
}

async function createToken(): Promise<string> {
  const bytes = await Crypto.getRandomBytesAsync(16);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password: string, salt: string): Promise<string> {
  return Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${salt}:${password}`,
  );
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<LocalUser | null>(null);
  const [bookings, setBookings] = useState<BookingConfirmationParams[]>([]);
  const [activity, setActivity] = useState<BookingActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadSession = async () => {
      try {
        const sessionId = await AsyncStorage.getItem(SESSION_STORAGE_KEY);
        if (!sessionId) return;

        const account = (await readAccounts()).find((entry) => entry.user.id === sessionId);
        if (!account) {
          await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
          return;
        }

        if (active) {
          setUser(account.user);
          setBookings(account.bookings);
          setActivity(account.activity);
        }
      } catch (error) {
        if (active) {
          setStorageError(
            error instanceof Error ? error.message : 'Unable to load saved account data.',
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    void loadSession();
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      bookings,
      activity,
      isLoading,
      storageError,
      signUp: async (name, email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const accounts = await readAccounts();
        if (accounts.some((entry) => entry.user.email === normalizedEmail)) {
          throw new Error('An account with this email already exists. Please log in.');
        }

        const createdAt = new Date().toISOString();
        const accountUser: LocalUser = {
          id: await createToken(),
          name: name.trim(),
          email: normalizedEmail,
          createdAt,
        };
        const passwordSalt = await createToken();
        const account: AccountRecord = {
          user: accountUser,
          passwordSalt,
          passwordHash: await hashPassword(password, passwordSalt),
          bookings: [],
          activity: [{ id: await createToken(), title: 'Account created', createdAt }],
        };

        await writeAccounts([...accounts, account]);
        await AsyncStorage.setItem(SESSION_STORAGE_KEY, accountUser.id);
        setUser(accountUser);
        setBookings([]);
        setActivity(account.activity);
        setStorageError(null);
      },
      signIn: async (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const account = (await readAccounts()).find(
          (entry) => entry.user.email === normalizedEmail,
        );
        if (!account || (await hashPassword(password, account.passwordSalt)) !== account.passwordHash) {
          throw new Error('Email or password is incorrect.');
        }

        await AsyncStorage.setItem(SESSION_STORAGE_KEY, account.user.id);
        setUser(account.user);
        setBookings(account.bookings);
        setActivity(account.activity);
        setStorageError(null);
      },
      signOut: async () => {
        await AsyncStorage.removeItem(SESSION_STORAGE_KEY);
        setUser(null);
        setBookings([]);
        setActivity([]);
      },
      saveBooking: async (booking) => {
        if (!user) throw new Error('Sign in before saving a booking.');

        const accounts = await readAccounts();
        const accountIndex = accounts.findIndex((entry) => entry.user.id === user.id);
        if (accountIndex === -1) {
          throw new Error('Your saved account could not be found. Please sign in again.');
        }

        const account = accounts[accountIndex];
        const updatedAccount: AccountRecord = {
          ...account,
          bookings: [booking, ...account.bookings],
          activity: [
            {
              id: await createToken(),
              title: `Booking requested: ${booking.experienceTitle}`,
              createdAt: new Date().toISOString(),
            },
            ...account.activity,
          ],
        };
        accounts[accountIndex] = updatedAccount;

        await writeAccounts(accounts);
        setBookings(updatedAccount.bookings);
        setActivity(updatedAccount.activity);
      },
    }),
    [activity, bookings, isLoading, storageError, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider.');
  return context;
}
