import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user, logout, isDemoMode } = useAuth();

  function handleLogout() {
    Alert.alert('Sign out?', 'You can sign in again at any time.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => { await logout(); router.replace('/(auth)/login'); } },
    ]);
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}><Text style={styles.avatarText}>{user?.displayName.charAt(0).toUpperCase()}</Text></View>
          <Text style={styles.name}>{user?.displayName}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          <View style={styles.modeBadge}><Text style={styles.modeBadgeText}>{isDemoMode ? 'Demo Mode' : 'Firebase Connected'}</Text></View>
        </View>

        <Text style={styles.sectionTitle}>Your account</Text>
        <Pressable style={styles.menuItem} onPress={() => router.push('/my-properties')}>
          <View style={styles.menuIcon}><Ionicons name="business-outline" size={22} color={Colors.primary} /></View>
          <View style={{ flex: 1 }}><Text style={styles.menuTitle}>My properties</Text><Text style={styles.menuSubtitle}>View and delete your listings</Text></View>
          <Ionicons name="chevron-forward" size={20} color={Colors.muted} />
        </Pressable>

        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={24} color={Colors.accent} />
          <View style={{ flex: 1 }}><Text style={styles.infoTitle}>Backend status</Text><Text style={styles.infoText}>{isDemoMode ? 'Data is stored locally. Add your Firebase keys in .env to use Authentication, Firestore, and Storage.' : 'Authentication, Firestore, and Storage are enabled.'}</Text></View>
        </View>

        <AppButton title="Sign Out" onPress={handleLogout} variant="secondary" style={{ marginTop: 24 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: 20 },
  title: { color: Colors.primary, fontSize: 29, fontWeight: '900' },
  profileCard: { backgroundColor: Colors.surface, borderRadius: 20, alignItems: 'center', padding: 24, marginTop: 20, shadowColor: Colors.shadow, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2 },
  avatar: { width: 76, height: 76, borderRadius: 38, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: Colors.surface, fontSize: 31, fontWeight: '900' },
  name: { color: Colors.text, fontSize: 21, fontWeight: '900', marginTop: 13 },
  email: { color: Colors.muted, marginTop: 4 },
  modeBadge: { backgroundColor: Colors.accentSoft, paddingHorizontal: 11, paddingVertical: 6, borderRadius: 999, marginTop: 12 },
  modeBadgeText: { color: Colors.accent, fontSize: 12, fontWeight: '800' },
  sectionTitle: { color: Colors.text, fontSize: 18, fontWeight: '900', marginTop: 27, marginBottom: 11 },
  menuItem: { backgroundColor: Colors.surface, borderRadius: 16, padding: 15, flexDirection: 'row', alignItems: 'center', gap: 12 },
  menuIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  menuTitle: { color: Colors.text, fontSize: 16, fontWeight: '800' },
  menuSubtitle: { color: Colors.muted, fontSize: 12, marginTop: 3 },
  infoCard: { flexDirection: 'row', gap: 12, backgroundColor: Colors.accentSoft, borderRadius: 16, padding: 16, marginTop: 16 },
  infoTitle: { color: Colors.text, fontWeight: '800' },
  infoText: { color: Colors.muted, fontSize: 13, lineHeight: 19, marginTop: 3 },
});
