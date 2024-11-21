import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';



const ListScreen = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([
    { id: '1', name: 'Producto', price: 0, image: 'https://via.placeholder.com/50', selected: false },
    { id: '2', name: 'Producto', price: 0, image: 'https://via.placeholder.com/50', selected: false },
    { id: '3', name: 'Producto', price: 0, image: 'https://via.placeholder.com/50', selected: false },
  ]);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState([
    { id: '1', name: 'Producto 1', image: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Producto 2', image: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Producto 3', image: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Producto 4', image: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Producto 5', image: 'https://via.placeholder.com/50' },
  ]);

  const toggleSelection = (id: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, selected: !product.selected } : product
      )
    );
  };

  const totalSelected = products.reduce(
    (total, product) => (product.selected ? total + product.price : total),
    0
  );

  const addProductToList = (product: { id: string; name: string; image: string }) => {
    setProducts((prevProducts) => [
      ...prevProducts,
      { id: product.id, name: product.name, price: 0, image: product.image, selected: false },
    ]);
    setModalVisible(false);
  };

  return (
    
    <View style={styles.container}>
      {/* Botón de menú hamburguesa */}
      <TouchableOpacity style={styles.menuIcon} onPress={() => setMenuOpen(!isMenuOpen)}>
        <Ionicons name="menu" size={30} color="#333" />
      </TouchableOpacity>

      {/* Menú lateral */}
      {isMenuOpen && (
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuButton}>
            <Text style={styles.menuButtonText}>Convertir a colaborativa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Eliminar lista</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Título */}
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

      {/* Lista de productos */}
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
        <Text style={styles.totalText}>
          Monto total de artículos seleccionados: ${totalSelected.toFixed(2)}
        </Text>
        <Text style={styles.totalText}>Presupuesto: $0.00</Text>
      </View>

      {/* Botón para abrir el popup */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={40} color="#2E7D32" />
        <Text style={styles.addButtonText}>Agregar producto</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Catálogo de productos</Text>
            <ScrollView contentContainerStyle={styles.productsGrid}>
              {catalogProducts.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  style={styles.productItem}
                  onPress={() => addProductToList(product)}
                >
                  <Image source={{ uri: product.image }} style={styles.productImage} />
                  <Text style={styles.productName}>{product.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.newProductButton}
              onPress={() => {
                setModalVisible(false);
                router.push('/agregarproducto');
              }}
            >
              <MaterialIcons name="add-circle-outline" size={48} color="#2E7D32" />
              <Text style={styles.newProductText}>Nuevo producto</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  menuIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    zIndex: 1100, // Asegúrate de que esté por encima de otros elementos
    padding: 10,  // Incrementa el área táctil
},
  menuContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '80%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 16,
    zIndex: 1000,
  },
  menuButton: {
    backgroundColor: '#256847',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: '#C73E3C',
    borderRadius: 20,
    padding: 16,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
    marginLeft: 50,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    alignItems: 'center',
    marginBottom: 16,
  },
  newProductButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  newProductText: {
    marginTop: 8,
    fontSize: 16,
    color: '#2E7D32',
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#C73E3C',
    fontSize: 16,
  },
});

export default ListScreen;
