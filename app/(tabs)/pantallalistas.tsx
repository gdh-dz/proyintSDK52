import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ListScreen = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([
    { id: '1', name: 'Producto', price: 0, image: 'https://via.placeholder.com/50', selected: false },
    { id: '2', name: 'Producto', price: 0, image: 'https://via.placeholder.com/50', selected: false },
    { id: '3', name: 'Producto', price: 0, image: 'https://via.placeholder.com/50', selected: false },
    { id: '4', name: 'Producto', price: 0, image: 'https://via.placeholder.com/50', selected: false },
    { id: '5', name: 'Producto', price: 0, image: 'https://via.placeholder.com/50', selected: false },
  ]);

  const toggleSelection = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, selected: !product.selected } : product
      )
    );
  };

  const totalSelected = products.reduce((total, product) => product.selected ? total + product.price : total, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nombre de la lista</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar producto"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Lista */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleSelection(item.id)}>
              <Ionicons
                name={item.selected ? 'radio-button-on' : 'radio-button-off'}
                size={24}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Montos */}
      <View style={styles.totalsContainer}>
        <Text style={styles.totalText}>Monto total de la lista: $0.00</Text>
        <Text style={styles.totalText}>Monto total de artículos seleccionados: ${totalSelected.toFixed(2)}</Text>
        <Text style={styles.totalText}>Presupuesto: $0.00</Text>
      </View>

      {/* Añadir producto */}
      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle" size={40} color="#2E7D32" />
        <Text style={styles.addButtonText}>Agregar producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    marginLeft: 8,
    fontSize: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  totalsContainer: {
    marginTop: 16,
  },
  totalText: {
    fontSize: 16,
    marginVertical: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  addButtonText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#2E7D32',
  },
});

export default ListScreen;
