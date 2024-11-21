import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import IconSelectionScreen from './screens/agregarproducto'; // Ruta hacia agregarproducto.tsx
import CrearNuevaLista from './screens/new-list'; // Ruta hacia new-list.tsx

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NewList">
        <Stack.Screen name="NewList" component={CrearNuevaLista} options={{ title: 'Nueva Lista' }} />
        <Stack.Screen name="AddProduct" component={IconSelectionScreen} options={{ title: 'Agregar Producto' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
