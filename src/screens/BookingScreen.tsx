import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { InputField } from '../components/InputField';
import { PriceSummary } from '../components/PriceSummary';
import { Button } from '../components/Button';
import { KeyboardAwareScrollView } from '../components/KeyboardAwareScrollView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList, BookingConfirmationParams } from '../types/navigation';
import { useAuth } from '../context/AuthContext';
import { formatDateForInput, validateBookingDateTime } from '../utils/bookingDate';

type Props = NativeStackScreenProps<RootStackParamList, 'Booking'>;

export const BookingScreen: React.FC<Props> = ({ route, navigation }) => {
  const { quotation } = route.params;
  const { user, saveBooking } = useAuth();

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    let valid = true;
    const errs: Record<string, string> = {};

    if (!date.trim()) {
      errs.date = 'Preferred date is required (YYYY-MM-DD).';
      valid = false;
    } else {
      const dateTimeError = validateBookingDateTime(date, time);
      if (dateTimeError?.toLowerCase().includes('time')) {
        errs.time = dateTimeError;
        valid = false;
      } else if (dateTimeError) {
        errs.date = dateTimeError;
        valid = false;
      }
    }

    setErrors(errs);
    return valid;
  };

  const handleSubmitBooking = async () => {
    if (!validate()) return;

    if (!user) {
      navigation.navigate('LoginSignup', { returnTo: 'Booking' });
      return;
    }

    const refNum = 'NLG-' + Math.floor(100000 + Math.random() * 900000);

    const bookingPayload: BookingConfirmationParams = {
      ...quotation,
      date: date.trim(),
      time: time.trim(),
      specialRequest: specialRequest.trim(),
      bookingRef: refNum,
    };

    setIsSubmitting(true);
    try {
      await saveBooking(bookingPayload);
      navigation.replace('Confirmation', { booking: bookingPayload });
    } catch (error) {
      Alert.alert(
        'Unable to Save Booking',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAwareScrollView style={styles.container} contentContainerStyle={styles.content}>
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
        placeholder={formatDateForInput(new Date())}
        value={date}
        onChangeText={setDate}
        error={errors.date}
      />

      <InputField
        label="Preferred Time (24-hour HH:mm)"
        placeholder="14:00"
        value={time}
        onChangeText={setTime}
        error={errors.time}
        keyboardType="numbers-and-punctuation"
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
        disabled={isSubmitting}
        style={{ marginBottom: 30 }}
      />
    </KeyboardAwareScrollView>
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
