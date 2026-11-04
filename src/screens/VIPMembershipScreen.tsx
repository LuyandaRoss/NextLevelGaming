import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { COLORS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'VIPMembership'>;

const PASSES = [
  {
    name: 'Bronze Pass',
    tier: 'BRONZE',
    price: 99,
    color: '#A5683F',
    benefits: [
      '10% off all hourly rates',
      'Free energy drink on Fridays',
      'Priority booking (24 hours early)',
      'Access to member-only Discord',
    ],
  },
  {
    name: 'Gold Pass',
    tier: 'GOLD',
    price: 199,
    color: '#B99645',
    benefits: [
      '20% off all hourly rates',
      'Free snack combo every visit',
      'Access to VIP Lounge',
      'Free entry to weekly tournaments',
      '1 hour free gaming per month',
    ],
  },
  {
    name: 'Platinum Pass',
    tier: 'PLATINUM',
    price: 399,
    color: '#8D98A6',
    benefits: [
      'Unlimited casual gaming (off-peak)',
      'Free entry to all tournaments',
      'Exclusive Next Level merch drop',
      'Dedicated locker and private headset',
      '2 hours free gaming per month',
    ],
  },
];

export function VIPMembershipScreen({ navigation }: Props) {
  const handleJoinPass = (pass: (typeof PASSES)[number]) => {
    navigation.navigate('Checkout', {
      itemName: `${pass.name} Membership`,
      itemType: 'membership',
      totalAmount: pass.price,
      billingPeriod: 'month',
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.headerTitle}>VIP MEMBERSHIP</Text>
      <Text style={styles.headerSubtitle}>
        Choose your membership and continue to the in-app checkout.
      </Text>

      {PASSES.map((pass, index) => (
        <View
          key={pass.tier}
          style={[styles.card, index === 1 && styles.popularCard]}
        >
          {index === 1 ? (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>POPULAR</Text>
            </View>
          ) : null}
          <View style={[styles.membershipArt, { backgroundColor: pass.color }]}>
            <View style={styles.artTopRow}>
              <Text style={styles.artBrand}>NLG</Text>
              <Text style={styles.artTier}>{pass.tier}</Text>
            </View>
            <View style={styles.artDivider} />
            <Text style={styles.artTitle}>NEXT LEVEL GAMING</Text>
            <Text style={styles.artFooter}>MEMBERSHIP CARD</Text>
            <View style={styles.artAccent} />
          </View>

          <Text style={styles.passTitle}>{pass.name}</Text>
          <Text style={styles.price}>R{pass.price} <Text style={styles.pricePeriod}>/ month</Text></Text>
          {pass.benefits.map((benefit) => (
            <Text key={benefit} style={styles.perkItem}>• {benefit}</Text>
          ))}
          <Button
            title={`JOIN ${pass.tier}`}
            onPress={() => handleJoinPass(pass)}
            variant={index === 1 ? 'primary' : 'secondary'}
            style={styles.joinButton}
          />
        </View>
      ))}

      <Text style={styles.sectionHeader}>MEMBER BENEFITS</Text>
      <View style={styles.infoCard}>
        <Text style={styles.ruleItem}>
          • <Text style={styles.ruleTitle}>Priority Booking:</Text> VIP members can book their
          favorite stations up to 7 days in advance.
        </Text>
        <Text style={styles.ruleItem}>
          • <Text style={styles.ruleTitle}>Discounted Snacks:</Text> 15% off the entire cafeteria
          menu for Gold and Platinum members.
        </Text>
        <Text style={styles.ruleItem}>
          • <Text style={styles.ruleTitle}>Tournament Seeding:</Text> Platinum members receive
          priority seeding in official Next Level tournaments.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContainer: { padding: 20, paddingBottom: 36 },
  headerTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  headerSubtitle: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 20 },
  sectionHeader: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700', marginBottom: 10, letterSpacing: 1, marginTop: 10 },
  card: { backgroundColor: COLORS.surface, padding: 16, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  popularCard: { borderColor: COLORS.primaryBright },
  membershipArt: {
    minHeight: 152,
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  artTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  artBrand: { color: '#FFFFFF', fontSize: 26, fontWeight: '900', letterSpacing: 3 },
  artTier: { color: '#FFFFFF', fontSize: 11, fontWeight: '800', letterSpacing: 2 },
  artDivider: { height: 1, width: '100%', backgroundColor: 'rgba(255,255,255,0.45)', marginTop: 10 },
  artTitle: { color: '#FFFFFF', fontSize: 14, fontWeight: '800', letterSpacing: 1, marginTop: 14 },
  artFooter: { color: 'rgba(255,255,255,0.8)', fontSize: 9, fontWeight: '700', letterSpacing: 2, marginTop: 4 },
  artAccent: {
    position: 'absolute',
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    right: -42,
    bottom: -60,
  },
  badgeContainer: { alignSelf: 'flex-end', backgroundColor: COLORS.primaryBright, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 3, marginBottom: 8 },
  badgeText: { color: COLORS.textPrimary, fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  passTitle: { color: COLORS.textPrimary, fontSize: 16, fontWeight: '800' },
  price: { color: COLORS.primaryBright, fontSize: 20, fontWeight: '900', marginTop: 4, marginBottom: 8 },
  pricePeriod: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '500' },
  perkItem: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginVertical: 3 },
  joinButton: { marginTop: 12 },
  infoCard: { backgroundColor: COLORS.surface, padding: 16, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, marginBottom: 20 },
  ruleItem: { color: COLORS.textSecondary, fontSize: 12, marginVertical: 6, lineHeight: 18 },
  ruleTitle: { color: COLORS.textPrimary, fontWeight: '700' },
});
