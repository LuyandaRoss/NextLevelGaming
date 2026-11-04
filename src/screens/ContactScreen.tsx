import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Alert, Linking, Platform, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { WebView } from 'react-native-webview';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';

const CONTACT_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLScpPd92J28NpGVEezbD1vuk6lHX_Ig1T2r2klYXcmpOmMZ4CA/viewform?embedded=true';

export const ContactScreen: React.FC = () => {
  const [formError, setFormError] = useState(false);
  const [formKey, setFormKey] = useState(0);

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
      {Platform.OS === 'web' ? (
        <View style={styles.formFallback}>
          <Text style={styles.formNote}>
            The embedded Google Form is available in the Android and iOS app. Email us directly if you need help.
          </Text>
          <TouchableOpacity
            onPress={() => handleOpenContactLink(
              'mailto:info@nextlevelgaming.co.za',
              'Email',
            )}
            accessibilityRole="button"
          >
            <Text style={styles.emailLink}>info@nextlevelgaming.co.za</Text>
          </TouchableOpacity>
        </View>
      ) : formError ? (
        <View style={styles.formFallback}>
          <Text style={styles.formNote}>
            The Google Form could not be loaded. Check your internet connection and try again.
          </Text>
          <Button
            title="RELOAD CONTACT FORM"
            onPress={() => {
              setFormError(false);
              setFormKey((key) => key + 1);
            }}
            variant="outline"
          />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <WebView
            key={formKey}
            source={{ uri: CONTACT_FORM_URL }}
            style={styles.formWebView}
            onError={() => setFormError(true)}
            onHttpError={(event) => {
              if (event.nativeEvent.statusCode >= 400) setFormError(true);
            }}
            startInLoadingState
            javaScriptEnabled
            domStorageEnabled
            nestedScrollEnabled
            bounces={false}
          />
        </View>
      )}
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
  formContainer: {
    height: 900,
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 30,
  },
  formWebView: { flex: 1, backgroundColor: COLORS.background },
  formFallback: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 30,
  },
  formNote: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 12 },
  emailLink: { color: COLORS.primaryBright, fontSize: 14, fontWeight: '700' },
});