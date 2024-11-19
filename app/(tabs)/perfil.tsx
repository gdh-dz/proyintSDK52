import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Text style={styles.sectionTitle}>Tu perfil</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }} // Replace with your profile image URL
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Nombre Apellidos</Text>
      </View>

      {/* Lists Section */}
      <View style={styles.listsSection}>
        <View style={styles.listCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Replace with your list image URL
            style={styles.listImage}
          />
          <Text style={styles.listName}>Lista 1</Text>
        </View>
        <View style={styles.listCard}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Replace with your list image URL
            style={styles.listImage}
          />
          <Text style={styles.listName}>Lista 2</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} 
      onPress={() => router.push('/editarperfil')}>
        <Text style={styles.editText}>Editar Perfil</Text>
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
  editIcon: {
    position: 'absolute',
    right: -20,
    top: -5,
  },
  editText: {
    fontSize: 16,
    color: '#2E7D32',
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
  editText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
