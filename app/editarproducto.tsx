import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const EditProductScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
        </TouchableOpacity>
        <Text style={styles.title}>Editar producto</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Eliminar producto</Text>
      </TouchableOpacity>

      {/* Product category icons */}
      <View style={styles.iconsContainer}>
        <View style={styles.icon} />
        <View style={styles.icon} />
        <View style={styles.icon} />
        <View style={styles.icon} />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text>Nombre:</Text>
          <TextInput style={styles.input} placeholder="Escribe aquí" />
        </View>
        <View style={styles.inputContainer}>
          <Text>Categoría:</Text>
          <TextInput style={styles.input} placeholder="Escribe aquí" />
        </View>
        <View style={styles.inputContainer}>
          <Text>Supermercado:</Text>
          <TextInput style={styles.input} placeholder="Selecciona" />
        </View>
        <View style={styles.inputContainer}>
          <Text>Precio:</Text>
          <TextInput style={styles.input} placeholder="Escribe aquí" keyboardType="numeric" />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Aceptar cambios</Text>
      </TouchableOpacity>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deleteButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#D9534F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  icon: {
    width: 60,
    height: 60,
    backgroundColor: '#D3D3D3',
    borderRadius: 30,
  },
  formContainer: {
    backgroundColor: '#F0F0F0',
    padding: 16,
    borderRadius: 8,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    paddingVertical: 4,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#6D9F60',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
    paddingVertical: 8,
    marginTop: 32,
  },
  navItem: {
    alignItems: 'center',
  },
});

export default EditProductScreen;
