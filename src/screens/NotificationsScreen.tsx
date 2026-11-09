import React, { useCallback, useState } from 'react';
import { Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function NotificationsScreen() {
  const { notifications, refreshData, markNotificationRead } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(useCallback(() => {
    let active = true;
    setIsLoading(true);
    void refreshData().catch((error: unknown) => {
      if (active) {
        Alert.alert('Unable to Load Notifications', error instanceof Error ? error.message : 'Please try again.');
      }
    }).finally(() => {
      if (active) setIsLoading(false);
    });
    return () => {
      active = false;
    };
  }, [refreshData]));

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {isLoading ? 'Loading your notifications...' : 'You do not have any notifications yet.'}
          </Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.card, !item.readAt && styles.unreadCard]}
            onPress={() => {
              if (!item.readAt) {
                void markNotificationRead(item.id).catch((error: unknown) => {
                  Alert.alert('Unable to Update Notification', error instanceof Error ? error.message : 'Please try again.');
                });
              }
            }}
            accessibilityRole="button"
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardTime}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
            <Text style={styles.cardDesc}>{item.message}</Text>
            {!item.readAt ? <Text style={styles.unreadLabel}>NEW · TAP TO MARK READ</Text> : null}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20 },
  headerTitle: { color: '#FFF', fontSize: 18, fontWeight: '800', letterSpacing: 1, marginBottom: 20 },
  card: { backgroundColor: '#1A1A1A', padding: 16, borderRadius: 4, marginBottom: 12, borderWidth: 1, borderColor: '#262626' },
  unreadCard: { borderColor: '#E50914' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6, gap: 12 },
  cardTitle: { color: '#E50914', fontSize: 12, fontWeight: '700', letterSpacing: 1, flex: 1 },
  cardTime: { color: '#666', fontSize: 10 },
  cardDesc: { color: '#CCC', fontSize: 13 },
  unreadLabel: { color: '#E50914', fontSize: 9, fontWeight: '700', marginTop: 10 },
  emptyText: { color: '#AAA', fontSize: 13, lineHeight: 20, paddingVertical: 24 },
});
