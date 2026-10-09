import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { PriceSummary } from '../components/PriceSummary';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Confirmation'>;

export const ConfirmationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { booking } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.statusBox}>
        <Text style={styles.checkIcon}>✓</Text>
        <Text style={styles.successTitle}>BOOKING REQUEST RECEIVED</Text>
        <Text style={styles.refText}>Reference #: {booking.bookingRef}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>RESERVATION DETAILS</Text>
        <Text style={styles.infoRow}>Client: {booking.name} {booking.surname}</Text>
        <Text style={styles.infoRow}>Experience: {booking.experienceTitle}</Text>
        <Text style={styles.infoRow}>Date & Time: {booking.date} @ {booking.time}</Text>
        <Text style={styles.infoRow}>Players: {booking.players}</Text>
        {booking.specialRequest ? (
          <Text style={styles.infoRow}>Note: {booking.specialRequest}</Text>
        ) : null}
      </View>

      <PriceSummary
        subtotal={booking.subtotal}
        discount={booking.discount}
        vat={booking.vat}
        total={booking.total}
      />

      <View style={styles.btnColumn}>
        <Button title="BACK TO HOME" onPress={() => navigation.navigate('Home')} variant="primary" />
        <Button title="VIEW EXPERIENCES" onPress={() => navigation.navigate('Overview')} variant="outline" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  statusBox: {
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.success,
    marginBottom: 20,
    marginTop: 10,
  },
  checkIcon: { color: COLORS.success, fontSize: 40, fontWeight: 'bold' },
  successTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '900', marginTop: 10 },
  refText: { color: COLORS.primaryBright, fontSize: 14, fontWeight: '700', marginTop: 4 },
  card: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  cardTitle: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '800', marginBottom: 8 },
  infoRow: { color: COLORS.textPrimary, fontSize: 14, marginVertical: 2 },
  btnColumn: { gap: 10, marginBottom: 30 },
});