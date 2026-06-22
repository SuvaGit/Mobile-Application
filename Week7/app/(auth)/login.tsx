import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { friendlyFirebaseError } from '@/utils/firebase-errors';

export default function LoginScreen() {
  const { login, isDemoMode } = useAuth();
  const [email, setEmail] = useState('demo@meroghar.com');
  const [password, setPassword] = useState('123456');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    try {
      setLoading(true);
      await login(email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Unable to sign in', friendlyFirebaseError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoCircle}><Text style={styles.logo}>🏠</Text></View>
        <Text style={styles.brand}>MeroGhar</Text>
        <Text style={styles.subtitle}>Find rooms, houses, and apartments easily</Text>

        {isDemoMode ? (
          <View style={styles.demoBanner}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
            <Text style={styles.demoText}>Demo mode is active. The prefilled login works without Firebase.</Text>
          </View>
        ) : null}

        <View style={styles.form}>
          <AppInput label="Email" icon="mail-outline" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" />
          <AppInput label="Password" icon="lock-closed-outline" value={password} onChangeText={setPassword} secureTextEntry placeholder="At least 6 characters" />
          <Link href="/(auth)/forgot-password" style={styles.forgot}>Forgot password?</Link>
          <AppButton title="Sign In" onPress={handleLogin} loading={loading} />
        </View>

        <Text style={styles.footer}>New to MeroGhar? <Link href="/(auth)/signup" style={styles.link}>Create an account</Link></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingVertical: 48 },
  logoCircle: { width: 82, height: 82, borderRadius: 41, backgroundColor: Colors.primarySoft, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' },
  logo: { fontSize: 42 },
  brand: { marginTop: 16, color: Colors.primary, fontSize: 36, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: Colors.muted, fontSize: 15, lineHeight: 22, textAlign: 'center', marginTop: 7 },
  demoBanner: { flexDirection: 'row', gap: 9, backgroundColor: Colors.primarySoft, borderRadius: 14, padding: 13, marginTop: 22 },
  demoText: { flex: 1, color: Colors.primaryDark, fontSize: 13, lineHeight: 19 },
  form: { gap: 16, marginTop: 28 },
  forgot: { color: Colors.primary, fontWeight: '700', textAlign: 'right', marginTop: -5 },
  footer: { color: Colors.muted, textAlign: 'center', marginTop: 24, fontSize: 14 },
  link: { color: Colors.primary, fontWeight: '800' },
});
