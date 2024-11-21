import { List } from '@/models/Lists';
import { Producto } from '@/models/Products';
import { createList } from '@/services/lists';
import { useFocusEffect, useNavigation } from '@react-navigation/native'; // Importa el hook para navegar
import React, { useState } from 'react';
import { Alert, FlatList, Image, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { getProductos } from '../services/Products'; // Ajusta la ruta

const CrearNuevaLista = () => {
  const navigation = useNavigation();
  const [nombreLista, setNombreLista] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [presupuesto, setPresupuesto] = useState('');
  const [productos, setProductos] = useState<Producto[]>([]);
  const [selectedProductos, setSelectedProductos] = useState<Producto[]>([]);

  const toggleSwitch = () => setIsShared((prev) => !prev);

  const toggleSelectProducto = (producto: Producto) => {
    setSelectedProductos((prev) =>
      prev.some((p) => p.id === producto.id)
        ? prev.filter((p) => p.id !== producto.id)
        : [...prev, producto]
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      // Actualiza los productos al volver desde la pantalla de agregar producto
      const fetchProductos = async () => {
        try {
          const productosData = await getProductos();
          setProductos(productosData);
        } catch (error) {
          console.error('Error al obtener productos:', error);
        }
      };
      fetchProductos();
    }, [])
  );

  const handleCreateList = async () => {
    if (!nombreLista || !presupuesto) {
      Alert.alert('Error', 'Por favor llena todos los campos requeridos.');
      return;
    }
    try {
      const nuevaLista = new List(
        null,
        parseFloat(presupuesto),
        new Date(),
        nombreLista,
        [],
        [],
        selectedProductos.length,
        0,
        isShared ? 'shared' : 'private',
        0
      );
      const productosSeleccionadosIds = selectedProductos
        .map((producto) => producto.id)
        .filter((id): id is string => id !== undefined);
      await createList(nuevaLista, productosSeleccionadosIds);
      Alert.alert('Éxito', 'Lista creada exitosamente.');
      setModalVisible(false);
      setNombreLista('');
      setPresupuesto('');
      setSelectedProductos([]);
    } catch (error) {
      console.error('Error al crear la lista:', error);
      Alert.alert('Error', 'Hubo un problema al crear la lista.');
    }
  };

  const renderProducto = ({ item }: { item: Producto }) => (
    <TouchableOpacity
      style={styles.iconWrapper}
      onPress={() => toggleSelectProducto(item)}
    >
      <View style={styles.checkboxContainer}>
        <View
          style={
            selectedProductos.find((p) => p.id === item.id)
              ? styles.checkboxSelected
              : styles.checkbox
          }
        />
      </View>
      <Image
        source={{ uri: item.imagenURL ?? '../../assets/images/favicon.png' }}
        style={styles.icon}
      />
      <Text style={styles.iconLabel}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear nueva lista</Text>
      <Text style={styles.label}>Nombre de la lista</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe aquí"
        value={nombreLista}
        onChangeText={setNombreLista}
      />
      <Text style={styles.label}>Lista compartida</Text>
      <View style={styles.switchContainer}>
        <Text style={[styles.switchLabel, isShared && styles.activeLabel]}>Sí</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isShared ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isShared}
        />
        <Text style={[styles.switchLabel, !isShared && styles.activeLabel]}>No</Text>
      </View>
      <FlatList
        data={productos}
        renderItem={renderProducto}
        keyExtractor={(_, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.iconContainer}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AgregarProducto')} // Navega a la pantalla de agregar producto
      >
        <Text style={styles.addButtonText}>Nuevo producto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.nextButtonText}>Siguiente</Text>
      </TouchableOpacity>
      <SafeAreaProvider>
        <SafeAreaView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.backText}>{"X"}</Text>
                </TouchableOpacity>
                <Text style={styles.label}>Selecciona el presupuesto de la lista:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="$"
                  keyboardType="numeric"
                  value={presupuesto}
                  onChangeText={setPresupuesto}
                />
                <TouchableOpacity style={styles.createButton} onPress={handleCreateList}>
                  <Text style={styles.createButtonText}>Crear lista</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </SafeAreaView>
      </SafeAreaProvider>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: 'white',
  },
  checkboxSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  activeLabel: {
    color: '#81b0ff',
  },
  iconContainer: {
    paddingBottom: 20,
  },
  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    margin: 4,
    maxWidth: '25%', // Ajuste para cada columna
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  iconLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  addButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginBottom: 20,
  },
  addButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight:'bold'
  },
  nextButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'gray',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'red',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backText: {
    fontSize: 24,
    color: '#4CAF50',
  },
  iconButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginHorizontal: 5,
  },
  iconButtonSelected: {
    backgroundColor: '#3e8e41',
  },
  iconText: {
    fontSize: 16,
    color: '#fff',
  },
  createButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    marginTop: 20,
  },
  createButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CrearNuevaLista;
