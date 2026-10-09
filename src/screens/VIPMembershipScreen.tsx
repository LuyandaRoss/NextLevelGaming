import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../theme/colors';

export function VIPMembershipScreen() {
  const handleJoinPass = (passName: string) => {
    Alert.alert('VIP Membership', `You selected the ${passName}. Proceeding to secure checkout.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>VIP MEMBERSHIP</Text>
        <Text style={styles.headerSubtitle}>Level up your experience with exclusive perks, priority booking, and discounts.</Text>

        {/* Bronze Pass */}
        <View style={styles.card}>
          <Text style={styles.passTitle}>Bronze Pass</Text>
          <Text style={styles.perkItem}>• 10% off all hourly rates</Text>
          <Text style={styles.perkItem}>• Free energy drink on Fridays</Text>
          <Text style={styles.perkItem}>• Priority booking (24 hours early)</Text>
          <Text style={styles.perkItem}>• Access to member-only Discord</Text>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleJoinPass('Bronze Pass')}
          >
            <Text style={styles.actionButtonText}>JOIN BRONZE</Text>
          </TouchableOpacity>
        </View>

        {/* Gold Pass (Popular) */}
        <View style={[styles.card, styles.popularCard]}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>POPULAR</Text>
          </View>
          <Text style={styles.passTitle}>Gold Pass</Text>
          <Text style={styles.perkItem}>• 20% off all hourly rates</Text>
          <Text style={styles.perkItem}>• Free snack combo every visit</Text>
          <Text style={styles.perkItem}>• Access to VIP Lounge</Text>
          <Text style={styles.perkItem}>• Free entry to weekly tournaments</Text>
          <Text style={styles.perkItem}>• 1 hour free gaming per month</Text>
          <TouchableOpacity 
            style={[styles.actionButton, styles.goldButton]}
            onPress={() => handleJoinPass('Gold Pass')}
          >
            <Text style={[styles.actionButtonText, styles.goldButtonText]}>JOIN GOLD</Text>
          </TouchableOpacity>
        </View>

        {/* Platinum Pass */}
        <View style={styles.card}>
          <Text style={styles.passTitle}>Platinum Pass</Text>
          <Text style={styles.perkItem}>• Unlimited casual gaming (off-peak)</Text>
          <Text style={styles.perkItem}>• Free entry to all tournaments</Text>
          <Text style={styles.perkItem}>• Exclusive Next Level merch drop</Text>
          <Text style={styles.perkItem}>• Dedicated locker & private headset</Text>
          <Text style={styles.perkItem}>• 2 hours free gaming per month</Text>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleJoinPass('Platinum Pass')}
          >
            <Text style={styles.actionButtonText}>JOIN PLATINUM</Text>
          </TouchableOpacity>
        </View>

        {/* Member Benefits Summary */}
        <Text style={styles.sectionHeader}>MEMBER BENEFITS</Text>
        <View style={styles.infoCard}>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Priority Booking:</Text> VIP members can book their favorite stations up to 7 days in advance.</Text>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Discounted Snacks:</Text> 15% off the entire cafeteria menu for Gold and Platinum members.</Text>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Tournament Seeding:</Text> Platinum members receive priority seeding in all official Next Level tournaments.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContainer: { padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  headerSubtitle: { color: '#888', fontSize: 12, marginBottom: 20 },
  sectionHeader: { color: '#888', fontSize: 11, fontWeight: '700', marginBottom: 10, letterSpacing: 1, marginTop: 10 },
  card: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, marginBottom: 16, borderWidth: 1, borderColor: '#262626' },
  popularCard: { borderColor: '#E50914' },
  badgeContainer: { position: 'absolute', top: -10, right: 16, backgroundColor: '#E50914', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 2 },
  badgeText: { color: '#FFF', fontSize: 9, fontWeight: 'bold', letterSpacing: 1 },
  passTitle: { color: '#FFF', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  perkItem: { color: '#AAA', fontSize: 12, marginVertical: 4 },
  actionButton: { backgroundColor: '#262626', padding: 12, alignItems: 'center', borderRadius: 4, marginTop: 14 },
  actionButtonText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  goldButton: { backgroundColor: '#FFF' },
  goldButtonText: { color: '#000' },
  infoCard: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, borderWidth: 1, borderColor: '#262626', marginBottom: 30 },
  ruleItem: { color: '#AAA', fontSize: 12, marginVertical: 6, lineHeight: 18 },
  ruleTitle: { color: '#FFF', fontWeight: 'bold' },
});