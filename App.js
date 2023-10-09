import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './components/HomeScreen'; 
import ReproductorScreen from './components/ReproductorScreen'; 
import MiPerfilScreen from './components/MiPerfilScreen.js';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
     //Configuración de las pantallas y la navegación
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Reproductor" component={ReproductorScreen} />
        <Stack.Screen name="MiPerfil" component={MiPerfilScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

