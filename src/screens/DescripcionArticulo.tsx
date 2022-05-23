import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
//import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/RootStackParam';
import axios from 'axios';
import { _url } from '../global/variables';
import { IArticulo } from '../models/IArticulo';
import { StackScreenProps } from '@react-navigation/stack';
import { EstiloDescripcionArticulo } from '../styles/Estilos';
import NumberFormat from 'react-number-format';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { contexto } from '../utils/AppContext';

type Props = StackScreenProps<RootStackParamList, 'DescripcionArticulo'>;
const DescripcionArticulo = ({ route, navigation }: Props) => {
  const context = useContext(contexto)
  
  const { idArticulo } = route.params;
  const [articulo, setArticulo] = useState<IArticulo>()
  const articuloCarrito = context.carrito.find(ar => ar.id === idArticulo)?.cantidad
  const [cantidad, setCantidad] = useState<number>((articuloCarrito === undefined)?0:articuloCarrito)
  useEffect(() => {
    axios.get(`${_url}api/Moviles/ObtenerArticuloPorId/${idArticulo}`)
      .then(res => {
        const articulo = res.data;
        setArticulo(articulo);
      })
  }, [])

  const favoritos = () => {
    axios.post(`${_url}api/Moviles/GuardarFavorito`,{
      idUsuario : 2246,
      idArticulo: idArticulo

    })
    .then( (response) => {
        Alert.alert("Correcto","Favorito agregado correctamente");
    })
    .catch( (error) => {
        console.log("Error_ " + error);
    });
  }

  const sumar = () =>{
      if(cantidad !== articulo?.stock!){
        setCantidad(cantidad + 1);
      }
      else{
        Alert.alert("Atención","No puede pasar de la cantidad que hay en inventario");
      }
  }

  const restar = () =>{
    if(cantidad !== 0){
      setCantidad(cantidad - 1);
    }
    else{
      Alert.alert("Atención","No puede seleccionar números negativos");
    }
}

  return (
    <ScrollView contentContainerStyle={EstiloDescripcionArticulo.container} >
      <View style={{flexDirection: "row", justifyContent: "space-between", marginVertical: 5}}>
        <Text style={EstiloDescripcionArticulo.titulo}>{articulo?.nombre}</Text>
        <Icon onPress={() => favoritos()} name='heart' size={30} color={'white'}></Icon>
      </View>
      <Image source={{ uri: _url + articulo?.foto }} style={EstiloDescripcionArticulo.descripcionImagen} />
      <NumberFormat value={articulo?.precio} displayType='text' thousandSeparator prefix='$' decimalSeparator='.' renderText={value => <Text style={EstiloDescripcionArticulo.precio}>{value}</Text>} />
      <Text style={EstiloDescripcionArticulo.titulo}>Descripción</Text>
      <Text style={EstiloDescripcionArticulo.descripcion}>{articulo?.descripcion}</Text>
      <Text style={EstiloDescripcionArticulo.textoCentrado}>Seleccione cantidad</Text>
      <View style={EstiloDescripcionArticulo.contenedorCantidad} >
          <Pressable style={[EstiloDescripcionArticulo.botonRedondo, {backgroundColor:'orangered'}]} onPress={restar}>
            <Icon name='times' size={30} color={'white'}></Icon>
          </Pressable>
          <Text style={EstiloDescripcionArticulo.textoCantidad}>{cantidad}</Text>
          <Pressable style={[EstiloDescripcionArticulo.botonRedondo, {backgroundColor:'green'}]} onPress={sumar}>
            <Icon name='plus' size={30} color={'white'}></Icon>
          </Pressable>
      </View>
      <Pressable style={EstiloDescripcionArticulo.botonComprar} onPress={() => console.log(`Articulo CArrito: ${cantidad}`)}>
        <Text style={EstiloDescripcionArticulo.textoBotonComprar}>Comprar</Text>
      </Pressable>
      <Pressable style={EstiloDescripcionArticulo.botonCarrito} onPress={() => {
        articulo!.cantidad = cantidad
        context.AgregarCarrito(articulo!)
      }}>
        <Text style={EstiloDescripcionArticulo.textoBotoncarrito}>Agregar al carrito</Text>
      </Pressable>
    </ScrollView>
  )
}

export default DescripcionArticulo

