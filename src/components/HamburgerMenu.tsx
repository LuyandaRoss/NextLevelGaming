import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { COLORS } from '../theme/colors';

interface HamburgerMenuProps {
  visible: boolean;
  onClose: () => void;
  onNavigate: (screenName: string) => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ visible, onClose, onNavigate }) => {
  const menuItems = [
    { title: 'HOME', screen: 'Home' },
    { title: 'ABOUT US', screen: 'About' },
    { title: 'OVERVIEW', screen: 'Overview' },
    { title: 'CALCULATE FEES', screen: 'CalculateFees' },
    { title: 'CONTACT US', screen: 'Contact' },
    { title: 'BOOK NOW', screen: 'CalculateFees', highlight: true },
  ];

  const handlePress = (screen: string) => {
    onClose();
    onNavigate(screen);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={styles.overlay}>
        <View style={styles.headerRow}>
          <Text style={styles.menuTitle}>NAVIGATION</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuList}>
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.menuItem, item.highlight && styles.highlightItem]}
              onPress={() => handlePress(item.screen)}
            >
              <Text style={[styles.menuText, item.highlight && styles.highlightText]}>
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 15,
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
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuList: {
    gap: 15,
  },
  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuText: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  highlightItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primaryBright,
  },
  highlightText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
});