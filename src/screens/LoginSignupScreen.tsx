import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { InputField } from '../components/InputField';
import { KeyboardAwareScrollView } from '../components/KeyboardAwareScrollView';
import { useAuth } from '../context/AuthContext';
import { COLORS } from '../theme/colors';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'LoginSignup'>;

export default function LoginSignupScreen({ navigation, route }: Props) {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const finishAuthentication = () => {
    if (route.params?.returnTo === 'Booking' || route.params?.returnTo === 'Checkout') {
      navigation.goBack();
    } else {
      navigation.replace('PlayerHub');
    }
  };

  const handleSubmit = async () => {
    const nextErrors: Record<string, string> = {};
    if (!isLogin && !name.trim()) nextErrors.name = 'Enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (password.length < 8) nextErrors.password = 'Use a password with at least 8 characters.';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(name, email, password);
      }
      finishAuthentication();
    } catch (error) {
      Alert.alert(
        isLogin ? 'Unable to Log In' : 'Unable to Sign Up',
        error instanceof Error ? error.message : 'Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsLogin((current) => !current);
    setErrors({});
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>NEXT LEVEL</Text>
        <Text style={styles.subtitle}>
          {isLogin ? 'WELCOME BACK' : 'CREATE YOUR ACCOUNT'}
        </Text>
      </View>

      <View style={styles.form}>
        {!isLogin ? (
          <InputField
            label="Full Name"
            placeholder="Your name"
            value={name}
            onChangeText={setName}
            error={errors.name}
            autoCapitalize="words"
            autoComplete="name"
          />
        ) : null}
        <InputField
          label="Email Address"
          placeholder="name@example.com"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
        <InputField
          label="Password"
          placeholder="At least 8 characters"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
          autoCapitalize="none"
          autoComplete={isLogin ? 'current-password' : 'new-password'}
        />

        <Button
          title={isLogin ? 'LOG IN' : 'CREATE ACCOUNT'}
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={styles.submitButton}
        />
        <Button
          title={isLogin ? 'CREATE AN ACCOUNT' : 'I ALREADY HAVE AN ACCOUNT'}
          onPress={toggleMode}
          variant="outline"
          disabled={isSubmitting}
        />
        <Text style={styles.localNotice}>
          Your account and booking records are securely synced with Supabase and available when you sign in on another device.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 30 },
  logo: { color: COLORS.primaryBright, fontSize: 24, fontWeight: '900', letterSpacing: 2 },
  subtitle: { color: COLORS.textPrimary, fontSize: 14, fontWeight: '700', marginTop: 10 },
  form: { width: '100%' },
  submitButton: { marginTop: 8 },
  localNotice: {
    color: COLORS.textMuted,
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'center',
    marginTop: 16,
  },
});
