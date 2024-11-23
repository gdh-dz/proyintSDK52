import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import { router, useRouter } from 'expo-router';
import { getUserIdFromSession } from '@/services/auth';
import {  logOut } from '@/services/auth';
import { getUserById } from '@/services/userservices';
import { getCollaborativeListsByUserId, getIndividualListsByUserId, getRandomIconUrl } from '@/services/lists';
import { List } from '../../models/Lists';
import { auth } from '@/firebaseConfig';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [myLists, setMyLists] = useState<List[]>([]);
  const [ourLists, setOurLists] = useState<List[]>([]);
  const [iconsMap, setIconsMap] = useState<Record<string, string>>({}); // Almacena los íconos aleatorios

  // Obtener listas del usuario
  const fetchIndividualLists = async (userId: string) => {
    try {
      const lists = await getIndividualListsByUserId(userId);
      setMyLists(lists);
      await fetchIconsForLists(lists); // Llama a fetchIconsForLists para obtener los íconos
    } catch (error) {
      console.error("Error fetching individual lists:", error);
    }
  };

  // Obtener íconos aleatorios para cada lista
  const fetchIconsForLists = async (lists: List[]) => {
    const newIconsMap: Record<string, string> = {};
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i];
      const iconUrl = await getRandomIconUrl(); // Llama al servicio para obtener un ícono aleatorio
      const key = list.id ?? `generated-key-${i}`; // Usa el ID de la lista o genera un key único
      newIconsMap[key] = iconUrl || ""; // Asocia el ícono a la lista
    }
    setIconsMap((prev) => ({ ...prev, ...newIconsMap })); // Actualiza el estado con los íconos obtenidos
  };

  // Obtener listas al iniciar
  useEffect(() => {
    const fetchLists = async () => {
      const user = auth.currentUser;
      if (user) {
        const userId = await getUserIdFromSession();
        if (userId) {
          try {
            await fetchIndividualLists(userId);
          } catch (error) {
            console.error("Error fetching lists:", error);
          }
        }
      }
    };
    fetchLists();
  }, []);


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
        {myLists.map((list, index) => (
          <View key={list.id || `list-${index}`} style={styles.listCard}>
            <Image
              source={{ uri: iconsMap[list.id ?? `generated-key-${index}`] || 'https://via.placeholder.com/60' }}
              style={styles.listImage}
            />
            <Text style={styles.listName}>{list.listName}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigateUserEdit(user.id)} // Llama la función con el ID del usuario
      >
        <Text style={styles.editarText}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const handleLogout = async () => {
  try {
    await logOut();
    console.log("Sesión cerrada", "Has salido exitosamente");
    router.push('/login');
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    console.log("Error", "Hubo un problema al cerrar la sesión. Inténtalo de nuevo.");
  }
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
function fetchIconsForLists(lists: import("../../models/Lists").List[]) {
  throw new Error('Function not implemented.');
}

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}

