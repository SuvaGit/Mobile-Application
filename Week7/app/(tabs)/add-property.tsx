import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppInput } from '@/components/AppInput';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { addProperty } from '@/services/property-service';
import { ListingType, PropertyCategory } from '@/types';
import { friendlyFirebaseError } from '@/utils/firebase-errors';

const listingTypes: ListingType[] = ['Rent', 'Buy'];
const categories: PropertyCategory[] = ['Room', 'Apartment', 'House'];

export default function AddPropertyScreen() {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [listingType, setListingType] = useState<ListingType>('Rent');
  const [category, setCategory] = useState<PropertyCategory>('Apartment');
  const [bedrooms, setBedrooms] = useState('1');
  const [bathrooms, setBathrooms] = useState('1');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function pickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Allow photo access to upload a property image.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [4, 3], quality: 0.8 });
    if (!result.canceled) setImageUri(result.assets[0].uri);
  }

  async function submit() {
    if (!user) return;
    if (!title.trim() || !location.trim() || !city.trim() || !price.trim() || !phone.trim() || !description.trim()) {
      Alert.alert('Complete the form', 'Fill in all required fields before posting.');
      return;
    }
    const numericPrice = Number(price.replace(/,/g, ''));
    if (!Number.isFinite(numericPrice) || numericPrice <= 0) {
      Alert.alert('Invalid price', 'Enter a valid property price.');
      return;
    }

    try {
      setLoading(true);
      const id = await addProperty(
        {
          title: title.trim(),
          location: location.trim(),
          city: city.trim(),
          price: numericPrice,
          listingType,
          category,
          bedrooms: Number(bedrooms) || 0,
          bathrooms: Number(bathrooms) || 0,
          phone: phone.trim(),
          description: description.trim(),
        },
        user.uid,
        user.displayName,
        imageUri,
      );
      Alert.alert('Property posted', 'Your listing is now available in MeroGhar.', [
        { text: 'View Property', onPress: () => router.replace(`/property/${id}`) },
      ]);
      setTitle(''); setLocation(''); setCity(''); setPrice(''); setPhone(''); setDescription(''); setImageUri(null);
    } catch (error) {
      Alert.alert('Unable to post property', friendlyFirebaseError(error));
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Post a Property</Text>
          <Text style={styles.subtitle}>Add complete details so people can find your listing.</Text>

          <Pressable onPress={pickImage} style={styles.imagePicker}>
            {imageUri ? <Image source={{ uri: imageUri }} style={styles.preview} /> : (
              <View style={styles.imagePlaceholder}><Ionicons name="camera-outline" size={34} color={Colors.primary} /><Text style={styles.imageText}>Add property photo</Text></View>
            )}
          </Pressable>

          <Text style={styles.label}>Listing type</Text>
          <View style={styles.optionRow}>{listingTypes.map((item) => <Option key={item} label={item} active={listingType === item} onPress={() => setListingType(item)} />)}</View>
          <Text style={styles.label}>Property category</Text>
          <View style={styles.optionRow}>{categories.map((item) => <Option key={item} label={item} active={category === item} onPress={() => setCategory(item)} />)}</View>

          <View style={styles.form}>
            <AppInput label="Property title *" value={title} onChangeText={setTitle} placeholder="2BHK Apartment" icon="home-outline" />
            <AppInput label="Full location *" value={location} onChangeText={setLocation} placeholder="Baneshwor, Kathmandu" icon="location-outline" />
            <AppInput label="City *" value={city} onChangeText={setCity} placeholder="Kathmandu" icon="business-outline" />
            <AppInput label={listingType === 'Rent' ? 'Monthly rent (Rs.) *' : 'Selling price (Rs.) *'} value={price} onChangeText={setPrice} placeholder="25000" keyboardType="numeric" icon="cash-outline" />
            <View style={styles.twoColumns}>
              <View style={{ flex: 1 }}><AppInput label="Bedrooms" value={bedrooms} onChangeText={setBedrooms} keyboardType="numeric" icon="bed-outline" /></View>
              <View style={{ flex: 1 }}><AppInput label="Bathrooms" value={bathrooms} onChangeText={setBathrooms} keyboardType="numeric" icon="water-outline" /></View>
            </View>
            <AppInput label="Contact phone *" value={phone} onChangeText={setPhone} placeholder="98XXXXXXXX" keyboardType="phone-pad" icon="call-outline" />
            <AppInput label="Description *" value={description} onChangeText={setDescription} placeholder="Describe the property, facilities, nearby places..." multiline numberOfLines={5} style={{ minHeight: 100, textAlignVertical: 'top' }} icon="document-text-outline" />
            <AppButton title="Publish Property" onPress={submit} loading={loading} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Option({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return <Pressable onPress={onPress} style={[styles.option, active && styles.optionActive]}><Text style={[styles.optionText, active && styles.optionTextActive]}>{label}</Text></Pressable>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { padding: 20, paddingBottom: 110 },
  title: { color: Colors.primary, fontSize: 29, fontWeight: '900' },
  subtitle: { color: Colors.muted, marginTop: 6, lineHeight: 21 },
  imagePicker: { height: 205, borderRadius: 18, overflow: 'hidden', marginTop: 22, backgroundColor: Colors.primarySoft, borderWidth: 1, borderStyle: 'dashed', borderColor: Colors.primary },
  preview: { width: '100%', height: '100%' },
  imagePlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 9 },
  imageText: { color: Colors.primary, fontWeight: '800' },
  label: { color: Colors.text, fontSize: 14, fontWeight: '700', marginTop: 19, marginBottom: 9 },
  optionRow: { flexDirection: 'row', gap: 9, flexWrap: 'wrap' },
  option: { backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border, borderRadius: 999, paddingHorizontal: 16, paddingVertical: 10 },
  optionActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  optionText: { color: Colors.text, fontWeight: '700' },
  optionTextActive: { color: Colors.surface },
  form: { gap: 16, marginTop: 21 },
  twoColumns: { flexDirection: 'row', gap: 12 },
});
