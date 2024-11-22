import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Dimensions, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getUserIdFromSession } from '../../services/auth';
import { getIndividualListsByUserId, getCollaborativeListsByUserId } from '../../services/lists';
import { List } from '../../models/Lists';
const { width } = Dimensions.get('window');
import * as Linking from "expo-linking";
import { auth } from '@/firebaseConfig';
import QRCode from 'react-native-qrcode-svg';
import EditarPerfil from '../editarperfil'; // Ruta correcta al archivo EditarPerfil

// Importar el UserProvider desde donde lo tengas definido
import { UserProvider } from './context/UserContext'; // Asegúrate de que la ruta sea la correcta

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [myLists, setMyLists] = useState<List[]>([]);
  const [ourLists, setOurLists] = useState<List[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchIndividualLists = async (userId: string) => {
    try {
      const lists = await getIndividualListsByUserId(userId);
      setMyLists(lists);
    } catch (error) {
      console.error('Error fetching individual lists:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCollaborativeLists = async (userId: string) => {
    try {
      const lists = await getCollaborativeListsByUserId(userId);
      setOurLists(lists);
    } catch (error) {
      console.error('Error fetching collaborative lists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = await getUserIdFromSession();
        if (userId) {
          setLoading(true);
          await fetchIndividualLists(userId);
          await fetchCollaborativeLists(userId);
        }
      } else {
        setMyLists([]);
        setOurLists([]);
      }
    });

    return unsubscribe;
  }, []);

  const encodeBase64 = (data: string | undefined) => {
    try {
      const decodedData = btoa(data ?? "");
      return decodedData;
    } catch (error) {
      console.error("Error codificando a Base64: ", error);
      return null;
    }
  };

  const renderListItem = (list: List) => (
    <View style={styles.listItemContainer} key={list.listName}>
      <View style={styles.listFrame} />
      <Text style={styles.listText}>{list.listName}</Text>
      <QRCode value={encodeBase64(list.id ?? undefined) ?? ""} size={270} />
    </View>
  );

  return (
    // Envolver toda la pantalla con UserProvider para que el contexto esté disponible
    <UserProvider>
      <StatusBar barStyle="light-content" backgroundColor="#256847" />
      <SafeAreaView style={styles.container}>
        <View style={styles.searchFrame}>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar lista..."
            placeholderTextColor="#A9A9A9"
          />
        </View>

        <View style={styles.listsContainer}>
          <View style={styles.listSectionsContainer}>
            <View style={styles.sectionFrame}>
              <View style={styles.tagContainer}>
                <Text style={styles.sectionTag}>Mis listas</Text>
              </View>
              
              {loading ? (
                <Text>Cargando...</Text>
              ) : myLists.length === 0 ? (
                <Text>No tienes listas.</Text>
              ) : (
                <FlatList
                  horizontal
                  data={myLists}
                  renderItem={({ item }) => renderListItem(item)}
                  keyExtractor={(item) => item.listName ?? 'default-key'}
                  contentContainerStyle={styles.carouselContainer}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </View>

            <View style={styles.sectionFrame}>
              <View style={styles.tagContainer}>
                <Text style={styles.sectionTag}>Listas compartidas</Text>
              </View>
              <FlatList
                horizontal
                data={ourLists}
                renderItem={({ item }) => renderListItem(item)}
                keyExtractor={(item) => item.listName ?? 'default-key' }
                contentContainerStyle={styles.carouselContainer}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.createListButton} onPress={() => router.push('/new-list')}>
            <Ionicons name="add-circle-outline" size={24} color="#2E7D32" />
            <Text style={styles.createListButtonText}>Crear lista</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#256847',
  },
  searchFrame: {
    width: '100%',
    backgroundColor: '#256847',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: width * 0.9,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    color: '#000',
  },
  listsContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 10,
    alignItems: 'center',
  },
  listSectionsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  sectionFrame: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 20,
  },
  tagContainer: {
    borderRadius: 20,
    backgroundColor: '#5F7F1E',
  },
  sectionTag: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#FFF',
    fontWeight: 'medium',
    textAlign: 'center',
  },
  carouselContainer: {
    paddingHorizontal: 10,
  },
  listItemContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  listFrame: {
    width: 150,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 5,
  },
  listText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  createListButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createListButtonText: {
    color: '#256847',
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
