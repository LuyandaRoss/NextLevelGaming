import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logoText}>LEVEL UP</Text>
        <Text style={styles.subtitleText}>
          {isLogin ? 'WELCOME BACK, PLAYER' : 'CREATE YOUR ACCOUNT'}
        </Text>
      </View>

      <View style={styles.formContainer}>
        {!isLogin && (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput style={styles.input} placeholder="Alex Morgan" placeholderTextColor="#666" />
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL ADDRESS</Text>
          <TextInput 
            style={styles.input} 
            placeholder="alex@nexusgaming.co.za" 
            placeholderTextColor="#666"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PASSWORD</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••••••" 
            placeholderTextColor="#666"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>{isLogin ? 'LOG IN' : 'SIGN UP'}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.switchButton} 
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchButtonText}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 20, justifyContent: 'center' },
  headerContainer: { marginBottom: 30, alignItems: 'center' },
  logoText: { color: '#E50914', fontSize: 24, fontWeight: '900', letterSpacing: 2 },
  subtitleText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600', marginTop: 10, letterSpacing: 1 },
  formContainer: { width: '100%' },
  inputGroup: { marginBottom: 20 },
  label: { color: '#888', fontSize: 11, fontWeight: '700', marginBottom: 8, letterSpacing: 1 },
  input: { backgroundColor: '#1A1A1A', color: '#FFF', padding: 14, borderRadius: 4, borderWidth: 1, borderColor: '#333', fontSize: 14 },
  primaryButton: { backgroundColor: '#E50914', padding: 16, alignItems: 'center', borderRadius: 4, marginTop: 10 },
  primaryButtonText: { color: '#FFF', fontWeight: 'bold', letterSpacing: 1, fontSize: 14 },
  switchButton: { marginTop: 20, alignItems: 'center' },
  switchButtonText: { color: '#888', fontSize: 12 }
});
