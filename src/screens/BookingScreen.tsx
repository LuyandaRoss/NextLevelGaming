import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { InputField } from '../components/InputField';
import { PriceSummary } from '../components/PriceSummary';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, BookingConfirmationParams } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

export const BookingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { quotation } = route.params;

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    let valid = true;
    const errs: Record<string, string> = {};

    if (!date.trim()) {
      errs.date = 'Preferred date is required (e.g. YYYY-MM-DD)';
      valid = false;
    }
    if (!time.trim()) {
      errs.time = 'Preferred time slot is required (e.g. 14:00)';
      valid = false;
    }

    setErrors(errs);
    return valid;
  };

  const handleSubmitBooking = () => {
    if (!validate()) return;

    // Generate random reference number
    const refNum = 'NLG-' + Math.floor(100000 + Math.random() * 900000);

    const bookingPayload: BookingConfirmationParams = {
      ...quotation,
      date,
      time,
      specialRequest,
      bookingRef: refNum,
    };

    navigation.replace('Confirmation', { booking: bookingPayload });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="BOOKING REQUEST" subtitle="Finalize your reservation details" />

      {/* Overview Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.cardHeading}>CUSTOMER & EXPERIENCE SUMMARY</Text>
        <Text style={styles.textLine}>Name: {quotation.name} {quotation.surname}</Text>
        <Text style={styles.textLine}>Contact: {quotation.email} | {quotation.phone}</Text>
        <Text style={styles.textLine}>Selected: {quotation.experienceTitle}</Text>
        <Text style={styles.textLine}>Players: {quotation.players} | Duration: {quotation.sessionHours} hrs</Text>
      </View>

      <InputField
        label="Preferred Date (YYYY-MM-DD)"
        placeholder="2026-10-25"
        value={date}
        onChangeText={setDate}
        error={errors.date}
      />

      <InputField
        label="Preferred Time Slot"
        placeholder="14:00 PM"
        value={time}
        onChangeText={setTime}
        error={errors.time}
      />

      <InputField
        label="Special Requests / Birthday Notes"
        placeholder="e.g. Need 2 extra gaming chairs, setup birthday banner"
        multiline={true}
        numberOfLines={3}
        value={specialRequest}
        onChangeText={setSpecialRequest}
      />

      <PriceSummary
        subtotal={quotation.subtotal}
        discount={quotation.discount}
        vat={quotation.vat}
        total={quotation.total}
      />

      <Button
        title="SUBMIT BOOKING REQUEST"
        onPress={handleSubmitBooking}
        variant="primary"
        style={{ marginBottom: 30 }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  summaryCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  cardHeading: { color: COLORS.primaryBright, fontSize: 13, fontWeight: '800', marginBottom: 6 },
  textLine: { color: COLORS.textSecondary, fontSize: 13, marginVertical: 2 },
});
