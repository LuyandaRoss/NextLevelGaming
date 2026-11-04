import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

const VALUES = [
  {
    title: 'Community',
    description: 'Make room for players of every experience level to meet, play, and improve together.',
  },
  {
    title: 'Fair play',
    description: 'Encourage respectful competition, good sportsmanship, and an enjoyable experience for everyone.',
  },
  {
    title: 'Progress',
    description: 'Keep learning, practising, and building opportunities for local gaming and esports.',
  },
];

const QUICK_FACTS = [
  { value: '3', label: 'Gaming experiences: PC, console, and esports' },
  { value: '1–8 hours', label: 'Session duration available in the fee calculator' },
  { value: 'Sandton', label: 'Johannesburg, South Africa' },
];

const TIPS = [
  'Choose the experience that fits your group: PC gaming, console gaming, or the esports arena.',
  'Use the fee calculator to set your group size, session length, and optional extras before requesting a booking.',
  'Choose a future booking date and a time in 24-hour format. For a booking today, select a time that has not passed.',
  'For tournaments, review the event format and check-in details before registering your team.',
];

export const AboutScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="ABOUT US" subtitle="Passion and profession, built around play" />

      <View style={styles.card}>
        <Text style={styles.heading}>PASSION AND PROFESSION</Text>
        <Text style={styles.body}>
          Next Level Gaming brings gaming and esports together in one place. We are passionate
          about the games people love and serious about creating a welcoming, well-organised
          experience for casual players, friends, teams, and competitors.
        </Text>
        <Text style={[styles.body, styles.paragraph]}>
          From a relaxed console session to a focused PC practice or a team event in the esports
          arena, our goal is to help every group find its way to play.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>OUR PURPOSE</Text>
        <Text style={styles.subheading}>Our mission</Text>
        <Text style={styles.body}>
          To make high-quality gaming and esports experiences more accessible, connect players
          through shared experiences, and support a positive local gaming community.
        </Text>
        <Text style={[styles.subheading, styles.valuesHeading]}>Our values</Text>
        {VALUES.map((value) => (
          <View key={value.title} style={styles.valueItem}>
            <Text style={styles.valueTitle}>{value.title}</Text>
            <Text style={styles.body}>{value.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>QUICK FACTS</Text>
        {QUICK_FACTS.map((fact) => (
          <View key={fact.label} style={styles.factRow}>
            <Text style={styles.factValue}>{fact.value}</Text>
            <Text style={styles.factLabel}>{fact.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>TIPS FOR YOUR VISIT</Text>
        {TIPS.map((tip, index) => (
          <View key={tip} style={styles.tipRow}>
            <Text style={styles.tipNumber}>{String(index + 1).padStart(2, '0')}</Text>
            <Text style={styles.body}>{tip}</Text>
          </View>
        ))}
      </View>

      <Button
        title="EXPLORE OUR EXPERIENCES"
        onPress={() => navigation.navigate('Overview')}
        variant="outline"
      />
      <Button
        title="BOOK YOUR SESSION"
        onPress={() => navigation.navigate('CalculateFees')}
        style={styles.bookButton}
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
    paddingBottom: 32,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  heading: {
    color: COLORS.primaryBright,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  subheading: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 6,
  },
  body: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    flexShrink: 1,
  },
  paragraph: {
    marginTop: 10,
  },
  valuesHeading: {
    marginTop: 16,
  },
  valueItem: {
    marginTop: 10,
  },
  valueTitle: {
    color: COLORS.textPrimary,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
    textTransform: 'capitalize',
  },
  factRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    gap: 12,
  },
  factValue: {
    minWidth: 80,
    color: COLORS.primaryBright,
    fontSize: 15,
    fontWeight: '800',
  },
  factLabel: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginTop: 10,
  },
  tipNumber: {
    color: COLORS.primaryBright,
    fontSize: 13,
    fontWeight: '800',
    paddingTop: 2,
  },
  bookButton: {
    marginTop: 2,
  },
});
