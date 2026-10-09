import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';
import { Button } from '../components/Button';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'NotFound'>;

export const NotFoundScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.code}>404</Text>
      <Text style={styles.title}>GAME OVER</Text>
      <Text style={styles.desc}>The page or screen you are looking for could not be found.</Text>

      <View style={styles.btnGroup}>
        <Button title="BACK TO HOME" onPress={() => navigation.navigate('Home')} variant="primary" />
        <Button title="EXPLORE EXPERIENCES" onPress={() => navigation.navigate('Overview')} variant="outline" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  code: { color: COLORS.primaryBright, fontSize: 72, fontWeight: '900' },
  title: { color: COLORS.textPrimary, fontSize: 24, fontWeight: '800', marginBottom: 10 },
  desc: { color: COLORS.textSecondary, fontSize: 14, textAlign: 'center', marginBottom: 30 },
  btnGroup: { width: '100%', gap: 10 },
});
