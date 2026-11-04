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
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../theme/colors';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';

const SQUAD_MEMBERS = [
  { id: '1', name: 'Alex Morgan (You)', role: 'Captain' },
  { id: '2', name: 'Devon_X', role: 'Rifler' },
  { id: '3', name: 'Viper_99', role: 'Support' },
];

export default function SquadManagementScreen() {
  const [inviteVisible, setInviteVisible] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isOpeningEmail, setIsOpeningEmail] = useState(false);

  const closeInvite = () => {
    setInviteVisible(false);
    setErrors({});
  };

  const handleInvite = async () => {
    const nextErrors: Record<string, string> = {};
    if (!inviteName.trim()) nextErrors.name = 'Enter the player name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inviteEmail.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const subject = 'Squad invitation - Rocket League Squad A';
    const body = [
      `Hi ${inviteName.trim()},`,
      '',
      'I would like to invite you to join Rocket League Squad A at Next Level Gaming.',
      'Please reply to this email to confirm your interest. The team captain will confirm your place.',
      '',
      'This email is an invitation only; you are not added to the roster until the captain confirms.',
    ].join('\n');
    const mailto = `mailto:${encodeURIComponent(inviteEmail.trim())}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setIsOpeningEmail(true);
    try {
      if (!(await Linking.canOpenURL(mailto))) {
        Alert.alert('Email Is Not Available', 'Set up an email app to prepare and send the invitation.');
        return;
      }
      await Linking.openURL(mailto);
      Alert.alert(
        'Finish the Invitation',
        'An email draft has been opened. Send it to invite the player; they are not added to the roster until the captain confirms.',
      );
      closeInvite();
    } catch (error) {
      Alert.alert('Unable to Open Email', 'The invitation was not sent. Please try again.');
    } finally {
      setIsOpeningEmail(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.headerTitle}>SQUAD MANAGEMENT</Text>
        <View style={styles.teamInfoCard}>
          <Text style={styles.teamName}>ROCKET LEAGUE SQUAD A</Text>
          <Text style={styles.teamStatus}>Active in Community Cup</Text>
        </View>

        <Text style={styles.sectionHeader}>ROSTER MEMBERS ({SQUAD_MEMBERS.length}/5)</Text>
        <ScrollView style={styles.roster}>
          {SQUAD_MEMBERS.map((member) => (
            <View key={member.id} style={styles.memberRow}>
              <View>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRole}>{member.role}</Text>
              </View>
              <View style={styles.statusDot} />
            </View>
          ))}
        </ScrollView>

        <Button
          title="INVITE SQUAD MEMBER"
          onPress={() => setInviteVisible(true)}
          style={styles.primaryButton}
        />
      </View>

      <Modal
        visible={inviteVisible}
        transparent
        animationType="slide"
        onRequestClose={closeInvite}
      >
        <KeyboardAvoidingView
          style={styles.modalKeyboardAvoiding}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.modalOverlay}>
            <ScrollView
              contentContainerStyle={styles.modalScrollContent}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
              automaticallyAdjustKeyboardInsets={Platform.OS === 'ios'}
            >
              <View style={styles.modalCard}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>INVITE A PLAYER</Text>
                  <TouchableOpacity onPress={closeInvite} accessibilityRole="button">
                    <Text style={styles.closeText}>CLOSE</Text>
                  </TouchableOpacity>
                </View>
                <InputField
                  label="Player Name"
                  placeholder="Player name"
                  value={inviteName}
                  onChangeText={setInviteName}
                  error={errors.name}
                />
                <InputField
                  label="Player Email"
                  placeholder="player@example.com"
                  value={inviteEmail}
                  onChangeText={setInviteEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                />
                <Button
                  title={isOpeningEmail ? 'OPENING EMAIL...' : 'PREPARE EMAIL INVITATION'}
                  onPress={handleInvite}
                  disabled={isOpeningEmail}
                />
                <Text style={styles.inviteNote}>
                  The email app will open with an invitation draft. Send it there; the player is not added automatically.
                </Text>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  content: { flex: 1 },
  headerTitle: { color: COLORS.textPrimary, fontSize: 18, fontWeight: '800', letterSpacing: 1, marginBottom: 20 },
  teamInfoCard: { backgroundColor: COLORS.surface, padding: 16, borderRadius: 8, marginBottom: 24, borderLeftWidth: 4, borderLeftColor: COLORS.primaryBright },
  teamName: { color: COLORS.textPrimary, fontSize: 16, fontWeight: 'bold' },
  teamStatus: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  sectionHeader: { color: COLORS.textSecondary, fontSize: 11, fontWeight: '700', marginBottom: 12, letterSpacing: 1 },
  roster: { flex: 1 },
  memberRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.surface, padding: 14, borderRadius: 6, marginBottom: 8, borderWidth: 1, borderColor: COLORS.border },
  memberName: { color: COLORS.textPrimary, fontSize: 13, fontWeight: '600' },
  memberRole: { color: COLORS.textSecondary, fontSize: 11, marginTop: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success },
  primaryButton: { marginTop: 12, marginBottom: 12 },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: COLORS.overlay },
  modalKeyboardAvoiding: { flex: 1 },
  modalScrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20, paddingBottom: 180 },
  modalCard: { backgroundColor: COLORS.background, borderRadius: 10, padding: 20, borderWidth: 1, borderColor: COLORS.border },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { color: COLORS.textPrimary, fontSize: 15, fontWeight: '900' },
  closeText: { color: COLORS.primaryBright, fontSize: 11, fontWeight: '800', padding: 8 },
  inviteNote: { color: COLORS.textMuted, fontSize: 11, lineHeight: 17, textAlign: 'center', marginTop: 8 },
});
