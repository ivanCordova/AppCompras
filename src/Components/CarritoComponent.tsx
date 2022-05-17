import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { IArticulo } from '../models/IArticulo'
import { EstilosGlobales, ProductosPrincipal } from '../styles/Estilos'
import { _url } from '../global/variables'
import Icon from 'react-native-vector-icons/FontAwesome'
import NumberFormat from 'react-number-format'
import { contexto } from '../utils/AppContext'

const CarritoComponent = (articulo: IArticulo) => {
    const [favorito, setFavorito] = useState<boolean>(false)
    const context = useContext(contexto)
    return (
        <View style={{backgroundColor: "#D7E0DA", borderRadius: 20, margin: 5}}>
            <Pressable onPress={articulo.onClick}>
                <View style={ProductosPrincipal.productoContainer}>
                    <Image source={{ uri: _url + articulo.foto }} style={ProductosPrincipal.ImagenesPrincipal} />
                    <View style={ProductosPrincipal.contenedorFavorito}>
                        <Pressable onPress={(e) => setFavorito(!favorito)}>
                            <Icon name="heart" style={EstilosGlobales.actionButtonIcon} color={!favorito ? '#2C3E50' : 'red'} />
                        </Pressable>
                    </View>
                    <View style={ProductosPrincipal.informacionProducto}>
                        <Text style={ProductosPrincipal.tituloProducto}>{articulo.nombre}</Text>
                        <Text style={ProductosPrincipal.descripcion}>{articulo.descripcion}</Text>
                        <NumberFormat value={articulo.precio} displayType='text' thousandSeparator prefix='$' decimalSeparator='.' renderText={value => <Text style={ProductosPrincipal.precio}>{value}</Text>} />
                    </View>
                </View>
            </Pressable>
            <Pressable style={ProductosPrincipal.eliminarContainer} onPress={() => context.EliminarArticulo(articulo)}>
                <Icon name="trash" style={ProductosPrincipal.botonEliminarCarrito} color={'white'} />
            </Pressable>
        </View>
    )
}

export default CarritoComponent
