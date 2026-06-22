import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';

export function EmptyState({
  icon = 'home-outline',
  title,
  message,
}: {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  message: string;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={32} color={Colors.primary} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 54, paddingHorizontal: 28 },
  iconCircle: { width: 68, height: 68, borderRadius: 34, backgroundColor: Colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  title: { color: Colors.text, fontSize: 19, fontWeight: '700', marginBottom: 7, textAlign: 'center' },
  message: { color: Colors.muted, fontSize: 14, lineHeight: 21, textAlign: 'center' },
});
