import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';

export default function CheckoutScreen() {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'fnb' | 'gpay'>('card');
  const [name, setName] = useState('Alex Morgan');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    Alert.alert('Payment Successful', 'Your booking and payment of R487.50 have been processed successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>SECURE CHECKOUT</Text>
        <Text style={styles.subtitle}>Complete your booking by selecting a payment method below.</Text>

        {/* Order Summary Breakdown */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryHeader}>ORDER SUMMARY</Text>
          <Text style={styles.summaryItemText}>Booking: Esports Arena</Text>
          <Text style={styles.summaryItemText}>Players: 2 Players</Text>
          <Text style={styles.summaryItemText}>Duration: 3 Hours</Text>
          <Text style={styles.summaryItemText}>Add-on: Snack Combo</Text>
          <View style={styles.divider} />
          <Text style={styles.summaryItemText}>Subtotal: R450.00</Text>
          <Text style={styles.summaryItemText}>Discount (10%): -R45.00</Text>
          <Text style={styles.summaryItemText}>VAT (15%): R82.50</Text>
          <View style={styles.divider} />
          <Text style={styles.summaryLabel}>TOTAL AMOUNT DUE</Text>
          <Text style={styles.summaryAmount}>R487.50</Text>
        </View>

        {/* Payment Method Selector */}
        <Text style={styles.sectionHeader}>SELECT PAYMENT METHOD</Text>
        <View style={styles.methodsRow}>
          <TouchableOpacity 
            style={[styles.methodButton, selectedMethod === 'card' && styles.activeMethod]}
            onPress={() => setSelectedMethod('card')}
          >
            <Text style={styles.methodText}>Credit Card</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.methodButton, selectedMethod === 'fnb' && styles.activeMethod]}
            onPress={() => setSelectedMethod('fnb')}
          >
            <Text style={styles.methodText}>FNB Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.methodButton, selectedMethod === 'gpay' && styles.activeMethod]}
            onPress={() => setSelectedMethod('gpay')}
          >
            <Text style={styles.methodText}>Google Pay</Text>
          </TouchableOpacity>
        </View>

        {/* Card Input Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>CARDHOLDER NAME</Text>
            <TextInput 
              style={styles.input} 
              value={name} 
              onChangeText={setName} 
              placeholderTextColor="#666" 
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CARD NUMBER</Text>
            <TextInput 
              style={styles.input} 
              placeholder="4532 •••• •••• 8821" 
              placeholderTextColor="#666" 
              keyboardType="numeric" 
              value={cardNumber}
              onChangeText={setCardNumber}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>EXPIRY DATE</Text>
              <TextInput 
                style={styles.input} 
                placeholder="MM/YY" 
                placeholderTextColor="#666" 
                value={expiry}
                onChangeText={setExpiry}
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput 
                style={styles.input} 
                placeholder="123" 
                placeholderTextColor="#666" 
                secureTextEntry 
                keyboardType="numeric" 
                value={cvv}
                onChangeText={setCvv}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handlePayment}>
            <Text style={styles.primaryButtonText}>PAY R487.50</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContent: { padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', letterSpacing: 1, marginBottom: 4, textAlign: 'center' },
  subtitle: { color: '#888', fontSize: 12, textAlign: 'center', marginBottom: 20 },
  summaryCard: { backgroundColor: '#141414', padding: 16, borderRadius: 4, marginBottom: 24, borderWidth: 1, borderColor: '#262626' },
  summaryHeader: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginBottom: 10, letterSpacing: 1 },
  summaryItemText: { color: '#AAA', fontSize: 12, marginVertical: 2 },
  divider: { height: 1, backgroundColor: '#262626', marginVertical: 8 },
  summaryLabel: { color: '#888', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginTop: 4 },
  summaryAmount: { color: '#E50914', fontSize: 24, fontWeight: '900', marginTop: 2 },
  sectionHeader: { color: '#888', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 10 },
  methodsRow: { flexDirection: 'row', marginBottom: 20 },
  methodButton: { flex: 1, backgroundColor: '#1A1A1A', padding: 12, alignItems: 'center', borderRadius: 4, borderWidth: 1, borderColor: '#262626', marginHorizontal: 3 },
  activeMethod: { borderColor: '#E50914', backgroundColor: '#1f1414' },
  methodText: { color: '#FFF', fontSize: 11, fontWeight: 'bold' },
  formContainer: { width: '100%' },
  inputGroup: { marginBottom: 16 },
  label: { color: '#888', fontSize: 10, fontWeight: '700', marginBottom: 6, letterSpacing: 1 },
  input: { backgroundColor: '#1A1A1A', color: '#FFF', padding: 12, borderRadius: 4, borderWidth: 1, borderColor: '#333', fontSize: 14 },
  row: { flexDirection: 'row' },
  primaryButton: { backgroundColor: '#E50914', padding: 16, alignItems: 'center', borderRadius: 4, marginTop: 10, marginBottom: 20 },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold', letterSpacing: 1, fontSize: 14 }
});