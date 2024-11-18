import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid } from 'react-native';
import { addUserToList } from '@/services/lists'; // Aquí va el servicio que agregará al usuario
import { useLocalSearchParams } from 'expo-router';
import { getUserIdFromSession } from '@/services/auth';

const AgregarUsuarioLista: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const agregarUsuario = async () => {
      try {
        // Verifica si 'id' es un arreglo y usa el primer elemento si es necesario
        const userId = getUserIdFromSession(); // Asumiendo que ya tienes el 'userId'
        const listId = Array.isArray(id) ? id[0] : id; // Asegura que 'id' sea una cadena
  
        if (typeof listId === 'string') {
          const result = await addUserToList(listId,await userId ?? "");
          console.log(result) // Pasa el ID de la lista
        } else {
          console.error('ID inválido');
        }
      } catch (error) {
        console.error('Error al agregar el usuario:', error);
      }
    };
  
    agregarUsuario();
  }, [id]);


  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#34C759" />
      ) : (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
    textAlign: 'center',
  },
});

export default AgregarUsuarioLista;
