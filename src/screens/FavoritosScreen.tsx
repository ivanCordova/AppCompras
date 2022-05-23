import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IArticulo } from '../models/IArticulo'
import axios from 'axios'
import { _url } from '../global/variables'
import ArticuloComponent from '../Components/ArticuloComponent'
import { EstilosGlobales } from '../styles/Estilos'

const FavoritosScreen = () => {
    const [articulos, setArticulos] = useState<IArticulo[]>([])
    useEffect(() => {
        axios.get(`${_url}api/Moviles/GetFavoritos?idusuario=2246`)
            .then(res => {
                const articulos = res.data;

                setArticulos(articulos);
            })
    }, [])

    return (
        <View>
            <FlatList data={articulos} renderItem={(articulo) => (
        <ArticuloComponent onClick={() => console.log("wefsef")} {...articulo.item}  ></ArticuloComponent>
      )} ItemSeparatorComponent={() => <View style={EstilosGlobales.separador} />}></FlatList>
        </View>
    )
}

export default FavoritosScreen

const styles = StyleSheet.create({})