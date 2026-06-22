import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore';

import { sampleProperties } from '@/constants/sample-properties';
import { db } from '@/services/firebase';
import { uploadPropertyImage } from '@/services/storage-service';
import { NewPropertyInput, Property } from '@/types';

const DEMO_PROPERTIES_KEY = '@meroghar/demo-properties';
const demoListeners = new Set<(properties: Property[]) => void>();

function mergeWithSampleProperties(properties: Property[]): Property[] {
  const liveIds = new Set(properties.map((property) => property.id));
  const missingSamples = sampleProperties.filter((property) => !liveIds.has(property.id));
  return [...properties, ...missingSamples].sort((a, b) => b.createdAtMillis - a.createdAtMillis);
}

function fromFirestore(id: string, data: Record<string, any>): Property {
  return {
    id,
    ownerId: data.ownerId ?? '',
    ownerName: data.ownerName ?? 'Property Owner',
    title: data.title ?? '',
    description: data.description ?? '',
    location: data.location ?? '',
    city: data.city ?? '',
    price: Number(data.price ?? 0),
    listingType: data.listingType === 'Buy' ? 'Buy' : 'Rent',
    category: ['Room', 'Apartment', 'House'].includes(data.category) ? data.category : 'Room',
    bedrooms: Number(data.bedrooms ?? 0),
    bathrooms: Number(data.bathrooms ?? 0),
    phone: data.phone ?? '',
    imageUrl: data.imageUrl ?? null,
    createdAtMillis: data.createdAt?.toMillis?.() ?? Date.now(),
  };
}

async function loadDemoProperties(): Promise<Property[]> {
  const raw = await AsyncStorage.getItem(DEMO_PROPERTIES_KEY);
  const custom: Property[] = raw ? JSON.parse(raw) : [];
  return [...custom, ...sampleProperties].sort((a, b) => b.createdAtMillis - a.createdAtMillis);
}

async function notifyDemoListeners() {
  const properties = await loadDemoProperties();
  demoListeners.forEach((listener) => listener(properties));
}

export function subscribeToProperties(callback: (properties: Property[]) => void) {
  if (!db) {
    demoListeners.add(callback);
    loadDemoProperties().then(callback);
    return () => {
      demoListeners.delete(callback);
    };
  }

  const propertiesQuery = query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(100));
  return onSnapshot(
    propertiesQuery,
    (snapshot) =>
      callback(
        mergeWithSampleProperties(snapshot.docs.map((item) => fromFirestore(item.id, item.data()))),
      ),
    () => callback(sampleProperties),
  );
}

export async function getAllProperties(): Promise<Property[]> {
  if (!db) return loadDemoProperties();
  const snapshot = await getDocs(query(collection(db, 'properties'), orderBy('createdAt', 'desc'), limit(100)));
  return mergeWithSampleProperties(snapshot.docs.map((item) => fromFirestore(item.id, item.data())));
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const sample = sampleProperties.find((property) => property.id === id);
  if (sample) return sample;

  if (!db) {
    return (await loadDemoProperties()).find((property) => property.id === id) ?? null;
  }

  const snapshot = await getDoc(doc(db, 'properties', id));
  return snapshot.exists() ? fromFirestore(snapshot.id, snapshot.data()) : null;
}

export async function addProperty(
  input: NewPropertyInput,
  ownerId: string,
  ownerName: string,
  imageUri?: string | null,
): Promise<string> {
  if (!db) {
    const currentRaw = await AsyncStorage.getItem(DEMO_PROPERTIES_KEY);
    const current: Property[] = currentRaw ? JSON.parse(currentRaw) : [];
    const property: Property = {
      ...input,
      id: `demo-property-${Date.now()}`,
      ownerId,
      ownerName,
      imageUrl: imageUri ?? null,
      createdAtMillis: Date.now(),
    };
    await AsyncStorage.setItem(DEMO_PROPERTIES_KEY, JSON.stringify([property, ...current]));
    await notifyDemoListeners();
    return property.id;
  }

  let imageUrl: string | null = null;

  if (imageUri) {
    try {
      imageUrl = await uploadPropertyImage(ownerId, imageUri);
    } catch (error) {
      console.warn('Property image upload skipped:', error);
    }
  }
  const reference = await addDoc(collection(db, 'properties'), {
    ...input,
    ownerId,
    ownerName,
    imageUrl,
    createdAt: serverTimestamp(),
  });
  return reference.id;
}

export async function getPropertiesByOwner(ownerId: string): Promise<Property[]> {
  if (!db) return (await loadDemoProperties()).filter((property) => property.ownerId === ownerId);

  const snapshot = await getDocs(query(collection(db, 'properties'), where('ownerId', '==', ownerId)));
  return snapshot.docs
    .map((item) => fromFirestore(item.id, item.data()))
    .sort((a, b) => b.createdAtMillis - a.createdAtMillis);
}

export async function deletePropertyById(id: string, ownerId: string): Promise<void> {
  if (!db) {
    const raw = await AsyncStorage.getItem(DEMO_PROPERTIES_KEY);
    const current: Property[] = raw ? JSON.parse(raw) : [];
    const updated = current.filter((property) => !(property.id === id && property.ownerId === ownerId));
    await AsyncStorage.setItem(DEMO_PROPERTIES_KEY, JSON.stringify(updated));
    await notifyDemoListeners();
    return;
  }

  await deleteDoc(doc(db, 'properties', id));
}
