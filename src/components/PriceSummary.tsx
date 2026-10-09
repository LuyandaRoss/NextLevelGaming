import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

interface PriceSummaryProps {
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
}

export const PriceSummary: React.FC<PriceSummaryProps> = ({ subtotal, discount, vat, total }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>QUOTATION SUMMARY</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Subtotal</Text>
        <Text style={styles.value}>R {subtotal.toFixed(2)}</Text>
      </View>

      {discount > 0 && (
        <View style={styles.row}>
          <Text style={[styles.label, styles.discountLabel]}>Group Discount</Text>
          <Text style={[styles.value, styles.discountValue]}>- R {discount.toFixed(2)}</Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.label}>VAT (15%)</Text>
        <Text style={styles.value}>R {vat.toFixed(2)}</Text>
      </View>

      <View style={[styles.row, styles.totalRow]}>
        <Text style={styles.totalLabel}>Estimated Total</Text>
        <Text style={styles.totalValue}>R {total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginVertical: 14,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  label: {
    color: COLORS.textSecondary,
    fontSize: 14,
  },
  value: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '600',
  },
  discountLabel: {
    color: COLORS.success,
  },
  discountValue: {
    color: COLORS.success,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    marginTop: 10,
    paddingTop: 10,
  },
  totalLabel: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '800',
  },
  totalValue: {
    color: COLORS.primaryBright,
    fontSize: 18,
    fontWeight: '900',
  },
});