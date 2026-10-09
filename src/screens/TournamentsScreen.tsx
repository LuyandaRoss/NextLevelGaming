import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native';

const TOURNAMENTS_DATA = [
  { 
    id: '1', 
    title: 'Call of Duty: Warzone', 
    date: 'Saturday, 15 August 2026 | 14:00', 
    format: 'Trios (3v3) • Cross-platform',
    prize: 'R5,000 Pool', 
    status: 'REGISTERING' 
  },
  { 
    id: '2', 
    title: 'Valorant 5v5', 
    date: 'Saturday, 22 August 2026 | 10:00', 
    format: '5v5 Standard • PC Only',
    prize: 'R10,000 Pool', 
    status: 'UPCOMING' 
  },
];

const STANDINGS_DATA = [
  { rank: '#1', team: 'Team Void', wins: '24', points: '2,450' },
  { rank: '#2', team: 'GhostGaming', wins: '20', points: '2,100' },
];

export function TournamentsScreen() {
  const handleRegister = (tournamentTitle: string) => {
    Alert.alert('Register Team', `You have initiated registration for ${tournamentTitle}. Our team will contact your captain.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.headerTitle}>TOURNAMENTS & LEAGUES</Text>
        <Text style={styles.headerSubtitle}>Compete for glory, cash prizes, and official rankings.</Text>

        {/* Tournament List */}
        {TOURNAMENTS_DATA.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.gameLabel}>{item.title.toUpperCase()}</Text>
              <Text style={styles.statusBadge}>{item.status}</Text>
            </View>
            <Text style={styles.detailsText}>📅 {item.date}</Text>
            <Text style={styles.detailsText}>🎮 {item.format}</Text>
            <Text style={styles.prizeText}>Prize Pool: {item.prize}</Text>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => handleRegister(item.title)}
            >
              <Text style={styles.actionButtonText}>REGISTER TEAM</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Tournament Rules & Format */}
        <Text style={styles.sectionHeader}>TOURNAMENT RULES & FORMAT</Text>
        <View style={styles.infoCard}>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Check-in:</Text> Teams must check in 30 minutes before the scheduled start time. Late teams forfeit their first match.</Text>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Equipment:</Text> We provide all peripherals (mice, keyboards, headsets). Players may bring their own mice and headsets.</Text>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Anti-Cheat:</Text> All PCs run Vanguard and tournament-grade anti-cheat software. Any tampering results in immediate disqualification.</Text>
          <Text style={styles.ruleItem}>• <Text style={styles.ruleTitle}>Disputes:</Text> All match disputes must be raised with the Tournament Admin within 5 minutes of match completion.</Text>
        </View>

        {/* Current Standings Section */}
        <Text style={styles.sectionHeader}>CURRENT STANDINGS (SEASON 4)</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCellHeader, { flex: 0.6 }]}>Rank</Text>
            <Text style={[styles.tableCellHeader, { flex: 2 }]}>Team</Text>
            <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Wins</Text>
            <Text style={[styles.tableCellHeader, { flex: 1 }]}>Points</Text>
          </View>
          {STANDINGS_DATA.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 0.6, color: '#E50914', fontWeight: 'bold' }]}>{row.rank}</Text>
              <Text style={[styles.tableCell, { flex: 2 }]}>{row.team}</Text>
              <Text style={[styles.tableCell, { flex: 0.8 }]}>{row.wins}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{row.points}</Text>
            </View>
          ))}
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
  sectionHeader: { color: '#888', fontSize: 11, fontWeight: '700', marginBottom: 10, letterSpacing: 1, marginTop: 20 },
  card: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, marginBottom: 16, borderWidth: 1, borderColor: '#262626' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  gameLabel: { color: '#E50914', fontSize: 11, fontWeight: '800', letterSpacing: 1 },
  statusBadge: { color: '#888', fontSize: 10, fontWeight: '700' },
  detailsText: { color: '#AAA', fontSize: 12, marginVertical: 2 },
  prizeText: { color: '#FFF', fontSize: 13, fontWeight: 'bold', marginTop: 6, marginBottom: 14 },
  actionButton: { backgroundColor: '#E50914', padding: 12, alignItems: 'center', borderRadius: 4 },
  actionButtonText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  infoCard: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, borderWidth: 1, borderColor: '#262626' },
  ruleItem: { color: '#AAA', fontSize: 12, marginVertical: 6, lineHeight: 18 },
  ruleTitle: { color: '#FFF', fontWeight: 'bold' },
  table: { backgroundColor: '#1A1A1A', borderRadius: 4, borderWidth: 1, borderColor: '#262626', overflow: 'hidden', marginBottom: 30 },
  tableRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#262626' },
  tableHeader: { backgroundColor: '#141414' },
  tableCellHeader: { color: '#888', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  tableCell: { color: '#FFF', fontSize: 12 }
});