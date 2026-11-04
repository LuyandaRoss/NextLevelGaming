import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { COLORS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Payment'>;

export default function PaymentScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>PAYMENT OPTIONS</Text>
        <Text style={styles.body}>
          Select a payment method in checkout to preview the payment flow. The current app build
          is in demo mode and does not connect to a payment provider or charge your account.
        </Text>
        <Button
          title="CONTINUE TO CHECKOUT"
          onPress={() => navigation.navigate('Checkout')}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, justifyContent: 'center' },
  content: { padding: 24 },
  title: { color: COLORS.textPrimary, fontSize: 20, fontWeight: '900', marginBottom: 12 },
  body: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 21 },
  button: { marginTop: 18 },
});
