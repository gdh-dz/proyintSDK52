import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { auth, db } from '@/firebaseConfig'; // Asegúrate de importar correctamente Firebase
import { doc, getDoc } from 'firebase/firestore';

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          throw new Error('Usuario no autenticado');
        }

        setUserEmail(currentUser.email || 'Correo no disponible'); // Guardamos el correo del usuario

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.name || 'Nombre no disponible');
          setUserPhone(data.phone || 'Número no disponible');
        } else {
          Alert.alert('Error', 'No se encontraron datos del usuario');
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        Alert.alert('Error', 'No se pudo cargar el perfil');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Tu perfil</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Imagen de perfil genérica
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userName || 'Nombre no disponible'}</Text>
        <Text style={styles.profileEmail}>{userEmail || 'Correo no disponible'}</Text>
        <Text style={styles.profilePhone}>{userPhone || 'Número no disponible'}</Text>
      </View>

      {/* Lists Section */}
      <View style={styles.listsSection}>
        <View style={styles.listCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Imagen genérica para la lista
            style={styles.listImage}
          />
          <Text style={styles.listName}>Lista 1</Text>
        </View>
        <View style={styles.listCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Imagen genérica para la lista
            style={styles.listImage}
          />
          <Text style={styles.listName}>Lista 2</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => router.push('/editarperfil')}>
        <Text style={styles.editarText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => auth.signOut()}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 10,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  profileEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    marginTop: 5,
  },
  profilePhone: {
    fontSize: 14,
    fontWeight: '400',
    color: '#555',
    marginTop: 5,
  },
  listsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  listCard: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2E7D32',
    borderRadius: 10,
    padding: 10,
  },
  listImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  listName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 15,
    alignItems: 'center',
  },
  editarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
