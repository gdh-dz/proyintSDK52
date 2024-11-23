import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ToastAndroid, Pressable } from 'react-native';
import { addUserToList } from '@/services/lists'; // Aquí va el servicio que agregará al usuario
import { router, useLocalSearchParams } from 'expo-router';
import { getUserIdFromSession } from '@/services/auth';

const AgregarUsuarioLista: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [didShared, setdidShared] = useState(Boolean)
  const { id } = useLocalSearchParams();

  useEffect(() => {
    const agregarUsuario = async () => {
      try {
        // Obtener `userId` desde la sesión
        const userId = await getUserIdFromSession();
        const listId = Array.isArray(id) ? id[0] : id;

        // Validar que ambos IDs son válidos
        if (typeof userId === 'string' && typeof listId === 'string') {
          const result = await addUserToList(listId, userId);

          if (result == true) {
            setdidShared(true)
            setMessage('Usuario agregado exitosamente a la lista.');
          } else {
            setMessage('No se pudo agregar al usuario.');
          }
        } else {
          setMessage('ID inválido.');
        }
      } catch (error) {
        console.error('Error al agregar el usuario:', error);
        setMessage('Ocurrió un error al agregar al usuario. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false); // Asegurarse de detener el loading
      }
    };

    agregarUsuario();
  }, [id]);
  const backToIndex = () => {
    router.navigate('/(tabs)');
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#34C759" />
      ) : (
        <><Text style={styles.message}>{message}</Text>
        <Pressable style={styles.submitButton} onPress={backToIndex}>
          <Text style={styles.submitButtonText}>Regresar a HomeScreen</Text>
        </Pressable></>
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
  submitButton: {
    backgroundColor: '#5F7F1E',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34C759',
    textAlign: 'center',
    paddingBottom:50
  },
});

export default AgregarUsuarioLista;
