import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

const NOTIFICATIONS_DATA = [
  { id: '1', title: 'SESSION REMINDER', description: 'Your PC Gaming session starts in 1 hour.', time: '10m ago' },
  { id: '2', title: 'TOURNAMENT UPDATE', description: 'Rocket League Community Cup check-in opens soon.', time: '2h ago' },
  { id: '3', title: 'BOOKING CONFIRMED', description: 'Your session request #BK-9482 has been secured.', time: '1d ago' },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
      <FlatList
        data={NOTIFICATIONS_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardTime}>{item.time}</Text>
            </View>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', letterSpacing: 1, marginBottom: 20 },
  card: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, marginBottom: 12, borderWidth: 1, borderColor: '#262626' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  cardTitle: { color: '#E50914', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  cardTime: { color: '#666', fontSize: 10 },
  cardDesc: { color: '#CCC', fontSize: 13 }
});