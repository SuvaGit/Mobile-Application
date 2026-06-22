import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { friendlyFirebaseError } from '@/utils/firebase-errors';

export default function ForgotPasswordScreen() {
  const { resetPassword, isDemoMode } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    try {
      setLoading(true);
      await resetPassword(email);
      Alert.alert(
        isDemoMode ? 'Demo mode' : 'Email sent',
        isDemoMode ? 'Password reset is simulated until Firebase is configured.' : 'Check your inbox for a password reset link.',
        [{ text: 'OK', onPress: () => router.back() }],
      );
    } catch (error) {
      Alert.alert('Unable to reset password', friendlyFirebaseError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset password</Text>
      <Text style={styles.subtitle}>Enter the email connected to your MeroGhar account.</Text>
      <View style={styles.form}>
        <AppInput label="Email" icon="mail-outline" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" />
        <AppButton title="Send Reset Link" onPress={handleReset} loading={loading} />
        <AppButton title="Back to Sign In" onPress={() => router.back()} variant="secondary" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, padding: 24, justifyContent: 'center' },
  title: { color: Colors.primary, fontSize: 31, fontWeight: '900' },
  subtitle: { color: Colors.muted, fontSize: 15, lineHeight: 22, marginTop: 8 },
  form: { gap: 16, marginTop: 28 },
});
