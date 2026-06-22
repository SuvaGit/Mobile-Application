import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useLocalSearchParams, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/components/AppButton';
import { EmptyState } from '@/components/EmptyState';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { isFavorite, toggleFavorite } from '@/services/favorite-service';
import { deletePropertyById, getPropertyById } from '@/services/property-service';
import { Property } from '@/types';
import { friendlyFirebaseError } from '@/utils/firebase-errors';

export default function PropertyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const [property, setProperty] = useState<Property | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useFocusEffect(useCallback(() => {
    let active = true;
    async function load() {
      if (!id || !user) return;
      const [nextProperty, nextSaved] = await Promise.all([getPropertyById(id), isFavorite(user.uid, id)]);
      if (active) { setProperty(nextProperty); setSaved(nextSaved); setLoading(false); }
    }
    load();
    return () => { active = false; };
  }, [id, user]));

  if (loading) return <LoadingScreen label="Opening property..." />;
  if (!property) return <EmptyState title="Property not found" message="This listing may have been removed." />;

  const price = new Intl.NumberFormat('en-IN').format(property.price);
  const isOwner = user?.uid === property.ownerId;

  async function handleFavorite() {
    if (!user || !id) return;
    try { setSaved(await toggleFavorite(user.uid, id)); }
    catch (error) { Alert.alert('Unable to save', friendlyFirebaseError(error)); }
  }

  function contactOwner() {
    Linking.openURL(`tel:${property?.phone}`).catch(() => Alert.alert('Unable to call', 'This device cannot open the phone app.'));
  }

  function removeProperty() {
    if (!user || !property) return;
    Alert.alert('Delete property?', 'This removes the listing from MeroGhar.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: async () => {
        try { await deletePropertyById(property.id, user.uid); router.replace('/my-properties'); }
        catch (error) { Alert.alert('Unable to delete', friendlyFirebaseError(error)); }
      } },
    ]);
  }

  return (
    <ScrollView style={styles.safe} contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.imageWrap}>
        {property.imageUrl ? <Image source={{ uri: property.imageUrl }} style={styles.image} /> : <View style={styles.placeholder}><Ionicons name="home" size={64} color={Colors.primary} /></View>}
        <Pressable onPress={handleFavorite} style={styles.favoriteButton}><Ionicons name={saved ? 'heart' : 'heart-outline'} size={26} color={saved ? Colors.danger : Colors.primary} /></Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.badge}><Text style={styles.badgeText}>For {property.listingType}</Text></View>
        <Text style={styles.title}>{property.title}</Text>
        <View style={styles.locationRow}><Ionicons name="location-outline" size={19} color={Colors.muted} /><Text style={styles.location}>{property.location}</Text></View>
        <Text style={styles.price}>Rs. {price}{property.listingType === 'Rent' ? ' / month' : ''}</Text>

        <View style={styles.features}>
          <Feature icon="bed-outline" value={`${property.bedrooms}`} label="Bedrooms" />
          <Feature icon="water-outline" value={`${property.bathrooms}`} label="Bathrooms" />
          <Feature icon="home-outline" value={property.category} label="Type" />
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{property.description}</Text>

        <Text style={styles.sectionTitle}>Listed by</Text>
        <View style={styles.ownerCard}>
          <View style={styles.ownerAvatar}><Text style={styles.ownerAvatarText}>{property.ownerName.charAt(0).toUpperCase()}</Text></View>
          <View style={{ flex: 1 }}><Text style={styles.ownerName}>{property.ownerName}</Text><Text style={styles.ownerPhone}>{property.phone}</Text></View>
          <Ionicons name="shield-checkmark" size={22} color={Colors.accent} />
        </View>

        <AppButton title={isOwner ? 'This is your listing' : 'Call Property Owner'} onPress={contactOwner} disabled={isOwner} style={{ marginTop: 22 }} />
        {isOwner ? <AppButton title="Delete Property" onPress={removeProperty} variant="danger" style={{ marginTop: 12 }} /> : null}
      </View>
    </ScrollView>
  );
}

function Feature({ icon, value, label }: { icon: keyof typeof Ionicons.glyphMap; value: string; label: string }) {
  return <View style={styles.feature}><Ionicons name={icon} size={24} color={Colors.primary} /><Text style={styles.featureValue}>{value}</Text><Text style={styles.featureLabel}>{label}</Text></View>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { paddingBottom: 40 },
  imageWrap: { height: 285, backgroundColor: Colors.primarySoft },
  image: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  favoriteButton: { position: 'absolute', right: 18, top: 18, width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center', shadowColor: Colors.shadow, shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
  content: { padding: 20 },
  badge: { alignSelf: 'flex-start', backgroundColor: Colors.primarySoft, borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  badgeText: { color: Colors.primary, fontSize: 12, fontWeight: '800' },
  title: { color: Colors.primary, fontSize: 28, fontWeight: '900', marginTop: 13 },
  locationRow: { flexDirection: 'row', gap: 6, alignItems: 'center', marginTop: 8 },
  location: { color: Colors.muted, fontSize: 15 },
  price: { color: Colors.accent, fontSize: 22, fontWeight: '900', marginTop: 14 },
  features: { flexDirection: 'row', backgroundColor: Colors.surface, borderRadius: 18, padding: 16, marginTop: 22 },
  feature: { flex: 1, alignItems: 'center' },
  featureValue: { color: Colors.text, fontWeight: '900', marginTop: 6 },
  featureLabel: { color: Colors.muted, fontSize: 11, marginTop: 2 },
  sectionTitle: { color: Colors.text, fontSize: 19, fontWeight: '900', marginTop: 25, marginBottom: 9 },
  description: { color: Colors.muted, fontSize: 15, lineHeight: 23 },
  ownerCard: { backgroundColor: Colors.surface, borderRadius: 17, flexDirection: 'row', alignItems: 'center', gap: 12, padding: 15 },
  ownerAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  ownerAvatarText: { color: Colors.surface, fontWeight: '900', fontSize: 18 },
  ownerName: { color: Colors.text, fontWeight: '800', fontSize: 16 },
  ownerPhone: { color: Colors.muted, marginTop: 3 },
});
