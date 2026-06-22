import { Redirect } from 'expo-router';

import { LoadingScreen } from '@/components/LoadingScreen';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();
  if (loading) return <LoadingScreen />;
  return <Redirect href={user ? '/(tabs)' : '/(auth)/login'} />;
}
