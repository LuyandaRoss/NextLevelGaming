import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';

export default function CheckoutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>SECURE CHECKOUT</Text>
      
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>TOTAL AMOUNT DUE</Text>
        <Text style={styles.summaryAmount}>R496.80</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>CARDHOLDER NAME</Text>
          <TextInput style={styles.input} placeholder="Alex Morgan" placeholderTextColor="#666" />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CARD NUMBER</Text>
          <TextInput style={styles.input} placeholder="4532 •••• •••• 8821" placeholderTextColor="#666" keyboardType="numeric" />
        </View>

        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>EXPIRY DATE</Text>
            <TextInput style={styles.input} placeholder="MM/YY" placeholderTextColor="#666" />
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>CVV</Text>
            <TextInput style={styles.input} placeholder="123" placeholderTextColor="#666" secureTextEntry keyboardType="numeric" />
          </View>
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>PAY R496.80</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20, justifyContent: 'center' },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', letterSpacing: 1, marginBottom: 20, textAlign: 'center' },
  summaryCard: { backgroundColor: '#141414', padding: 20, borderRadius: 4, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#262626' },
  summaryLabel: { color: '#888', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  summaryAmount: { color: '#E50914', fontSize: 28, fontWeight: '900', marginTop: 6 },
  formContainer: { width: '100%' },
  inputGroup: { marginBottom: 16 },
  label: { color: '#888', fontSize: 10, fontWeight: '700', marginBottom: 6, letterSpacing: 1 },
  input: { backgroundColor: '#1A1A1A', color: '#FFF', padding: 12, borderRadius: 4, borderWidth: 1, borderColor: '#333', fontSize: 14 },
  row: { flexDirection: 'row' },
  primaryButton: { backgroundColor: '#E50914', padding: 16, alignItems: 'center', borderRadius: 4, marginTop: 10 },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold', letterSpacing: 1, fontSize: 14 }
});