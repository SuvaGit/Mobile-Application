import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

export function LoadingScreen({ label = 'Loading MeroGhar...' }: { label?: string }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logo}>🏠</Text>
      </View>
      <ActivityIndicator size="large" color={Colors.primary} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background, gap: 14 },
  logoCircle: { width: 82, height: 82, borderRadius: 41, backgroundColor: Colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  logo: { fontSize: 42 },
  label: { color: Colors.muted, fontSize: 15 },
});
