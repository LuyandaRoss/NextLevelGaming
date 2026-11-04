import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';

type Tournament = {
  id: string;
  title: string;
  date: string;
  format: string;
  prize: string;
  status: string;
};

const TOURNAMENTS_DATA: Tournament[] = [
  {
    id: '1',
    title: 'Call of Duty: Warzone',
    date: 'Saturday, 15 August 2026 | 14:00',
    format: 'Trios (3v3) | Cross-platform',
    prize: 'R5,000 Pool',
    status: 'EVENT DATE PASSED',
  },
  {
    id: '2',
    title: 'Valorant 5v5',
    date: 'Saturday, 22 August 2026 | 10:00',
    format: '5v5 Standard | PC Only',
    prize: 'R10,000 Pool',
    status: 'EVENT DATE PASSED',
  },
];

const STANDINGS_DATA = [
  { rank: '#1', team: 'Team Void', wins: '24', points: '2,450' },
  { rank: '#2', team: 'GhostGaming', wins: '20', points: '2,100' },
];

export function TournamentsScreen() {
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [captainEmail, setCaptainEmail] = useState('');
  const [playerNames, setPlayerNames] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOpeningEmail, setIsOpeningEmail] = useState(false);

  const closeRegistration = () => {
    setSelectedTournament(null);
    setErrors({});
  };

  const handleRegisterInterest = async () => {
    const nextErrors: Record<string, string> = {};
    if (!teamName.trim()) nextErrors.teamName = 'Enter your team name.';
    if (!captainName.trim()) nextErrors.captainName = 'Enter the captain name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captainEmail.trim())) {
      nextErrors.captainEmail = 'Enter a valid captain email.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !selectedTournament) return;

    const subject = `Tournament team enquiry - ${selectedTournament.title}`;
    const body = [
      'Hello Next Level Gaming,',
      '',
      'Please contact me about team registration for an upcoming tournament.',
      `Tournament of interest: ${selectedTournament.title}`,
      `Team name: ${teamName.trim()}`,
      `Captain: ${captainName.trim()}`,
      `Captain email: ${captainEmail.trim()}`,
      `Players: ${playerNames.trim() || 'To be confirmed'}`,
      '',
      `The listed event date (${selectedTournament.date}) has passed. I am asking about a future event, not registering for that past event.`,
      '',
      'Please let me know when registration opens.',
    ].join('\n');
    const mailto = `mailto:info@nextlevelgaming.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setIsOpeningEmail(true);
    try {
      if (!(await Linking.canOpenURL(mailto))) {
        Alert.alert(
          'Email Is Not Available',
          'Set up an email app or contact info@nextlevelgaming.co.za about the next tournament.',
        );
        return;
      }
      await Linking.openURL(mailto);
      Alert.alert(
        'Finish Your Enquiry',
        'An email draft has been opened. Send it to the venue; your team is not registered until the organizer confirms.',
      );
      closeRegistration();
    } catch (error) {
      Alert.alert(
        'Unable to Open Email',
        'Your team has not been registered. Please contact info@nextlevelgaming.co.za.',
      );
    } finally {
      setIsOpeningEmail(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>TOURNAMENTS & LEAGUES</Text>
        <Text style={styles.headerSubtitle}>
          See the event information and contact the organizer about upcoming team registration.
        </Text>

        {TOURNAMENTS_DATA.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.gameLabel}>{item.title.toUpperCase()}</Text>
              <Text style={styles.statusBadge}>{item.status}</Text>
            </View>
            <Text style={styles.detailsText}>Date: {item.date}</Text>
            <Text style={styles.detailsText}>Format: {item.format}</Text>
            <Text style={styles.prizeText}>Prize Pool: {item.prize}</Text>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => setSelectedTournament(item)}
              accessibilityRole="button"
            >
              <Text style={styles.actionButtonText}>ASK ABOUT NEXT EVENT</Text>
            </TouchableOpacity>
          </View>
        ))}

        <Text style={styles.sectionHeader}>TOURNAMENT RULES & FORMAT</Text>
        <View style={styles.infoCard}>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Check-in:</Text> Teams must check in 30 minutes before the scheduled start time. Late teams forfeit their first match.</Text>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Equipment:</Text> We provide peripherals. Players may bring their own mice and headsets.</Text>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Fair play:</Text> Follow the event rules and organizer instructions throughout the tournament.</Text>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Disputes:</Text> Raise match disputes with the tournament administrator promptly.</Text>
        </View>

        <Text style={styles.sectionHeader}>CURRENT STANDINGS (SEASON 4)</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCellHeader, { flex: 0.6 }]}>Rank</Text>
            <Text style={[styles.tableCellHeader, { flex: 2 }]}>Team</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Wins</Text>
            <Text style={[styles.tableCellHeader, { flex: 1 }]}>Points</Text>
          </View>
          {STANDINGS_DATA.map((row) => (
            <View key={row.rank} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.6, color: COLORS.primaryBright, fontWeight: 'bold' }]}>{row.rank}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{row.team}</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{row.wins}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{row.points}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={selectedTournament !== null}
        transparent
        animationType="slide"
        onRequestClose={closeRegistration}
      >
        <KeyboardAvoidingView
          style={styles.modalKeyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalOverlay}>
            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalContent}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
              automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
            >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>TEAM REGISTRATION ENQUIRY</Text>
              <TouchableOpacity onPress={closeRegistration} accessibilityRole="button">
                <Text style={styles.closeText}>CLOSE</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTournament}>{selectedTournament?.title}</Text>
            <Text style={styles.warning}>
              The listed event date has passed. This sends an enquiry about a future event, not a registration for the past event.
            </Text>
            <InputField
              label="Team Name"
              placeholder="Your team name"
              value={teamName}
              onChangeText={setTeamName}
              error={errors.teamName}
            />
            <InputField
              label="Captain Name"
              placeholder="Team captain"
              value={captainName}
              onChangeText={setCaptainName}
              error={errors.captainName}
            />
            <InputField
              label="Captain Email"
              placeholder="captain@example.com"
              value={captainEmail}
              onChangeText={setCaptainEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.captainEmail}
            />
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PLAYER NAMES (OPTIONAL)</Text>
              <TextInput
                style={styles.playerInput}
                placeholder="Add player names"
                placeholderTextColor={COLORS.textMuted}
                value={playerNames}
                onChangeText={setPlayerNames}
                multiline
              />
            </View>
            <Button
              title={isOpeningEmail ? 'OPENING EMAIL...' : 'CONTINUE IN EMAIL'}
              onPress={handleRegisterInterest}
              disabled={isOpeningEmail}
            />
            <Text style={styles.emailNote}>
              Review and send the email draft. The organizer must confirm an actual team registration.
            </Text>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollContainer: { padding: 20 },
  headerTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '900', letterSpacing: 1, marginBottom: 4 },
  headerSubtitle: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 20 },
  sectionHeader: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700', marginBottom: 10, letterSpacing: 1, marginTop: 20 },
  card: { backgroundColor: COLORS.surface, padding: 16, borderRadius: 8, marginBottom: 16, borderWidth: 1, borderColor: COLORS.border },
  row: { gap: 8, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  gameLabel: { flex: 1, color: COLORS.primaryBright, fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  statusBadge: { color: COLORS.textMuted, fontSize: 9, fontWeight: '700', textAlign: 'right' },
  detailsText: { color: COLORS.textSecondary, fontSize: 12, marginVertical: 2 },
  prizeText: { color: COLORS.textPrimary, fontSize: 13, fontWeight: 'bold', marginTop: 6, marginBottom: 10 },
  actionButton: { backgroundColor: COLORS.primary, padding: 12, alignItems: 'center', borderRadius: 6 },
  actionButtonText: { color: COLORS.textPrimary, fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  infoCard: { backgroundColor: COLORS.surface, padding: 16, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border },
  ruleItem: { color: COLORS.textSecondary, fontSize: 12, marginVertical: 6, lineHeight: 18 },
  ruleTitle: { color: COLORS.textPrimary, fontWeight: 'bold' },
  table: { backgroundColor: COLORS.surface, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden', marginBottom: 30 },
  tableRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  tableHeader: { backgroundColor: COLORS.surfaceLight },
  tableCellHeader: { color: COLORS.textSecondary, fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  tableCell: { color: COLORS.textPrimary, fontSize: 12 },
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: COLORS.overlay },
  modalKeyboardAvoiding: { flex: 1 },
  modalScroll: { flexShrink: 1, maxHeight: '90%', backgroundColor: COLORS.background, borderTopLeftRadius: 14, borderTopRightRadius: 14 },
  modalContent: { padding: 20, paddingBottom: 180 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  modalTitle: { flex: 1, color: COLORS.textPrimary, fontSize: 15, fontWeight: '900' },
  closeText: { color: COLORS.primaryBright, fontSize: 11, fontWeight: '800', padding: 8 },
  modalTournament: { color: COLORS.primaryBright, fontSize: 13, fontWeight: '700', marginBottom: 8 },
  warning: { color: COLORS.textSecondary, fontSize: 12, lineHeight: 18, marginBottom: 16 },
  inputGroup: { marginBottom: 16 },
  inputLabel: { color: COLORS.textSecondary, fontSize: 12, fontWeight: '700', marginBottom: 6 },
  playerInput: { minHeight: 80, color: COLORS.textPrimary, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: 6, padding: 12, textAlignVertical: 'top' },
  emailNote: { color: COLORS.textMuted, fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 8 },
});
