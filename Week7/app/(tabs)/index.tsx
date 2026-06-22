import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PropertyCard } from '@/components/PropertyCard';
import { Colors } from '@/constants/colors';
import { sampleProperties } from '@/constants/sample-properties';
import { useAuth } from '@/context/AuthContext';
import { useProperties } from '@/hooks/use-properties';

const actions = [
  { label: 'Rent', icon: 'home-outline' as const, type: 'Rent' },
  { label: 'Buy', icon: 'key-outline' as const, type: 'Buy' },
  { label: 'Post', icon: 'add-outline' as const, type: 'Post' },
];

export default function HomeScreen() {
  const { user, isDemoMode } = useAuth();
  const { properties } = useProperties();

  const firstName = user?.displayName.split(' ')[0] || 'there';


  const propertyMap = new Map(
    [...properties, ...sampleProperties].map((property) => [property.id, property]),
  );
  const homeProperties = Array.from(propertyMap.values()).sort(
    (a, b) => b.createdAtMillis - a.createdAtMillis,
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.appName}>MeroGhar</Text>
            <Text style={styles.greeting}>Namaste, {firstName} 👋</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{firstName.charAt(0).toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.tagline}>Find rooms, houses, and apartments easily</Text>
        {isDemoMode ? <Text style={styles.modeText}>Demo mode</Text> : null}

        <Pressable onPress={() => router.push('/(tabs)/search')} style={styles.searchBox}>
          <Ionicons name="search-outline" size={22} color={Colors.muted} />
          <TextInput
            editable={false}
            pointerEvents="none"
            style={styles.searchInput}
            placeholder="Search by location or property..."
            placeholderTextColor="#9CA3AF"
          />
        </Pressable>

        <View style={styles.actionRow}>
          {actions.map((action) => (
            <Pressable
              key={action.label}
              onPress={() =>
                action.type === 'Post'
                  ? router.push('/(tabs)/add-property')
                  : router.push({ pathname: '/(tabs)/search', params: { listingType: action.type } })
              }
              style={({ pressed }) => [styles.actionCard, pressed && { opacity: 0.8 }]}
            >
              <View style={styles.actionIcon}>
                <Ionicons name={action.icon} size={26} color={Colors.primary} />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Featured Homes</Text>
            <Text style={styles.sectionSubtitle}>6 complete example listings are included</Text>
          </View>
          <Pressable onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {homeProperties.slice(0, 6).map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onPress={() => router.push(`/property/${property.id}`)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: 20, paddingBottom: 110 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  appName: { color: Colors.primary, fontSize: 34, fontWeight: '900' },
  greeting: { color: Colors.text, fontSize: 15, fontWeight: '600', marginTop: 4 },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { color: Colors.surface, fontSize: 18, fontWeight: '800' },
  tagline: { color: Colors.muted, fontSize: 15, marginTop: 16 },
  modeText: {
    alignSelf: 'flex-start',
    color: Colors.primary,
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 10,
  },
  searchBox: {
    minHeight: 54,
    backgroundColor: Colors.surface,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 15,
    marginTop: 22,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  searchInput: { flex: 1, color: Colors.text, fontSize: 15 },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 22 },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingVertical: 16,
    borderRadius: 17,
    alignItems: 'center',
    shadowColor: Colors.shadow,
    shadowOpacity: 0.07,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { color: Colors.text, fontWeight: '800', marginTop: 9 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 30,
    marginBottom: 15,
    gap: 10,
  },
  sectionTitle: { color: Colors.text, fontSize: 22, fontWeight: '900' },
  sectionSubtitle: { color: Colors.muted, fontSize: 12, marginTop: 4 },
  seeAll: { color: Colors.primary, fontWeight: '700', paddingBottom: 2 },
});
