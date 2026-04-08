import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import {
  Hind_300Light,
  Hind_400Regular,
  Hind_500Medium,
  Hind_600SemiBold,
  Hind_700Bold,
} from '@expo-google-fonts/hind'; // shared font assets
import { useFonts } from 'expo-font'; // shared font loader
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { SafeAreaView } from 'react-native-safe-area-context'; // shared safe area wrapper
import { useColorScheme } from '@/hooks/use-color-scheme';
// shared context
import { UserProvider } from '@/context/user';
// shared context
import { CartProvider } from '@/context/cart';
// shared context
import { FavoritesProvider } from '@/context/favorites';

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

const isDevelopment = __DEV__ || process.env.NODE_ENV === 'development';

const RootLayout =
  process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true'
    ? StorybookLayout
    : AppLayout;

export default RootLayout;

// Hides the splash screen on mount so Chromatic's capture process is not blocked.
// SplashScreen.preventAutoHideAsync() is called at module level above, but
// AppLayout's useEffect (which normally calls hideAsync) never runs in Storybook mode.
function StorybookLayout() {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const StorybookUIRoot = require('../.rnstorybook').default;

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // In dev, onDeviceUI: true toolbar pushes content below the status bar naturally.
  // In release (Chromatic), onDeviceUI: false renders from y=0, so SafeAreaView
  // is needed to keep story content in the safe zone during capture.
  if (__DEV__) {
    return <StorybookUIRoot />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StorybookUIRoot />
    </SafeAreaView>
  );
}

function AppLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Hind_300Light,
    Hind_400Regular,
    Hind_500Medium,
    Hind_600SemiBold,
    Hind_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserProvider>
    <FavoritesProvider>
    <CartProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Protected guard={isDevelopment}>
            <Stack.Screen name="storybook" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </CartProvider>
    </FavoritesProvider>
    </UserProvider>
  );
}
