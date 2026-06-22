import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteDoc, doc, getDoc, getDocs, collection, serverTimestamp, setDoc } from 'firebase/firestore';

import { db } from '@/services/firebase';

function demoKey(uid: string) {
  return `@meroghar/favorites/${uid}`;
}

export async function getFavoriteIds(uid: string): Promise<string[]> {
  if (!db) {
    const raw = await AsyncStorage.getItem(demoKey(uid));
    return raw ? JSON.parse(raw) : [];
  }

  const snapshot = await getDocs(collection(db, 'users', uid, 'favorites'));
  return snapshot.docs.map((item) => item.id);
}

export async function isFavorite(uid: string, propertyId: string): Promise<boolean> {
  if (!db) return (await getFavoriteIds(uid)).includes(propertyId);
  return (await getDoc(doc(db, 'users', uid, 'favorites', propertyId))).exists();
}

export async function toggleFavorite(uid: string, propertyId: string): Promise<boolean> {
  if (!db) {
    const ids = await getFavoriteIds(uid);
    const alreadySaved = ids.includes(propertyId);
    const next = alreadySaved ? ids.filter((id) => id !== propertyId) : [...ids, propertyId];
    await AsyncStorage.setItem(demoKey(uid), JSON.stringify(next));
    return !alreadySaved;
  }

  const reference = doc(db, 'users', uid, 'favorites', propertyId);
  const snapshot = await getDoc(reference);
  if (snapshot.exists()) {
    await deleteDoc(reference);
    return false;
  }
  await setDoc(reference, { createdAt: serverTimestamp() });
  return true;
}
