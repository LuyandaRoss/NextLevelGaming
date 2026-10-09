import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
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

  // Johannesburg Arena Coordinates
  const arenaLocation = {
    latitude: -26.1076,
    longitude: 28.0567,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

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
        <Text style={styles.infoText}>📍 154 Rivonia Road, Sandton, Johannesburg, South Africa</Text>
        <Text style={styles.infoText}>📞 Phone: +27 (0)11 987 6543</Text>
        <Text style={styles.infoText}>✉ Email: info@nextlevelgaming.co.za</Text>
        <Text style={styles.infoText}>🌐 Socials: @NextLevelArena_ZA</Text>
      </View>

      {/* Interactive Map View */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={arenaLocation}
          customMapStyle={darkMapStyle}
        >
          <Marker
            coordinate={{ latitude: arenaLocation.latitude, longitude: arenaLocation.longitude }}
            title="Next Level Gaming & Esports Arena"
            description="Johannesburg, South Africa"
            pinColor="#E50914"
          />
        </MapView>
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

// Dark mode map theme matching your esports design system
const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#2c2c2c' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
];

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
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  formHeader: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 12 },
});