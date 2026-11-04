import React, { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { KeyboardAwareScrollView } from '../components/KeyboardAwareScrollView';
import { COLORS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;
type PaymentMethod = 'card' | 'fnb' | 'gpay';

const PAYMENT_METHODS: { id: PaymentMethod; label: string }[] = [
  { id: 'card', label: 'Credit Card' },
  { id: 'fnb', label: 'FNB Pay' },
  { id: 'gpay', label: 'Google Pay' },
];

function passesLuhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let doubleDigit = false;
  for (let index = digits.length - 1; index >= 0; index -= 1) {
    let digit = Number(digits[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }
  return sum % 10 === 0;
}

function isValidExpiry(expiry: string, now: Date = new Date()): boolean {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(expiry.trim());
  if (!match) return false;

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  return year > now.getFullYear() ||
    (year === now.getFullYear() && month >= now.getMonth() + 1);
}

function formatExpiryInput(value: string, previousValue: string): string {
  let digits = value.replace(/\D/g, '').slice(0, 4);

  if (
    previousValue.endsWith('/') &&
    digits.length === 2 &&
    value.trim() === digits
  ) {
    digits = digits.slice(0, 1);
  }

  if (digits.length < 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CheckoutScreen({ route, navigation }: Props) {
  const { itemName, totalAmount, billingPeriod } = route.params ?? {};
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [cardholderName, setCardholderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvFocused, setCvvFocused] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const amount = typeof totalAmount === 'number' && Number.isFinite(totalAmount) && totalAmount >= 0
    ? totalAmount
    : null;
  const formattedAmount = amount === null ? 'Amount unavailable' : `R${amount.toFixed(2)}`;

  const handlePay = () => {
    if (amount === null) {
      Alert.alert('Unable to Continue', 'The checkout amount is missing. Please return and select your order again.');
      return;
    }

    if (selectedMethod !== 'card') {
      Alert.alert(
        'Payment Method Unavailable',
        'FNB Pay and Google Pay are not connected in this demo. Select Credit Card to validate a demo booking.',
      );
      return;
    }

    const nextErrors: Record<string, string> = {};
    if (!/^[\p{L}][\p{L}\s'.-]{1,}$/u.test(cardholderName.trim())) {
      nextErrors.cardholderName = 'Enter the cardholder name.';
    }
    if (!passesLuhnCheck(cardNumber)) {
      nextErrors.cardNumber = 'Enter a valid card number.';
    }
    if (!isValidExpiry(expiry)) {
      nextErrors.expiry = 'Enter a valid, unexpired date as MM/YY.';
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      nextErrors.cvv = 'Enter a 3 or 4 digit security code.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    Alert.alert(
      'Booking Successful',
      'Your demo booking was completed successfully. No payment was processed.',
      [
        {
          text: 'Go to Home',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Home' }] }),
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>CHECKOUT</Text>
        <Text style={styles.subtitle}>Review your order and enter valid details to complete a demo booking.</Text>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeading}>ORDER SUMMARY</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Item</Text>
            <Text style={styles.summaryValue}>{itemName ?? 'Gaming session'}</Text>
          </View>
          {billingPeriod ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Billing period</Text>
              <Text style={styles.summaryValue}>Monthly</Text>
            </View>
          ) : null}
          <View style={styles.divider} />
          <Text style={styles.totalLabel}>TOTAL AMOUNT DUE</Text>
          <Text style={styles.totalAmount}>
            {formattedAmount}{billingPeriod && amount !== null ? ' / month' : ''}
          </Text>
        </View>

        <Text style={styles.sectionHeading}>SELECT PAYMENT METHOD</Text>
        <View style={styles.methodsRow}>
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[styles.methodButton, selectedMethod === method.id && styles.activeMethod]}
              onPress={() => setSelectedMethod(method.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedMethod === method.id }}
            >
              <Text style={styles.methodText}>{method.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {selectedMethod === 'card' ? (
          <View style={styles.form}>
            <InputField
              label="Cardholder Name"
              placeholder="Name on card"
              value={cardholderName}
              onChangeText={setCardholderName}
              autoCapitalize="words"
              error={errors.cardholderName}
            />
            <InputField
              label="Card Number"
              placeholder="Enter card number"
              value={cardNumber}
              onChangeText={(value) => setCardNumber(value.replace(/[^\d ]/g, ''))}
              keyboardType="number-pad"
              maxLength={23}
              error={errors.cardNumber}
            />
            <View style={styles.cardDetailsRow}>
              <View style={styles.cardDetailInput}>
                <InputField
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={expiry}
                  onChangeText={(value) => {
                    setExpiry((previousValue) => formatExpiryInput(value, previousValue));
                  }}
                  keyboardType="number-pad"
                  maxLength={5}
                  error={errors.expiry}
                />
              </View>
              <View style={styles.cardDetailInput}>
                <InputField
                  label="CVV"
                  placeholder="CVV"
                  value={cvv}
                  onChangeText={setCvv}
                  secureTextEntry={!cvvFocused}
                  onFocus={() => setCvvFocused(true)}
                  onBlur={() => setCvvFocused(false)}
                  keyboardType="number-pad"
                  maxLength={4}
                  error={errors.cvv}
                />
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.methodInfo}>
            <Text style={styles.methodInfoTitle}>{selectedMethod === 'fnb' ? 'FNB Pay' : 'Google Pay'}</Text>
            <Text style={styles.methodInfoBody}>
              Continue with this option to preview the checkout. No external payment app is opened in demo mode.
            </Text>
          </View>
        )}

        <View style={styles.demoNotice}>
          <Text style={styles.demoNoticeTitle}>DEMO MODE</Text>
          <Text style={styles.demoNoticeBody}>
            Demo only: card details are checked for format but never sent, saved, or charged. Do not enter real card details.
          </Text>
        </View>

        <Button
          title={amount === null ? 'AMOUNT UNAVAILABLE' : `COMPLETE DEMO BOOKING - ${formattedAmount}`}
          onPress={handlePay}
          disabled={amount === null}
          style={styles.payButton}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 180 },
  header: { color: COLORS.textPrimary, fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  subtitle: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 20 },
  summaryCard: {
    backgroundColor: COLORS.surface,
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 22,
  },
  summaryHeading: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800', letterSpacing: 1, marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 8 },
  summaryLabel: { color: COLORS.textSecondary, fontSize: 13 },
  summaryValue: { flex: 1, color: COLORS.textPrimary, fontSize: 13, fontWeight: '600', textAlign: 'right' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  totalLabel: { color: COLORS.textSecondary, fontSize: 10, fontWeight: '700', letterSpacing: 1, marginTop: 4 },
  totalAmount: { color: COLORS.primaryBright, fontSize: 24, fontWeight: '900', marginTop: 4 },
  sectionHeading: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  methodsRow: { flexDirection: 'row', marginHorizontal: -3, marginBottom: 18 },
  methodButton: {
    flex: 1,
    minHeight: 48,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 6,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginHorizontal: 3,
  },
  activeMethod: { borderColor: COLORS.primaryBright, backgroundColor: COLORS.surfaceLight },
  methodText: { color: COLORS.textPrimary, fontSize: 11, fontWeight: '700', textAlign: 'center' },
  form: { marginBottom: 4 },
  cardDetailsRow: { flexDirection: 'row', gap: 12 },
  cardDetailInput: { flex: 1 },
  methodInfo: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  methodInfoTitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700' },
  methodInfoBody: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 5 },
  demoNotice: {
    backgroundColor: COLORS.surfaceLight,
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryBright,
    marginTop: 4,
  },
  demoNoticeTitle: { color: COLORS.primaryBright, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  demoNoticeBody: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 5 },
  payButton: { marginTop: 14 },
});
