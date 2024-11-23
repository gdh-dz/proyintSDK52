import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';
import React from 'react';

// Importar el UserProvider
import { UserProvider } from './(tabs)/context/UserContext'; // Ajusta la ruta si es necesario

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider> {/* Envolver el ThemeProvider y Stack en UserProvider */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="agregarproducto" options={{ title: "Mis productos" }} />
          <Stack.Screen name="IconSelectionScreen" options={{ title: "Agregar Producto" }} />
          <Stack.Screen name="homescreen" options={{ title: "Homescreen" }} />
          <Stack.Screen name="new-list" options={{ title: "Crear Nueva Lista" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </UserProvider>
  );
}
