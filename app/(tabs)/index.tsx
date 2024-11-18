import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Dimensions, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, router } from 'expo-router';
import { getUserIdFromSession } from '../../services/auth'; // Asegúrate de importar la función
import { getIndividualListsByUserId, getCollaborativeListsByUserId} from '../../services/lists'; // Asegúrate de importar la función
import { List } from '../../models/Lists';
const { width } = Dimensions.get('window');
import * as Linking from "expo-linking";
import { useNavigation } from '@react-navigation/native';
import { auth } from '@/firebaseConfig';
import QRCode from 'react-native-qrcode-svg';


/*const [data, setData] = useState("")
const prefix = Linking.createURL('/')
const linking = {
  prefixes: [prefix],
  config : {
    screens:{
      Home: "index"
    }
  }
}

function handleDeepLink(event: { url: string; }){
  const parsedData = Linking.parse(event.url);
  setData(parsedData.path || "")
}
useEffect (() => {
  const subscription = Linking.addEventListener('url', handleDeepLink);
  return () => subscription.remove();
}, [])
*/

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [myLists, setMyLists] = useState<List[]>([]);  // Estado para las listas del usuario
  const [ourLists, setOurLists] = useState<List[]>([]);  // Estado para las listas del usuario

  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

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

  // Función para obtener las listas colaborativas
  const fetchCollaborativeLists = async (userId: string) => {
    try {
      const lists = await getCollaborativeListsByUserId(userId);

      console.log(userId)
      setOurLists(lists);
    } catch (error) {
      console.error('Error fetching collaborative lists:', error);
    } finally {
      setLoading(false);
    }
  };

  // Listener para autenticación
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userId = await getUserIdFromSession();
        if (userId) {
          setLoading(true); // Iniciar carga
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
      const decodedData = btoa(data ?? ""); // Usa una cadena vacía si `data` es undefined
      return decodedData;
    } catch (error) {
      console.error("Error codificando a Base64: ", error);
      return null;
    }
  };
  
  // Renderiza cada elemento de la lista
  const renderListItem = (list: List) => (
    <View style={styles.listItemContainer} key={list.listName}>
      <View style={styles.listFrame} />
      <Text style={styles.listText}>{list.listName}</Text>
      <QRCode value={encodeBase64(list.id ?? undefined) ?? ""} size={270} />
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#256847" />
      <SafeAreaView style={styles.container}>
        {/* Frame que contiene la barra de búsqueda */}
        <View style={styles.searchFrame}>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar lista..."
            placeholderTextColor="#A9A9A9"
          />
        </View>

        {/* Contenedor para las secciones de listas agrupadas en un frame */}
        <View style={styles.listsContainer}>
          <View style={styles.listSectionsContainer}>
            {/* Frame de "Mis listas" */}
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

            {/* Frame de "Listas compartidas" */}
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

          {/* Botón "Crear lista" */}
          <TouchableOpacity style={styles.createListButton} onPress={() => router.push('/new-list')}>
          <Ionicons name="add-circle-outline" size={24} color="#2E7D32" />
            <Text style={styles.createListButtonText}>Crear lista</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#256847', // Fondo verde para toda la pantalla
  },
  searchFrame: {
    width: '100%',
    backgroundColor: '#256847', // Color verde para el frame de búsqueda
    paddingVertical: 20, // Espacio arriba y abajo de la searchBar
    alignItems: 'center',
    justifyContent: 'center',
  },
  listsContainer: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco para el contenedor de listas
    paddingVertical: 10, // Espacio vertical para el contenedor de listas
    alignItems: 'center', // Centrar contenido horizontalmente
  },
  searchBar: {
    width: width * 0.9, // 90% del ancho de la pantalla
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#f0f0f0', // Fondo gris claro para la barra de búsqueda
    color: '#000', // Color del texto de entrada
  },
  listSectionsContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Alinear al inicio
    alignItems: 'flex-start', // Alinear a la izquierda para que queden más alineados
    paddingHorizontal: 10, // Ajusta el padding horizontal según sea necesario
  },
  sectionFrame: {
    width: '100%',
    paddingVertical: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 20, // Aumentar el margen inferior para mayor separación
  },
  tagContainer: {
    borderRadius: 20,
    overflow: 'hidden', // Asegura que el borde redondeado se aplique correctamente
    backgroundColor: '#5F7F1E', // Verde pasto para el tag
  },
  sectionTag: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    color: '#FFF',
    fontWeight: 'medium', // Cambiar a '500' para consistencia
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
    height: 100, // Ajusta la altura según sea necesario
    borderRadius: 10,
    backgroundColor: '#e0e0e0', // Fondo gris para los cuadros
    marginBottom: 5,
  },
  listText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  createListButton: {
    backgroundColor: '#fff', // Fondo blanco para el botón
    paddingVertical: 20, 
    paddingHorizontal: 20, 
    borderRadius: 20,
    marginTop: 10, // Acercar el botón a las listas
    alignItems: 'center',
    justifyContent: 'center',
  },
  createListButtonText: {
    color: '#256847', // Texto verde
    fontFamily: 'Manrope',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20, // Ajustar el lineHeight si es necesario
  },
});

export default HomeScreen;


