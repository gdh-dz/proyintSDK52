// EditProfileScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useUserContext } from './(tabs)/context/UserContext'; // Importa el contexto de usuario



const EditProfileScreen: React.FC = () => {
  const { user, setUser } = useUserContext();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSave = async () => {
    const updatedUser = { name, email, phone, profileImage: user.profileImage };

    // Guarda los nuevos datos en Firebase
    await saveUserData('userId', updatedUser); // Asegúrate de usar el ID correcto del usuario

    // Actualiza el contexto con los nuevos datos
    setUser(updatedUser);

    alert('Datos guardados');
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nombre"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Correo"
        style={styles.input}
      />
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="Teléfono"
        style={styles.input}
      />
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
});

export default EditProfileScreen;
function saveUserData(arg0: string, updatedUser: { name: string; email: string; phone: string; profileImage: string | null; }) {
  throw new Error('Function not implemented.');
}

