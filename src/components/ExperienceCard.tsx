import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { Button } from './Button';
import { ExperienceItem } from '../data/experiences';

interface ExperienceCardProps {
  experience: ExperienceItem;
  onView: () => void;
  onBook: () => void;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience, onView, onBook }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: experience.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{experience.title}</Text>
        <Text style={styles.desc}>{experience.shortDesc}</Text>

        <View style={styles.featuresList}>
          {experience.features.slice(0, 2).map((feat, idx) => (
            <Text key={idx} style={styles.featureItem}>
              • {feat}
            </Text>
          ))}
        </View>

        <View style={styles.btnRow}>
          <Button title="VIEW" onPress={onView} variant="secondary" style={styles.btnFlex} />
          <Button title="BOOK NOW" onPress={onBook} variant="primary" style={styles.btnFlex} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 16,
  },
  title: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  desc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    marginBottom: 10,
  },
  featuresList: {
    marginBottom: 14,
  },
  featureItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginVertical: 1,
  },
  btnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  btnFlex: {
    flex: 1,
  },
});