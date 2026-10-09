import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { ExperienceCard } from '../components/ExperienceCard';
import { Button } from '../components/Button';
import { EXPERIENCES } from '../data/experiences';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Overview'>;

export const OverviewScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="EXPERIENCES OVERVIEW" subtitle="Explore available setups" />

      {EXPERIENCES.map((exp) => (
        <ExperienceCard
          key={exp.id}
          experience={exp}
          onView={() => {
            if (exp.id === 'pc-gaming') navigation.navigate('PCGaming');
            else if (exp.id === 'console-gaming') navigation.navigate('ConsoleGaming');
            else navigation.navigate('Esports');
          }}
          onBook={() => navigation.navigate('CalculateFees', { initialExperienceId: exp.id })}
        />
      ))}

      {/* VR Coming Soon Banner */}
      <View style={styles.vrCard}>
        <Text style={styles.vrTag}>COMING SOON</Text>
        <Text style={styles.vrTitle}>VR IMMERSION SUITE</Text>
        <Text style={styles.vrDesc}>
          360° motion VR setups and multiplayer wireless arenas are currently in setup.
        </Text>
      </View>

      {/* How it works */}
      <SectionTitle title="HOW IT WORKS" />
      <View style={styles.stepCard}>
        <Text style={styles.stepNum}>01. Choose Your Experience</Text>
        <Text style={styles.stepDesc}>Select between PC, Console, or Esports Arena.</Text>

        <Text style={[styles.stepNum, { marginTop: 10 }]}>02. Calculate Instant Fee</Text>
        <Text style={styles.stepDesc}>Use our live fee calculator to select hours and add-ons.</Text>

        <Text style={[styles.stepNum, { marginTop: 10 }]}>03. Confirm & Play</Text>
        <Text style={styles.stepDesc}>Submit your booking request and arrive at the venue!</Text>
      </View>

      <Button
        title="CALCULATE FEES NOW"
        onPress={() => navigation.navigate('CalculateFees')}
        variant="primary"
      />
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
  vrCard: {
    backgroundColor: COLORS.surfaceLight,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primaryBright,
    borderStyle: 'dashed',
    marginBottom: 20,
  },
  vrTag: {
    color: COLORS.primaryBright,
    fontSize: 11,
    fontWeight: '800',
  },
  vrTitle: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '800',
    marginVertical: 4,
  },
  vrDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
  },
  stepCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  stepNum: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
  stepDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
});