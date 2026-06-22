import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/EmptyState';
import { LoadingScreen } from '@/components/LoadingScreen';
import { PropertyCard } from '@/components/PropertyCard';
import { Colors } from '@/constants/colors';
import { useProperties } from '@/hooks/use-properties';
import { ListingType } from '@/types';

const filters: Array<'All' | ListingType> = ['All', 'Rent', 'Buy'];

export default function SearchScreen() {
  const params = useLocalSearchParams<{ listingType?: string }>();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'All' | ListingType>(params.listingType === 'Buy' ? 'Buy' : params.listingType === 'Rent' ? 'Rent' : 'All');
  const { properties, loading } = useProperties();

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return properties.filter((property) => {
      const matchesFilter = filter === 'All' || property.listingType === filter;
      const haystack = `${property.title} ${property.location} ${property.city} ${property.category}`.toLowerCase();
      return matchesFilter && (!term || haystack.includes(term));
    });
  }, [filter, properties, search]);

  if (loading) return <LoadingScreen label="Loading listings..." />;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Properties</Text>
        <Text style={styles.subtitle}>{filtered.length} listing{filtered.length === 1 ? '' : 's'} found</Text>
      </View>
      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={21} color={Colors.muted} />
        <TextInput value={search} onChangeText={setSearch} style={styles.input} placeholder="Kathmandu, room, apartment..." placeholderTextColor="#9CA3AF" />
        {search ? <Pressable onPress={() => setSearch('')}><Ionicons name="close-circle" size={20} color={Colors.muted} /></Pressable> : null}
      </View>
      <View style={styles.filters}>
        {filters.map((item) => (
          <Pressable key={item} onPress={() => setFilter(item)} style={[styles.chip, filter === item && styles.chipActive]}>
            <Text style={[styles.chipText, filter === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <PropertyCard property={item} onPress={() => router.push(`/property/${item.id}`)} />}
        ListEmptyComponent={<EmptyState icon="search-outline" title="No properties found" message="Try another location or change the Rent and Buy filter." />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 10 },
  title: { color: Colors.primary, fontSize: 29, fontWeight: '900' },
  subtitle: { color: Colors.muted, marginTop: 4 },
  searchBox: { marginHorizontal: 20, marginTop: 18, minHeight: 52, backgroundColor: Colors.surface, borderRadius: 15, flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 14, borderWidth: 1, borderColor: Colors.border },
  input: { flex: 1, color: Colors.text, fontSize: 15 },
  filters: { flexDirection: 'row', gap: 10, paddingHorizontal: 20, marginTop: 14 },
  chip: { paddingHorizontal: 18, paddingVertical: 9, backgroundColor: Colors.surface, borderRadius: 999, borderWidth: 1, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { color: Colors.text, fontWeight: '700' },
  chipTextActive: { color: Colors.surface },
  list: { padding: 20, paddingBottom: 100, flexGrow: 1 },
});
