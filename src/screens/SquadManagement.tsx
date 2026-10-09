import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';

const SQUAD_MEMBERS = [
  { id: '1', name: 'Alex Morgan (You)', role: 'Captain' },
  { id: '2', name: 'Devon_X', role: 'Rifler' },
  { id: '3', name: 'Viper_99', role: 'Support' },
];

export default function SquadManagementScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>SQUAD MANAGEMENT</Text>
      <View style={styles.teamInfoCard}>
        <Text style={styles.teamName}>ROCKET LEAGUE SQUAD A</Text>
        <Text style={styles.teamStatus}>Active in Community Cup</Text>
      </View>

      <Text style={styles.sectionHeader}>ROSTER MEMBERS (3/5)</Text>
      <FlatList
        data={SQUAD_MEMBERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.memberRow}>
            <View>
              <Text style={styles.memberName}>{item.name}</Text>
              <Text style={styles.memberRole}>{item.role}</Text>
            </View>
            <View style={styles.statusDot} />
          </View>
        )}
      />

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>INVITE SQUAD MEMBER</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', letterSpacing: 1, marginBottom: 20 },
  teamInfoCard: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, marginBottom: 24, borderLeftWidth: 4, borderLeftColor: '#E50914' },
  teamName: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  teamStatus: { color: '#888', fontSize: 12, marginTop: 4 },
  sectionHeader: { color: '#666', fontSize: 11, fontWeight: '700', marginBottom: 12, letterSpacing: 1 },
  memberRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#141414', padding: 14, borderRadius: 4, marginBottom: 8, borderWidth: 1, borderColor: '#222' },
  memberName: { color: '#FFF', fontSize: 13, fontWeight: '600' },
  memberRole: { color: '#888', fontSize: 11, marginTop: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#4BB543' },
  primaryButton: { backgroundColor: '#E50914', padding: 16, alignItems: 'center', borderRadius: 4, marginTop: 20 },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold', letterSpacing: 1, fontSize: 13 }
});