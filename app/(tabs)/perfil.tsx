import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getUserIdFromSession } from '@/services/auth';
import { getUserById } from '@/services/userservices';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = await getUserIdFromSession();
        if (userId) {
          const userData = await getUserById(userId);
          setUser(userData);
        } else {
          setUser(null); // Redirige al login si no hay usuario
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2E7D32" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>No se encontró información del usuario.</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => router.push('/login')}>
          <Text style={styles.logoutText}>Ir a Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const navigateUserEdit = (userId: string) => {
    router.push(`/editarperfil?id=${userId}`);
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Tu perfil</Text>
        <Image
          source={{ uri: user.profileImage || 'https://via.placeholder.com/100' }} // URL de imagen del perfil
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user.name || 'Nombre Apellidos'}</Text>
      </View>

      {/* Lists Section */}
      <View style={styles.listsSection}>
        <View style={styles.listCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Cambia por tus imágenes
            style={styles.listImage}
          />
          <Text style={styles.listName}>Lista 1</Text>
        </View>
        <View style={styles.listCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Cambia por tus imágenes
            style={styles.listImage}
          />
          <Text style={styles.listName}>Lista 2</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigateUserEdit(user.id)} // Llama la función con el ID del usuario
      >
        <Text style={styles.editarText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton}>
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
