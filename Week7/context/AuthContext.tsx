import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { auth, db, isFirebaseConfigured } from '@/services/firebase';
import { AppUser } from '@/types';

const DEMO_USER_KEY = '@meroghar/demo-user';

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  isDemoMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapFirebaseUser(user: User): AppUser {
  return {
    uid: user.uid,
    email: user.email ?? '',
    displayName: user.displayName || user.email?.split('@')[0] || 'MeroGhar User',
    photoURL: user.photoURL,
  };
}

function makeDemoUser(name: string, email: string): AppUser {
  return {
    uid: `demo-${email.trim().toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
    email: email.trim().toLowerCase(),
    displayName: name.trim() || email.split('@')[0] || 'Demo User',
    isDemo: true,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth) {
      return onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser ? mapFirebaseUser(firebaseUser) : null);
        setLoading(false);
      });
    }

    AsyncStorage.getItem(DEMO_USER_KEY)
      .then((stored) => setUser(stored ? JSON.parse(stored) : null))
      .finally(() => setLoading(false));
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      isDemoMode: !isFirebaseConfigured,
      login: async (email, password) => {
        if (!email.trim() || password.length < 6) {
          throw new Error('Enter a valid email and a password with at least 6 characters.');
        }

        if (auth) {
          await signInWithEmailAndPassword(auth, email.trim(), password);
          return;
        }

        const demoUser = makeDemoUser(email.split('@')[0], email);
        await AsyncStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
      },
      signup: async (name, email, password) => {
        if (name.trim().length < 2) throw new Error('Enter your full name.');
        if (!email.includes('@')) throw new Error('Enter a valid email address.');
        if (password.length < 6) throw new Error('Password must contain at least 6 characters.');

        if (auth) {
          const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
          await updateProfile(credential.user, { displayName: name.trim() });

          if (db) {
            await setDoc(doc(db, 'users', credential.user.uid), {
              displayName: name.trim(),
              email: email.trim().toLowerCase(),
              createdAt: serverTimestamp(),
            });
          }

          setUser(mapFirebaseUser(credential.user));
          return;
        }

        const demoUser = makeDemoUser(name, email);
        await AsyncStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
        setUser(demoUser);
      },
      resetPassword: async (email) => {
        if (!email.includes('@')) throw new Error('Enter a valid email address.');
        if (auth) await sendPasswordResetEmail(auth, email.trim());
      },
      logout: async () => {
        if (auth) {
          await signOut(auth);
          return;
        }
        await AsyncStorage.removeItem(DEMO_USER_KEY);
        setUser(null);
      },
    }),
    [loading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider.');
  return context;
}
