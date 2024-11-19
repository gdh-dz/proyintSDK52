import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen: React.FC = () => {
  const [name, setName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [profileImage, setProfileImage] = React.useState<string | null>(null);

  const [validName, setValidName] = React.useState<Boolean>(true);
  const [validEmail, setValidEmail] = React.useState<Boolean>(true);
  const [validPhone, setValidPhone] = React.useState<Boolean>(true);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("WiseMarket necesita permiso para acceder a la galería");
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

  const saveData = () => {
    if (!name || !email || !phone) {
      alert('Faltan datos');
    } else {
      if (validName && validEmail && validPhone) {
        alert('¡Guardado!');
        
        
        setName('');
        setEmail('');
        setPhone('');
        setProfileImage(null);
      } else {
        alert('Datos incorrectos');
      }
    }
  };

  React.useEffect(() => {
    if (name.length < 10) {
      setValidName(false);
    } else {
      setValidName(true);
    }

    if(email.indexOf('@') < 0) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }

    if(phone.length !== 10) {
      setValidPhone(false);
    } else {
      setValidPhone(true);
    }
      
  }, [name, email, phone]);

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
        style={validName? styles.input : styles.inputError}
        value={name}
        onChangeText={setName}
        placeholder="Nombre Apellidos"
      />

      {/* Email Field */}
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={validEmail? styles.input : styles.inputError}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="correo@gmail.com"
      />
      <TouchableOpacity>
        <Text style={styles.changePasswordText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      {/* Phone Field */}
      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={validPhone? styles.input : styles.inputError}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        placeholder="+52 00 0000 0000"
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
