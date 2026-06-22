import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { EmptyState } from '@/components/EmptyState';
import { LoadingScreen } from '@/components/LoadingScreen';
import { PropertyCard } from '@/components/PropertyCard';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { deletePropertyById, getPropertiesByOwner } from '@/services/property-service';
import { Property } from '@/types';
import { friendlyFirebaseError } from '@/utils/firebase-errors';

export default function MyPropertiesScreen() {
  const { user } = useAuth();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setProperties(await getPropertiesByOwner(user.uid));
    setLoading(false);
  }, [user]);

  useFocusEffect(useCallback(() => { load(); }, [load]));

  function confirmDelete(property: Property) {
    if (!user) return;
    Alert.alert('Delete property?', property.title, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try { await deletePropertyById(property.id, user.uid); await load(); }
        catch (error) { Alert.alert('Unable to delete', friendlyFirebaseError(error)); }
      } },
    ]);
  }

  if (loading) return <LoadingScreen label="Loading your properties..." />;

  return (
    <FlatList
      style={styles.safe}
      contentContainerStyle={styles.list}
      data={properties}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <PropertyCard property={item} onPress={() => router.push(`/property/${item.id}`)} />
          <Pressable onPress={() => confirmDelete(item)} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={18} color={Colors.danger} />
            <Text style={styles.deleteText}>Delete listing</Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={<EmptyState icon="business-outline" title="No properties posted" message="Use the Post tab to publish your first property." />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  list: { padding: 20, flexGrow: 1 },
  deleteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: -7, marginBottom: 20, backgroundColor: Colors.dangerSoft, paddingVertical: 11, borderRadius: 13 },
  deleteText: { color: Colors.danger, fontWeight: '800' },
});
