import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import IconSelectionScreen from './screens/agregarproducto';
import CrearNuevaLista from './screens/new-list';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CrearNuevaLista">
        <Stack.Screen name="CrearNuevaLista" component={CrearNuevaLista} />
        <Stack.Screen name="AgregarProducto" component={IconSelectionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
