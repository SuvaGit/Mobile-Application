import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { LoadingScreen } from '@/components/LoadingScreen';
import { Colors } from '@/constants/colors';
import { AuthProvider, useAuth } from '@/context/AuthContext';

function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerTintColor: Colors.primary, headerTitleStyle: { fontWeight: '700' } }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Protected guard={!user}>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={Boolean(user)}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="property/[id]" options={{ title: 'Property Details', headerBackTitle: 'Back' }} />
          <Stack.Screen name="my-properties" options={{ title: 'My Properties', headerBackTitle: 'Profile' }} />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
