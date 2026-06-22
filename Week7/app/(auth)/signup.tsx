import { Link, router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { friendlyFirebaseError } from '@/utils/firebase-errors';

export default function SignupScreen() {
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Enter the same password in both fields.');
      return;
    }
    try {
      setLoading(true);
      await signup(name, email, password);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Unable to create account', friendlyFirebaseError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.safe} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View><Text style={styles.title}>Create your account</Text><Text style={styles.subtitle}>Start finding or listing properties in Nepal.</Text></View>
        <View style={styles.form}>
          <AppInput label="Full name" icon="person-outline" value={name} onChangeText={setName} placeholder="Your full name" />
          <AppInput label="Email" icon="mail-outline" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" />
          <AppInput label="Password" icon="lock-closed-outline" value={password} onChangeText={setPassword} secureTextEntry placeholder="At least 6 characters" />
          <AppInput label="Confirm password" icon="shield-checkmark-outline" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry placeholder="Repeat your password" />
          <AppButton title="Create Account" onPress={handleSignup} loading={loading} />
        </View>
        <Text style={styles.footer}>Already have an account? <Link href="/(auth)/login" style={styles.link}>Sign in</Link></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: 24, paddingVertical: 48 },
  title: { color: Colors.primary, fontSize: 31, fontWeight: '900' },
  subtitle: { color: Colors.muted, fontSize: 15, lineHeight: 22, marginTop: 8 },
  form: { gap: 16, marginTop: 28 },
  footer: { color: Colors.muted, textAlign: 'center', marginTop: 24, fontSize: 14 },
  link: { color: Colors.primary, fontWeight: '800' },
});
