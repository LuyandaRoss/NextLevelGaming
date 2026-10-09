import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Brand Logo Header */}
      <View style={styles.brandContainer}>
        <Image 
          source={require('../../images&vids/logo.jpeg')} 
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Hero Banner */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1000&q=80' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTag}>JOHANNESBURG, SOUTH AFRICA</Text>
          <Text style={styles.heroTitle}>TAKE YOUR GAMING TO THE NEXT LEVEL</Text>
          <Text style={styles.heroSub}>
            Johannesburg’s premier competitive esports arena & console lounge. High-FPS gaming, tournaments, and events.
          </Text>
          <View style={styles.heroBtnGroup}>
            <Button
              title="BOOK YOUR EXPERIENCE"
              onPress={() => navigation.navigate('CalculateFees')}
              variant="primary"
            />
            <Button
              title="EXPLORE EXPERIENCES"
              onPress={() => navigation.navigate('Overview')}
              variant="outline"
            />
          </View>
        </View>
      </View>

      {/* Featured Experiences Quick Links */}
      <SectionTitle title="FEATURED EXPERIENCES" subtitle="Choose your arena setup" />
      <View style={styles.grid}>
        <View style={styles.gridItem}>
          <Text style={styles.gridTitle}>PC GAMING</Text>
          <Button title="VIEW SETUP" onPress={() => navigation.navigate('PCGaming')} variant="secondary" />
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.gridTitle}>CONSOLE GAMING</Text>
          <Button title="VIEW SETUP" onPress={() => navigation.navigate('ConsoleGaming')} variant="secondary" />
        </View>
        <View style={styles.gridItem}>
          <Text style={styles.gridTitle}>ESPORTS ARENA</Text>
          <Button title="VIEW SETUP" onPress={() => navigation.navigate('Esports')} variant="secondary" />
        </View>
      </View>

      {/* Why Choose Us */}
      <SectionTitle title="WHY CHOOSE NEXT LEVEL" />
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>⚡ 240Hz High Refresh Rigs</Text>
        <Text style={styles.infoDesc}>Low latency network routing optimized for competitive gaming.</Text>

        <Text style={[styles.infoTitle, { marginTop: 12 }]}>🏆 Official Tournaments & Events</Text>
        <Text style={styles.infoDesc}>Hosting weekly scrims, school leagues, and corporate team events.</Text>

        <Text style={[styles.infoTitle, { marginTop: 12 }]}>🎮 Next-Gen Console Lounges</Text>
        <Text style={styles.infoDesc}>4K HDR OLED screens and private couch gaming zones.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 16,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logoImage: {
    width: 120,
    height: 120,
  },
  heroContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.surface,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heroImage: {
    width: '100%',
    height: 200,
  },
  heroOverlay: {
    padding: 16,
  },
  heroTag: {
    color: COLORS.primaryBright,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  heroTitle: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: '900',
    marginVertical: 8,
  },
  heroSub: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 16,
    lineHeight: 18,
  },
  heroBtnGroup: {
    gap: 8,
  },
  grid: {
    gap: 12,
    marginBottom: 20,
  },
  gridItem: {
    backgroundColor: COLORS.surface,
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gridTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 8,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 30,
  },
  infoTitle: {
    color: COLORS.textPrimary,
    fontSize: 15,
    fontWeight: '700',
  },
  infoDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
});