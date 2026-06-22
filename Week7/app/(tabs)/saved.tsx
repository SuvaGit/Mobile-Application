import { useFocusEffect, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { LoadingScreen } from '@/components/LoadingScreen';
import { PropertyCard } from '@/components/PropertyCard';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { getFavoriteIds } from '@/services/favorite-service';
import { getAllProperties } from '@/services/property-service';
import { Property } from '@/types';

export default function SavedScreen() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    let active = true;
    async function load() {
      if (!user) return;
      setLoading(true);
      const [ids, all] = await Promise.all([getFavoriteIds(user.uid), getAllProperties()]);
      if (active) { setProperties(all.filter((item) => ids.includes(item.id))); setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, [user]));

  if (loading) return <LoadingScreen label="Loading saved homes..." />;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.title}>Saved Properties</Text>
      <Text style={styles.subtitle}>Homes you want to view again</Text>
      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <PropertyCard property={item} onPress={() => router.push(`/property/${item.id}`)} />}
        ListEmptyComponent={<EmptyState icon="heart-outline" title="No saved properties" message="Tap the heart on a property to save it here." />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  title: { color: Colors.primary, fontSize: 29, fontWeight: '900', paddingHorizontal: 20, paddingTop: 10 },
  subtitle: { color: Colors.muted, paddingHorizontal: 20, marginTop: 4 },
  list: { padding: 20, paddingBottom: 100, flexGrow: 1 },
});
