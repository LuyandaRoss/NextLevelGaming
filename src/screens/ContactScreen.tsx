import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, Linking, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export const ContactScreen: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Johannesburg Arena Coordinates
  const arenaLocation = {
    latitude: -26.1076,
    longitude: 28.0567,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleOpenMap = async () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      '154 Rivonia Road, Sandton, Johannesburg, South Africa',
    )}`;
    try {
      await Linking.openURL(mapUrl);
    } catch (error) {
      Alert.alert('Unable to Open Maps', 'Search for 154 Rivonia Road, Sandton, Johannesburg in your maps app.');
    }
  };

  const handleOpenContactLink = async (url: string, method: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert(`Unable to ${method}`, 'Please try again or use the contact form below.');
    }
  };

  const submitContactMessage = async () => {
    if (!name.trim() || !surname.trim() || !phone.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !message.trim()) {
      Alert.alert('Check Your Details', 'Enter your name, surname, phone, a valid email address, and a message.');
      return;
    }
    if (!supabase) {
      Alert.alert('Contact Form Unavailable', 'Supabase is not configured in this app.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        user_id: user?.id ?? null,
        name: name.trim(),
        surname: surname.trim(),
        phone: phone.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      });
      if (error) throw error;
      setName('');
      setSurname('');
      setPhone('');
      setMessage('');
      Alert.alert('Message Sent', 'Your message has been saved. The team will be in touch.');
    } catch (error) {
      Alert.alert('Unable to Send Message', error instanceof Error ? error.message : 'Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="CONTACT US" subtitle="Get in touch with the arena" />

      {/* Venue Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoHeading}>VENUE DETAILS</Text>
        <Text style={styles.infoText}>154 Rivonia Road, Sandton, Johannesburg, South Africa</Text>
        <TouchableOpacity onPress={() => handleOpenContactLink('tel:+27119876543', 'Call')}>
          <Text style={styles.infoText}>Phone: +27 (0)11 987 6543</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleOpenContactLink('mailto:info@nextlevelgaming.co.za', 'Email')}>
          <Text style={styles.infoText}>Email: info@nextlevelgaming.co.za</Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>Socials: @NextLevelArena_ZA</Text>
      </View>

      <View style={styles.mapContainer}>
        {Platform.OS === 'web' ? (
          <View style={styles.mapFallback}>
            <Text style={styles.infoText}>154 Rivonia Road, Sandton, Johannesburg, South Africa</Text>
            <Text style={styles.mapHint}>Open the location in Google Maps for directions.</Text>
          </View>
        ) : (
          <MapView
            style={styles.map}
            initialRegion={arenaLocation}
            customMapStyle={darkMapStyle}
          >
            <Marker
              coordinate={{ latitude: arenaLocation.latitude, longitude: arenaLocation.longitude }}
              title="Next Level Gaming & Esports Arena"
              description="154 Rivonia Road, Sandton, Johannesburg"
              pinColor="#E50914"
            />
          </MapView>
        )}
      </View>
      <Button
        title="OPEN VENUE IN MAPS"
        onPress={handleOpenMap}
        variant="outline"
        style={styles.mapButton}
      />

      <Text style={styles.formHeader}>CONTACT FORM</Text>
      <View style={styles.contactForm}>
        <InputField label="First Name" placeholder="Your first name" value={name} onChangeText={setName} />
        <InputField label="Surname" placeholder="Your surname" value={surname} onChangeText={setSurname} />
        <InputField label="Email" placeholder="name@example.com" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <InputField label="Phone" placeholder="+27..." value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <InputField label="Message" placeholder="How can we help?" value={message} onChangeText={setMessage} multiline numberOfLines={5} />
        <Button title={isSubmitting ? 'SENDING...' : 'SEND MESSAGE'} onPress={submitContactMessage} disabled={isSubmitting} />
      </View>
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
  mapFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  mapHint: { color: COLORS.textSecondary, fontSize: 12, marginTop: 8, textAlign: 'center' },
  mapButton: { marginTop: -12, marginBottom: 20 },
  formHeader: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 12 },
  contactForm: {
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    padding: 16,
    marginBottom: 30,
  },
});