import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useReducer } from 'react'
import { IArticulo } from '../models/IArticulo'
import { OperacionesCarritoEnum, reducerCarrito } from './ReducerArticulos';


const ValorInicial : IArticulo[] = [];

interface ContextProps{
    carrito: IArticulo[],
    AgregarCarrito: (articulo:IArticulo) => void
}

interface Props{
    children: JSX.Element;
}

export const contexto = createContext<ContextProps>({} as ContextProps);


const AppContext = ({children}: Props) => {
    const[state,dispatch] = useReducer(reducerCarrito, ValorInicial)

    const AgregarCarrito = (articulo: IArticulo) => {
        dispatch({type: OperacionesCarritoEnum.Agregar, payload: articulo})
    }
    return(
        <contexto.Provider value={{
            carrito : state,
            AgregarCarrito
        }}>
            {children}
        </contexto.Provider>
    )
}

export default AppContext
