import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/colors';
import { Property } from '@/types';

export function PropertyCard({ property, onPress }: { property: Property; onPress: () => void }) {
  const price = new Intl.NumberFormat('en-IN').format(property.price);

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.imageWrap}>
        {property.imageUrl ? (
          <Image source={{ uri: property.imageUrl }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="home" size={46} color={Colors.primary} />
          </View>
        )}
        <View style={styles.badge}>
          <Text style={styles.badgeText}>For {property.listingType}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={16} color={Colors.muted} />
          <Text style={styles.location} numberOfLines={1}>{property.location}</Text>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <Ionicons name="bed-outline" size={17} color={Colors.primary} />
            <Text style={styles.featureText}>{property.bedrooms} beds</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="water-outline" size={17} color={Colors.primary} />
            <Text style={styles.featureText}>{property.bathrooms} baths</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="home-outline" size={17} color={Colors.primary} />
            <Text style={styles.featureText}>{property.category}</Text>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>
            Rs. {price}{property.listingType === 'Rent' ? ' / month' : ''}
          </Text>
          <View style={styles.detailsButton}>
            <Text style={styles.detailsText}>View details</Text>
            <Ionicons name="chevron-forward" size={15} color={Colors.primary} />
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.09,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  pressed: { opacity: 0.9 },
  imageWrap: { height: 180, backgroundColor: Colors.primarySoft },
  image: { width: '100%', height: '100%' },
  placeholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: { color: Colors.surface, fontSize: 12, fontWeight: '700' },
  content: { padding: 16 },
  title: { color: Colors.primary, fontSize: 20, fontWeight: '800' },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 8 },
  location: { color: Colors.muted, fontSize: 14, flex: 1 },
  featureRow: { flexDirection: 'row', gap: 12, marginTop: 13, flexWrap: 'wrap' },
  featureItem: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  featureText: { color: Colors.muted, fontSize: 12, fontWeight: '600' },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  price: { color: Colors.accent, fontSize: 16, fontWeight: '800', flex: 1 },
  detailsButton: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  detailsText: { color: Colors.primary, fontSize: 12, fontWeight: '800' },
});
