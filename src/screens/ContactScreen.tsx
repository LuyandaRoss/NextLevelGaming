import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { InputField } from '../components/InputField';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Contact'>;

export const ContactScreen: React.FC<Props> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (!name || !email || !message) {
      Alert.alert('Incomplete Form', 'Please fill out all required fields before sending.');
      return;
    }
    Alert.alert('Message Sent', 'Thank you for contacting Next Level Gaming. Our team will get back to you shortly.');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="CONTACT US" subtitle="Get in touch with the arena" />

      {/* Venue Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoHeading}>VENUE DETAILS</Text>
        <Text style={styles.infoText}>📍 Johannesburg, South Africa</Text>
        <Text style={styles.infoText}>📞 Phone: +27 (0)11 987 6543</Text>
        <Text style={styles.infoText}>✉ Email: info@nextlevelgaming.co.za</Text>
        <Text style={styles.infoText}>🌐 Socials: @NextLevelArena_ZA</Text>
      </View>

      {/* Map visual placeholder */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>[ ARENA LOCATION MAP - JOHANNESBURG ]</Text>
      </View>

      <Text style={styles.formHeader}>SEND US A DIRECT MESSAGE</Text>

      <InputField label="Name" placeholder="Your Name" value={name} onChangeText={setName} />
      <InputField label="Email" placeholder="Your Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <InputField label="Phone" placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <InputField label="Message" placeholder="How can we help you?" value={message} onChangeText={setMessage} multiline numberOfLines={4} />

      <Button title="SEND MESSAGE" onPress={handleSendMessage} variant="primary" style={{ marginBottom: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  infoHeading: { color: COLORS.primaryBright, fontSize: 13, fontWeight: '800', marginBottom: 8 },
  infoText: { color: COLORS.textPrimary, fontSize: 14, marginVertical: 3 },
  mapPlaceholder: {
    height: 120,
    backgroundColor: COLORS.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapText: { color: COLORS.textMuted, fontSize: 12, fontWeight: '700' },
  formHeader: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 12 },
});