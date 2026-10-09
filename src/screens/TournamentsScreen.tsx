import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const TOURNAMENTS_DATA = [
  { id: '1', title: 'ROCKET LEAGUE COMMUNITY CUP', game: 'Rocket League', prize: 'R5,000 Pool', status: 'REGISTERING' },
  { id: '2', title: 'VALORANT SQUAD SHOWDOWN', game: 'Valorant', prize: 'R8,000 Pool', status: 'UPCOMING' },
  { id: '3', title: 'EA SPORTS FC 25 FRIENDLY', game: 'EA Sports FC 25', prize: 'R2,500 Pool', status: 'ACTIVE' },
];

export function TournamentsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>TOURNAMENTS & CUPS</Text>
      <FlatList
        data={TOURNAMENTS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.gameLabel}>{item.game.toUpperCase()}</Text>
              <Text style={styles.statusBadge}>{item.status}</Text>
            </View>
            <Text style={styles.tournamentTitle}>{item.title}</Text>
            <Text style={styles.prizeText}>{item.prize}</Text>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>VIEW DETAILS & REGISTER</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', letterSpacing: 1, marginBottom: 20 },
  card: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, marginBottom: 16, borderWidth: 1, borderColor: '#262626' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  gameLabel: { color: '#E50914', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  statusBadge: { color: '#888', fontSize: 10, fontWeight: '700' },
  tournamentTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginBottom: 6 },
  prizeText: { color: '#CCC', fontSize: 12, marginBottom: 14 },
  actionButton: { backgroundColor: '#262626', padding: 10, alignItems: 'center', borderRadius: 4 },
  actionButtonText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 }
});
