import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { contexto } from '../utils/AppContext'
import ArticuloComponent from '../Components/ArticuloComponent'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/RootStackParam';
import { EstilosGlobales, ProductosPrincipal } from '../styles/Estilos';
import CarritoComponent from '../Components/CarritoComponent';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';
import { _url } from '../global/variables';
import { IArticuloVenta } from '../models/IArticuloVenta';
import { IArticulo } from '../models/IArticulo';

type Props = StackScreenProps<RootStackParamList, 'Principal'>;




const CarritoScreen = ({ route, navigation }: Props) => {
  const context = useContext(contexto)

  const comprarCarrito = (articulos: IArticulo[]) => {
    const detalleArticulo: IArticuloVenta[] = articulos.map((articulo) => {
      const newArticulo: IArticuloVenta = {
        idArticulo: articulo.id!,
        precio: articulo.precio,
        cantidad: articulo.cantidad!
      }
      return newArticulo
    })
    axios.post(`${_url}api/Moviles/GuardarCompra`, {
      idUsuario: 2246,
      detalleVenta: detalleArticulo,
    })
      .then((response) => {
        Alert.alert("Correcto", "Compra correcta");
        context.carrito.map((articulo) => context.EliminarArticulo(articulo))
        navigation.navigate("Principal")
      })
      .catch((error) => {
        console.log("Error_ " + error);
      });
  }
  const handle = (id: number | undefined) => {
    navigation.navigate('DescripcionArticulo', { idArticulo: id })
  }
  return (
    <View>
      <FlatList data={context.carrito} renderItem={(articulo) => (
        <CarritoComponent key={articulo.index} onClick={() => handle(articulo.item.id)} {...articulo.item}  ></CarritoComponent>
      )} ItemSeparatorComponent={() => <View style={EstilosGlobales.separador} />}></FlatList>
      <Pressable style={ProductosPrincipal.comprarContainer} onPress={() => {
        comprarCarrito(context.carrito)
      }}>
        <Icon name="shopping-cart" style={ProductosPrincipal.botonEliminarCarrito} color={'white'} />
      </Pressable>
    </View>
  )
}

export default CarritoScreen

const styles = StyleSheet.create({})