import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from 'react-native';
import { useSearchParams } from 'expo-router';
import { getProductById } from '@/services/products'; 
const EditProductScreen: React.FC = () => {
  const { id } = useSearchParams<{ id: string }>(); 
  const [product, setProduct] = useState<any>(null); 
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [supermarket, setSupermarket] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const fetchedProduct = await getProductById(id); // producto
          if (fetchedProduct) {
            setProduct(fetchedProduct);
            setName(fetchedProduct.name);
            setCategory(fetchedProduct.category);
            setSupermarket(fetchedProduct.supermarket);
            setPrice(fetchedProduct.price);
          } else {
            ToastAndroid.show('Producto no encontrado', ToastAndroid.LONG);
          }
        } catch (error) {
          ToastAndroid.show('Error al cargar el producto', ToastAndroid.LONG);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleSave = () => {
  
    console.log("Producto actualizado:", { name, category, supermarket, price });
    ToastAndroid.show('Cambios guardados', ToastAndroid.SHORT);
  };

  if (!product) {
    return <Text>Cargando información del producto...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        </TouchableOpacity>
        <Text style={styles.title}>Editar producto</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Eliminar producto</Text>
      </TouchableOpacity>

      {/* Formulario para editar el producto */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text>Nombre:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            value={name}
            onChangeText={setName}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Categoría:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            value={category}
            onChangeText={setCategory}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Supermercado:</Text>
          <TextInput
            style={styles.input}
            placeholder="Selecciona"
            value={supermarket}
            onChangeText={setSupermarket}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Precio:</Text>
          <TextInput
            style={styles.input}
            placeholder="Escribe aquí"
            keyboardType="numeric"
            value={String(price)}
            onChangeText={(text) => setPrice(text)}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    backgroundColor: '#BE0000',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    backgroundColor: '#2E7D32',
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
});

export default EditProductScreen;

