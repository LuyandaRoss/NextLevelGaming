import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme/colors';
import { RootStackParamList, BookingConfirmationParams } from '../types/navigation';
import { formatBookingDate, validateBookingDateTime } from '../utils/bookingDate';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerHub'>;

function isUpcoming(booking: BookingConfirmationParams): boolean {
  return Boolean(booking.date && booking.time && validateBookingDateTime(booking.date, booking.time) === null);
}

function compareBookings(a: BookingConfirmationParams, b: BookingConfirmationParams): number {
  return `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`);
}

export function PlayerHubScreen({ navigation }: Props) {
  const { user, bookings, activity, orders, isLoading, storageError, signOut } = useAuth();
  const upcomingBookings = bookings.filter(isUpcoming).sort(compareBookings);
  const pastBookings = bookings.filter((booking) => !isUpcoming(booking)).sort(compareBookings).reverse();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      Alert.alert(
        'Unable to Log Out',
        error instanceof Error ? error.message : 'Please try again.',
      );
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={styles.bodyText}>Loading your profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>PLAYER PROFILE</Text>
          <Text style={styles.heading}>Sign in to your account</Text>
          <Text style={styles.bodyText}>
            Create an account or log in to access your profile and booking requests across your devices.
          </Text>
          {storageError ? <Text style={styles.errorText}>{storageError}</Text> : null}
          <Button
            title="LOG IN OR SIGN UP"
            onPress={() => navigation.navigate('LoginSignup')}
            style={styles.cardButton}
          />
          <Button
            title="START A BOOKING"
            onPress={() => navigation.navigate('CalculateFees')}
            variant="outline"
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileCard}>
        <Text style={styles.eyebrow}>PLAYER PROFILE</Text>
        <Text style={styles.heading}>{user.name}</Text>
        <Text style={styles.bodyText}>{user.email}</Text>
        <Text style={styles.caption}>
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.caption}>Your profile and booking requests are synced with your account.</Text>
      </View>

      {storageError ? <Text style={styles.errorText}>{storageError}</Text> : null}

      <Text style={styles.sectionTitle}>UPCOMING BOOKINGS</Text>
      {upcomingBookings.length ? (
        upcomingBookings.map((booking) => (
          <View key={booking.bookingRef} style={styles.bookingCard}>
            <Text style={styles.bookingTitle}>{booking.experienceTitle}</Text>
            <Text style={styles.bodyText}>
              {booking.date && booking.time
                ? `${formatBookingDate(booking.date)} at ${booking.time}`
                : 'Date and time to be confirmed'}
            </Text>
            <Text style={styles.caption}>Reference: {booking.bookingRef}</Text>
            <Text style={styles.caption}>Status: Pending venue confirmation</Text>
          </View>
        ))
      ) : (
        <View style={styles.card}>
          <Text style={styles.bodyText}>You do not have any upcoming bookings.</Text>
          <Button
            title="BOOK A SESSION"
            onPress={() => navigation.navigate('CalculateFees')}
            style={styles.cardButton}
          />
        </View>
      )}

      <Text style={styles.sectionTitle}>BOOKING HISTORY</Text>
      {pastBookings.length ? (
        pastBookings.map((booking) => (
          <View key={booking.bookingRef} style={styles.bookingCard}>
            <Text style={styles.bookingTitle}>{booking.experienceTitle}</Text>
            <Text style={styles.bodyText}>
              {booking.date && booking.time
                ? `${formatBookingDate(booking.date)} at ${booking.time}`
                : 'Date and time to be confirmed'}
            </Text>
            <Text style={styles.caption}>Reference: {booking.bookingRef}</Text>
          </View>
        ))
      ) : (
        <View style={styles.card}>
          <Text style={styles.bodyText}>Completed sessions will appear here.</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>ORDERS & MEMBERSHIPS</Text>
      {orders.length ? (
        orders.map((order) => (
          <View key={order.id} style={styles.bookingCard}>
            <Text style={styles.bookingTitle}>{order.item}</Text>
            <Text style={styles.bodyText}>R{order.amount.toFixed(2)} · {order.status.toUpperCase()}</Text>
            <Text style={styles.caption}>{new Date(order.createdAt).toLocaleDateString()}</Text>
          </View>
        ))
      ) : (
        <View style={styles.card}>
          <Text style={styles.bodyText}>Membership and order requests will appear here.</Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>RECENT ACTIVITY</Text>
      {activity.length ? (
        activity.map((item) => (
          <View key={item.id} style={styles.activityRow}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <Text style={styles.caption}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        ))
      ) : (
        <View style={styles.card}>
          <Text style={styles.bodyText}>Your account activity will appear here.</Text>
        </View>
      )}

      <Button title="LOG OUT" onPress={handleSignOut} variant="outline" style={styles.logoutButton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 32 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  profileCard: {
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryBright,
  },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  eyebrow: { color: COLORS.primaryBright, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  heading: { color: COLORS.textPrimary, fontSize: 20, fontWeight: '900', marginTop: 6 },
  bodyText: { color: COLORS.textSecondary, fontSize: 13, marginTop: 6 },
  caption: { color: COLORS.textMuted, fontSize: 11, marginTop: 6 },
  sectionTitle: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  bookingCard: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  bookingTitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700' },
  activityRow: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activityTitle: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '600' },
  cardButton: { marginTop: 12 },
  logoutButton: { marginTop: 14 },
  errorText: { color: COLORS.error, fontSize: 12, marginTop: 10 },
});
