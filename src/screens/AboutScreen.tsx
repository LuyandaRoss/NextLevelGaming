import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { SectionTitle } from '../components/SectionTitle';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'About'>;

export const AboutScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SectionTitle title="ABOUT US" subtitle="Next Level Gaming & Esports Arena" />

      <View style={styles.card}>
        <Text style={styles.heading}>ORGANIZATION DETAILS</Text>
        <Text style={styles.detail}>Client: Jason Naidoo</Text>
        <Text style={styles.detail}>Established: 2023</Text>
        <Text style={styles.detail}>Location: Johannesburg, South Africa</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>MISSION STATEMENT</Text>
        <Text style={styles.body}>
          To establish South Africa’s premier esports and entertainment venue, providing youth, gamers, and teams access to high-performance technology, competitive tournaments, and social events.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>SERVICES & PACKAGES</Text>
        <Text style={styles.bullet}>• Casual & Competitive Gaming Sessions</Text>
        <Text style={styles.bullet}>• Birthday Parties & Celebration Packages</Text>
        <Text style={styles.bullet}>• School Esports Leagues & Tournaments</Text>
        <Text style={styles.bullet}>• Corporate Team Building & Events</Text>
      </View>

      <Button
        title="BOOK YOUR SESSION NOW"
        onPress={() => navigation.navigate('CalculateFees')}
        style={{ marginTop: 10 }}
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
    marginBottom: 8,
  },
  detail: {
    color: COLORS.textPrimary,
    fontSize: 14,
    marginVertical: 2,
  },
  body: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  bullet: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginVertical: 3,
  },
});
