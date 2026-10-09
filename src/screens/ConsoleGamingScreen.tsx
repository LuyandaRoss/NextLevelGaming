import React from 'react';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { EXPERIENCES } from '../data/experiences';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'ConsoleGaming'>;

export const ConsoleGamingScreen: React.FC<Props> = ({ navigation }) => {
  const consoleData = EXPERIENCES.find((e) => e.id === 'console-gaming')!;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: consoleData.image }} style={styles.heroImage} />

      <SectionTitle title={consoleData.title} subtitle="Next-Gen Lounge Gaming" />

      <Text style={styles.desc}>{consoleData.fullDesc}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoPrice}>Starting at R{consoleData.basePricePerHour} / hour per station</Text>
        <Text style={styles.infoDetail}>Capacity: Up to {consoleData.maxPlayers} concurrent players</Text>
      </View>

      <Text style={styles.subHeading}>CONSOLE FEATURES</Text>
      {consoleData.features.map((feat, idx) => (
        <View key={idx} style={styles.featureRow}>
          <Text style={styles.bullet}>✓</Text>
          <Text style={styles.featureText}>{feat}</Text>
        </View>
      ))}

      <View style={styles.btnRow}>
        <Button
          title="CALCULATE FEES"
          onPress={() => navigation.navigate('CalculateFees', { initialExperienceId: consoleData.id })}
          variant="outline"
          style={styles.btnFlex}
        />
        <Button
          title="BOOK EXPERIENCE"
          onPress={() => navigation.navigate('CalculateFees', { initialExperienceId: consoleData.id })}
          variant="primary"
          style={styles.btnFlex}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 16 },
  heroImage: { width: '100%', height: 220, borderRadius: 8 },
  desc: { color: COLORS.textSecondary, fontSize: 14, lineHeight: 22, marginBottom: 16 },
  infoBox: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryBright,
    marginBottom: 20,
  },
  infoPrice: { color: COLORS.primaryBright, fontSize: 16, fontWeight: '800' },
  infoDetail: { color: COLORS.textSecondary, fontSize: 13, marginTop: 4 },
  subHeading: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '800', marginBottom: 10 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  bullet: { color: COLORS.primaryBright, fontWeight: 'bold', marginRight: 8 },
  featureText: { color: COLORS.textSecondary, fontSize: 14 },
  btnRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  btnFlex: { flex: 1 },
});