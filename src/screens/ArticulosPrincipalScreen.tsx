import { FlatList, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IArticulo } from '../models/IArticulo'
import axios from 'axios'
import { _url } from '../global/variables'
import { EstilosGlobales } from '../styles/Estilos'
import Icon from 'react-native-vector-icons/FontAwesome'
import ActionButton from '@logvinme/react-native-action-button'
import ArticuloComponent from '../Components/ArticuloComponent'
import { RootStackParamList } from '../utils/RootStackParam'
import { StackScreenProps } from '@react-navigation/stack'


type Props = StackScreenProps<RootStackParamList, 'Principal'>;

const ArticulosPrincipalScreen = ({ route, navigation }: Props) => {

  const [articulos, setArticulos] = useState<IArticulo[]>([])
  useEffect(() => {
    axios.get(`${_url}api/Moviles/ObtenerArticulosConFavoritos?idusuario=2246`)
      .then(res => {
        const articulos = res.data;
     
        setArticulos(articulos);
      })
  }, [])

  const handle = (id : number | undefined) => {
    navigation.navigate('DescripcionArticulo', { idArticulo : id})
  }

  return (
    <View>
      {/* <TextInput style={EstilosGlobales.textinput}></TextInput> */}
      <FlatList data={articulos} renderItem={(articulo) => (
        <ArticuloComponent onClick={() => handle(articulo.item.id)} {...articulo.item}  ></ArticuloComponent>
      )} ItemSeparatorComponent={() => <View style={EstilosGlobales.separador} />}></FlatList>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item buttonColor='#9b59b6' title="Nuevo Producto" onPress={() => navigation.navigate("AgregarArticulo")}>
          <Icon name="plus" style={EstilosGlobales.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#3498db' title="Favoritos" onPress={() => navigation.navigate("Favoritos")}>
          <Icon name="bell" style={EstilosGlobales.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => { }}>
          <Icon name="globe" style={EstilosGlobales.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View >
  )
}

export default ArticulosPrincipalScreen

