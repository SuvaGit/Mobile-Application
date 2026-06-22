import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import * as FirebaseAuth from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => typeof value === 'string' && value.trim().length > 0,
);

export let firebaseApp: FirebaseApp | null = null;
export let auth: FirebaseAuth.Auth | null = null;
export let db: Firestore | null = null;
export let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured) {
  firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

  if (Platform.OS === 'web') {
    auth = FirebaseAuth.getAuth(firebaseApp);
  } else {
    try {
      const getPersistence = (FirebaseAuth as typeof FirebaseAuth & {
        getReactNativePersistence?: (storage: typeof AsyncStorage) => FirebaseAuth.Persistence;
      }).getReactNativePersistence;

      auth = getPersistence
        ? FirebaseAuth.initializeAuth(firebaseApp, {
            persistence: getPersistence(AsyncStorage),
          })
        : FirebaseAuth.getAuth(firebaseApp);
    } catch {
      auth = FirebaseAuth.getAuth(firebaseApp);
    }
  }

  db = getFirestore(firebaseApp);
  storage = getStorage(firebaseApp);
}
