import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Asegúrate de que la configuración sea correcta

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Suponiendo que tienes el uid del usuario almacenado en algún lugar (por ejemplo, en el contexto o global state)
    const userId = 'user-uid'; // Sustituir con el uid real del usuario

    const getUserData = async () => {
      try {
        const docRef = doc(db, 'users', userId); // La colección 'users' y el documento con el uid del usuario
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          Alert.alert('Error', 'No se encontraron datos de usuario');
        }
      } catch (error) {
        console.error('Error obteniendo los datos del usuario:', error);
        Alert.alert('Error', 'Hubo un problema al obtener los datos');
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <Text>Cargando...</Text>; // O algún componente de carga
  }

  if (!userData) {
    return <Text>No se encontraron datos de usuario.</Text>; // Si no se obtienen datos, muestra un mensaje
  }

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Tu perfil</Text>
        <Image
          source={{ uri: userData.profileImage }} // Usa la URL de la imagen del perfil del usuario desde Firebase
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData.name}</Text> {/* Nombre del usuario */}
      </View>

      {/* Lists Section */}
      <View style={styles.listsSection}>
        {userData.lists.map((list: any, index: number) => (
          <View key={index} style={styles.listCard}>
            <Image
              source={{ uri: list.image }} // Imagen de cada lista
              style={styles.listImage}
            />
            <Text style={styles.listName}>{list.name}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={() => router.push('/editarperfil')}>
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
