import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../theme/colors';

interface HeaderProps {
  onToggleMenu: () => void;
  isMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleMenu, isMenuOpen }) => {
  return (
    <View style={styles.container}>
      <View style={styles.brandContainer}>
        <Text style={styles.brandTitle}>NEXT LEVEL</Text>
        <Text style={styles.brandSub}>GAMING & ESPORTS ARENA</Text>
      </View>
      <TouchableOpacity 
        style={styles.hamburgerButton} 
        onPress={onToggleMenu}
        accessibilityLabel="Toggle Menu"
      >
        <Text style={styles.hamburgerText}>{isMenuOpen ? '✕' : '☰'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: COLORS.background,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 30, // Margin for status bar
  },
  brandContainer: {
    flexDirection: 'column',
  },
  brandTitle: {
    color: COLORS.textPrimary,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  brandSub: {
    color: COLORS.primaryBright,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  hamburgerButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  hamburgerText: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
