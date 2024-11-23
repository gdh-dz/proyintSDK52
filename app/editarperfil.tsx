import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { getUserById, updateUserProfile } from '@/services/userservices';
import { User } from '@/models/User';

const EditProfileScreen: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const [validName, setValidName] = useState<Boolean>(true);
  const [validEmail, setValidEmail] = useState<Boolean>(true);

  const { id } = useLocalSearchParams();
  const idString = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    const fetchUser = async () => {
      if (idString) {
        try {
          const fetchedUser = await getUserById(idString);
          if (fetchedUser) {
            setUser(fetchedUser);
          } else {
            console.log('Usuario no encontrado');
          }
        } catch (error) {
          console.log('Error al cargar el usuario:', error);
        }
      }
    };

    fetchUser();
  }, [idString]);

  // Actualizar los valores de los inputs cuando el usuario es cargado
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      console.log("WiseMarket necesita permiso para acceder a la galería");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const saveData = async () => {
  if (!name || !email) {
    console.log('Faltan datos');
  } else {
    if (validName && validEmail) {
      try {
        // Guardar la imagen de perfil y los datos del usuario en Firestore
        const updatedUser = new User(email, name, user?.id, profileImage || undefined );
        await updateUserProfile(updatedUser); // Este método debe actualizar Firestore con la nueva imagen
        console.log('¡Guardado!');
        router.navigate('/(tabs)/perfil')
      } catch (error) {
        console.error('Error al guardar los datos:', error);
        console.log('Hubo un problema al guardar los datos.');
      }
    } else {
      console.log('Datos incorrectos');
    }
  }
};

  useEffect(() => {
    setValidName(name.length >= 0);
    setValidEmail(email.includes('@'));
  }, [name, email]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edita tu perfil</Text>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: profileImage || 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Name Field */}
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={validName ? styles.input : styles.inputError}
        value={name}
        onChangeText={setName}
        placeholder="Nombre Apellidos"
      />

      {/* Email Field */}
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={validEmail ? styles.input : styles.inputError}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="correo@gmail.com"
      />
      

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Text style={styles.saveButtonText}>Guardar información</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginTop: 15,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#2E7D32',
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  inputError: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'darkred',
    fontSize: 16,
    marginBottom: 10,
    color: 'darkred',
  },
  changePasswordText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'right',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
