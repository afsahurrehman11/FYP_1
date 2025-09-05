// app/screens/AuthScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';

export default function AuthScreen() {
  const [mode, setMode] = useState<'login'|'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const submit = () => {
    // placeholder - backend integration later
    Alert.alert('Auth', `Mode: ${mode}\nEmail: ${email}`);
    // navigation.goBack();
  };

  const googleSignIn = () => {
    // placeholder - integrate react-native-google-signin later
    Alert.alert('Google Sign In', 'Implement google sign-in later');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>{mode === 'login' ? 'Sign In' : 'Sign Up'}</Text></View>

      <View style={styles.form}>
        <TextInput placeholder="Email" placeholderTextColor={Colors.muted} style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" />
        <TextInput placeholder="Password" placeholderTextColor={Colors.muted} style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
        <TouchableOpacity style={styles.primaryButton} onPress={submit}><Text style={styles.primaryText}>{mode === 'login' ? 'Sign In' : 'Create Account'}</Text></TouchableOpacity>

        <TouchableOpacity style={styles.googleButton} onPress={googleSignIn}>
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.switchRow}>
          <Text style={styles.switchText}>{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</Text>
          <TouchableOpacity onPress={() => setMode(mode === 'login' ? 'signup' : 'login')}><Text style={styles.switchAction}>{mode === 'login' ? 'Sign Up' : 'Sign In'}</Text></TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.close} onPress={() => navigation.goBack()}><Text style={{ color: Colors.muted }}>Close</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#222' },
  title: { color: Colors.white, fontSize: 22, fontWeight: '700' },
  form: { padding: 20 },
  input: { backgroundColor: Colors.surface, color: Colors.white, padding: 12, borderRadius: 8, marginBottom: 12 },
  primaryButton: { backgroundColor: Colors.accent, padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  primaryText: { color: Colors.white, fontWeight: '700' },
  googleButton: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 10, justifyContent: 'center', backgroundColor: '#DB4437', marginBottom: 12 },
  googleText: { color: '#fff', marginLeft: 8, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  switchText: { color: Colors.muted },
  switchAction: { color: Colors.accent, fontWeight: '700' },
  close: { marginTop: 24, alignItems: 'center' }
});
