import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

const PAST_SESSIONS = [
  { id: '1', title: 'PC Gaming • Rig #02', date: '15 September 2026', status: 'Completed' },
  { id: '2', title: 'Console Lounge • PS5', date: '02 September 2026', status: 'Completed' },
];

const TOURNAMENT_HIGHLIGHTS = [
  { id: '1', title: 'Rocket League Finals - Spring Cup', duration: '2:45 min', views: '1.2K' },
  { id: '2', title: 'Valorant Community Showdown Highlights', duration: '4:10 min', views: '2.5K' },
];

export function PlayerHubScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Profile Header */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeSub}>WELCOME BACK,</Text>
          <Text style={styles.welcomeName}>ALEX MORGAN</Text>
          <Text style={styles.statusText}>Pro Account • 450 XP</Text>
        </View>

        {/* Next Session Section */}
        <Text style={styles.sectionHeader}>YOUR NEXT SESSION</Text>
        <View style={styles.sessionCard}>
          <Text style={styles.sessionTitle}>PC Gaming • Rig #04</Text>
          <Text style={styles.sessionTime}>Saturday, 31 October 2026 • 14:00</Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>MANAGE BOOKING</Text>
          </TouchableOpacity>
        </View>

        {/* Session History Section */}
        <Text style={styles.sectionHeader}>SESSION HISTORY</Text>
        {PAST_SESSIONS.map((session) => (
          <View key={session.id} style={styles.historyCard}>
            <View>
              <Text style={styles.historyTitle}>{session.title}</Text>
              <Text style={styles.historyDate}>{session.date}</Text>
            </View>
            <Text style={styles.statusCompleted}>{session.status}</Text>
          </View>
        ))}

        {/* Active Squad Section */}
        <Text style={styles.sectionHeader}>ACTIVE SQUAD</Text>
        <View style={styles.squadCard}>
          <Text style={styles.squadName}>Rocket League Squad A</Text>
          <Text style={styles.squadMembers}>3 / 5 Members Ready</Text>
        </View>

        {/* Tournament Highlights / Video Teasers Section */}
        <Text style={styles.sectionHeader}>TOURNAMENT DAY HIGHLIGHTS</Text>
        {TOURNAMENT_HIGHLIGHTS.map((video) => (
          <TouchableOpacity key={video.id} style={styles.videoCard}>
            <View style={styles.videoThumbnailPlaceholder}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
            <View style={styles.videoInfo}>
              <Text style={styles.videoTitle}>{video.title}</Text>
              {/* Fixed multiline string interpolation for video duration and views */}
              <Text style={styles.videoMeta}>{video.duration} • {video.views} views</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D' },
  scrollContainer: { padding: 20 },
  welcomeCard: { backgroundColor: '#141414', padding: 20, borderRadius: 4, marginBottom: 24, borderLeftWidth: 4, borderLeftColor: '#E50914' },
  welcomeSub: { color: '#888', fontSize: 11, fontWeight: '700', letterSpacing: 1 },
  welcomeName: { color: '#FFF', fontSize: 20, fontWeight: '900', marginTop: 2 },
  statusText: { color: '#E50914', fontSize: 12, fontWeight: '600', marginTop: 8 },
  sectionHeader: { color: '#888', fontSize: 11, fontWeight: '700', marginBottom: 10, letterSpacing: 1, marginTop: 15 },
  sessionCard: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, marginBottom: 20, borderWidth: 1, borderColor: '#262626' },
  sessionTitle: { color: '#FFF', fontSize: 15, fontWeight: 'bold' },
  sessionTime: { color: '#AAA', fontSize: 12, marginTop: 4, marginBottom: 14 },
  primaryButton: { backgroundColor: '#E50914', padding: 12, alignItems: 'center', borderRadius: 4 },
  primaryButtonText: { color: '#FFF', fontSize: 11, fontWeight: 'bold', letterSpacing: 1 },
  historyCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1A1A1A', padding: 14, borderRadius: 4, marginBottom: 10, borderWidth: 1, borderColor: '#262626' },
  historyTitle: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  historyDate: { color: '#888', fontSize: 11, marginTop: 2 },
  statusCompleted: { color: '#4BB543', fontSize: 11, fontWeight: 'bold' },
  squadCard: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, marginBottom: 20, borderWidth: 1, borderColor: '#262626' },
  squadName: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  squadMembers: { color: '#888', fontSize: 12, marginTop: 4 },
  videoCard: { flexDirection: 'row', backgroundColor: '#1A1A1A', borderRadius: 4, marginBottom: 10, overflow: 'hidden', borderWidth: 1, borderColor: '#262626' },
  videoThumbnailPlaceholder: { width: 100, height: 70, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center' },
  playIcon: { color: '#E50914', fontSize: 20 },
  videoInfo: { flex: 1, padding: 10, justifyContent: 'center' },
  videoTitle: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  videoMeta: { color: '#888', fontSize: 10, marginTop: 4 }
});
