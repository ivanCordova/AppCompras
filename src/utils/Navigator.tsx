import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AgregarArticuloScreen from '../screens/AgregarArticuloScreen';
import ArticulosPrincipalScreen from '../screens/ArticulosPrincipalScreen';
import CarritoScreen from '../screens/CarritoScreen';
import DescripcionArticulo from '../screens/DescripcionArticulo';
import FavoritosScreen from '../screens/FavoritosScreen';
import { contexto } from './AppContext';
import { RootStackParamList } from './RootStackParam';


const Navigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const context = useContext(contexto)
  const print = () => {
    
  }
  return (
    <NavigationContainer >
        <Stack.Navigator screenOptions={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#000",
          },
          headerTitleAlign: 'center',
          headerTintColor: "#fff",
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <Icon.Button name="search" backgroundColor="#000">
                <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', fontWeight: 'bold' }}>
                </Text>
              </Icon.Button>
              <Icon.Button name="cart-plus" backgroundColor="#000" onPress={() => navigation.navigate("Carrito")}>
                <Text style={{ fontFamily: 'Arial', fontSize: 15, color: 'white', fontWeight: 'bold' }}>
                 {context.carrito.length}
                </Text>
              </Icon.Button>
            </View>
          ),
          headerLeft: () => (
            <Icon.Button name="bars" backgroundColor="#000">
              <Text style={{ fontFamily: 'Arial', fontSize: 20, color: 'white', fontWeight: 'bold' }}>
              </Text>
            </Icon.Button>
          ),
        })} initialRouteName='Principal'>
          <Stack.Screen name='Principal' component={ArticulosPrincipalScreen}></Stack.Screen>
          <Stack.Screen name='AgregarArticulo' component={AgregarArticuloScreen}></Stack.Screen>
          <Stack.Screen name='DescripcionArticulo' component={DescripcionArticulo}></Stack.Screen>
          <Stack.Screen name='Carrito' component={CarritoScreen}></Stack.Screen>
          <Stack.Screen name='Favoritos' component={FavoritosScreen}></Stack.Screen>
        </Stack.Navigator>

    </NavigationContainer>
  )
}



export default Navigator

