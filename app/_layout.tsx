import React, { useEffect, useState } from 'react';
import { useRouter, Slot } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { getUserToken } from '@/services/auth';

const Layout: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getUserToken(); // Aquí verificas si el usuario tiene un token válido
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      router.replace('/login'); // Redirige al login si no está autenticado
    } else if (isAuthenticated === true) {
      router.replace('/(tabs)'); // Redirige a las pestañas principales si está autenticado
    }
  }, [isAuthenticated]);

  if (isAuthenticated === null) {
    // Mientras se verifica el estado de autenticación, muestra un indicador de carga
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
};

export default Layout;
