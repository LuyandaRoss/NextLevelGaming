import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { COLORS } from '../theme/colors';

interface HamburgerMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screenName: string) => void;
  activeScreen: string;
}

const menuGroups = [
  {
    title: 'MAIN',
    items: [
      { title: 'HOME', screen: 'Home' },
      { title: 'ABOUT US', screen: 'About' },
      { title: 'OVERVIEW', screen: 'Overview' },
    ],
  },
  {
    title: 'EXPERIENCES',
    items: [
      { title: 'PC GAMING', screen: 'PCGaming' },
      { title: 'CONSOLE GAMING', screen: 'ConsoleGaming' },
      { title: 'ESPORTS ARENA', screen: 'Esports' },
      { title: 'CALCULATE FEES / BOOK', screen: 'CalculateFees', highlight: true },
    ],
  },
  {
    title: 'COMMUNITY',
    items: [
      { title: 'TOURNAMENTS', screen: 'Tournaments' },
      { title: 'VIP MEMBERSHIP', screen: 'VIPMembership' },
      { title: 'SQUAD MANAGEMENT', screen: 'SquadManagement' },
      { title: 'NOTIFICATIONS', screen: 'Notifications' },
    ],
  },
  {
    title: 'ACCOUNT AND SUPPORT',
    items: [
      { title: 'PLAYER PROFILE', screen: 'PlayerHub' },
      { title: 'LOG IN / SIGN UP', screen: 'LoginSignup' },
      { title: 'PAYMENT', screen: 'Payment' },
      { title: 'CHECKOUT', screen: 'Checkout' },
      { title: 'CONTACT US', screen: 'Contact' },
    ],
  },
];

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({
  visible,
  onClose,
  onNavigate,
  activeScreen,
}) => {
  const activeMenuScreen = activeScreen === 'Loading'
    ? 'Home'
    : activeScreen === 'Booking' || activeScreen === 'Confirmation'
      ? 'CalculateFees'
      : activeScreen === 'Payment'
        ? 'Checkout'
        : activeScreen;

  const handlePress = (screen: string) => {
    onClose();
    onNavigate(screen);
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.headerRow}>
          <Text style={styles.menuTitle}>NAVIGATION</Text>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeBtn}
            accessibilityRole="button"
            accessibilityLabel="Close navigation menu"
          >
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.menuContent}
          showsVerticalScrollIndicator={false}
        >
          {menuGroups.map((group) => (
            <View key={group.title} style={styles.menuGroup}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <View style={styles.menuList}>
                {group.items.map((item) => (
                  <TouchableOpacity
                    key={item.screen}
                    style={[
                      styles.menuItem,
                      'highlight' in item && item.highlight && styles.highlightItem,
                      activeMenuScreen === item.screen && styles.activeMenuItem,
                    ]}
                    onPress={() => handlePress(item.screen)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: activeMenuScreen === item.screen }}
                  >
                    <Text
                      style={[
                        styles.menuText,
                        'highlight' in item && item.highlight && styles.highlightText,
                        activeMenuScreen === item.screen && styles.activeMenuText,
                      ]}
                    >
                      {item.title}
                    </Text>
                    {activeMenuScreen === item.screen ? (
                      <Text style={styles.currentLabel}>CURRENT</Text>
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.overlay,
    paddingTop: 50,
    paddingHorizontal: 25,
    paddingBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 12,
  },
  menuTitle: {
    color: COLORS.primaryBright,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    color: COLORS.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  scroll: {
    flex: 1,
  },
  menuContent: {
    paddingBottom: 20,
  },
  menuGroup: {
    marginBottom: 18,
  },
  groupTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  menuList: {
    gap: 8,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuText: {
    color: COLORS.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  highlightItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryBright,
  },
  highlightText: {
    textAlign: 'center',
  },
  activeMenuItem: {
    backgroundColor: COLORS.surfaceLight,
    borderColor: COLORS.primaryBright,
    shadowColor: COLORS.primaryBright,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  activeMenuText: {
    color: COLORS.textPrimary,
  },
  currentLabel: {
    position: 'absolute',
    right: 12,
    top: 13,
    color: COLORS.primaryBright,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
