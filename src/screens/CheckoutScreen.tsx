import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { COLORS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

export default function CheckoutScreen({ route, navigation }: Props) {
  const { itemName, totalAmount, billingPeriod } = route.params ?? {};
  const { user, saveOrder } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const amount = typeof totalAmount === 'number' && Number.isFinite(totalAmount) && totalAmount > 0
    ? totalAmount
    : null;

  const submitOrder = async () => {
    if (!user) {
      navigation.navigate('LoginSignup', { returnTo: 'Checkout' });
      return;
    }
    if (!itemName || amount === null) {
      Alert.alert('Unable to Continue', 'The order details are missing. Please select a membership again.');
      return;
    }

    setIsSubmitting(true);
    try {
      const delivery = await saveOrder(itemName, 'membership', amount, billingPeriod);
      Alert.alert(
        delivery.emailError ? 'Order Saved — Email Not Sent' : 'Order Request Saved',
        delivery.emailError
          ? `Your order is saved as pending, but email notifications could not be sent. ${delivery.emailError}`
          : 'Your membership request is pending. No payment has been taken.',
        [{ text: 'VIEW PROFILE', onPress: () => navigation.replace('PlayerHub') }],
        { cancelable: false },
      );
    } catch (error) {
      Alert.alert('Unable to Save Order', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.header}>MEMBERSHIP ORDER</Text>
        <Text style={styles.subtitle}>Review the request before submitting it to the arena.</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeading}>ORDER SUMMARY</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Membership</Text>
            <Text style={styles.summaryValue}>{itemName ?? 'Membership not selected'}</Text>
          </View>
          {billingPeriod ? (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Billing period</Text>
              <Text style={styles.summaryValue}>{billingPeriod}</Text>
            </View>
          ) : null}
          <View style={styles.divider} />
          <Text style={styles.totalLabel}>REQUESTED AMOUNT</Text>
          <Text style={styles.totalAmount}>{amount === null ? 'Amount unavailable' : `R${amount.toFixed(2)}${billingPeriod ? ' / month' : ''}`}</Text>
        </View>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>NO PAYMENT IS TAKEN</Text>
          <Text style={styles.noticeBody}>
            This saves a pending membership order to your Supabase account. Payment processing is not enabled; do not enter card details.
          </Text>
        </View>
        <Button
          title={isSubmitting ? 'SUBMITTING...' : 'SUBMIT MEMBERSHIP REQUEST'}
          onPress={submitOrder}
          disabled={isSubmitting || amount === null}
          style={styles.submitButton}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingTop: 32 },
  header: { color: COLORS.textPrimary, fontSize: 20, fontWeight: '900', letterSpacing: 1 },
  subtitle: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 19, marginTop: 6, marginBottom: 20 },
  summaryCard: {
    backgroundColor: COLORS.surface,
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  summaryHeading: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '800', letterSpacing: 1, marginBottom: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12, marginBottom: 8 },
  summaryLabel: { color: COLORS.textSecondary, fontSize: 13 },
  summaryValue: { flex: 1, color: COLORS.textPrimary, fontSize: 13, fontWeight: '600', textAlign: 'right' },
  divider: { height: 1, backgroundColor: COLORS.border, marginVertical: 8 },
  totalLabel: { color: COLORS.textSecondary, fontSize: 10, fontWeight: '700', letterSpacing: 1, marginTop: 4 },
  totalAmount: { color: COLORS.primaryBright, fontSize: 24, fontWeight: '900', marginTop: 4 },
  notice: { backgroundColor: COLORS.surfaceLight, padding: 14, borderRadius: 8, borderLeftWidth: 4, borderLeftColor: COLORS.primaryBright },
  noticeTitle: { color: COLORS.primaryBright, fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  noticeBody: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginTop: 5 },
  submitButton: { marginTop: 18 },
});
