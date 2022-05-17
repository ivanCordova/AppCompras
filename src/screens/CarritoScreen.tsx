import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { contexto } from '../utils/AppContext'
import ArticuloComponent from '../Components/ArticuloComponent'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../utils/RootStackParam';
import { EstilosGlobales } from '../styles/Estilos';
import CarritoComponent from '../Components/CarritoComponent';

type Props = StackScreenProps<RootStackParamList, 'Principal'>;


const CarritoScreen = ({ route, navigation }: Props) => {
    const context = useContext(contexto)

    const handle = (id : number | undefined) => {
        navigation.navigate('DescripcionArticulo', { idArticulo : id})
      }
  return (
    <View>
            <FlatList data={context.carrito} renderItem={(articulo) => (
        <CarritoComponent key={articulo.index} onClick={() => handle(articulo.item.id)} {...articulo.item}  ></CarritoComponent>
      )} ItemSeparatorComponent={() => <View style={EstilosGlobales.separador} />}></FlatList>
    </View>
  )
}

export default CarritoScreen

const styles = StyleSheet.create({})