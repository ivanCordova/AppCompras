import { IArticulo } from "../models/IArticulo"
 
export enum OperacionesCarritoEnum{
    Agregar = "AGREGAR",
    EliminarArticulo = "ELIMINAR",
    Actualizar = "ACTUALIZAR"
}

type Action ={
    type : OperacionesCarritoEnum,
    payload : IArticulo 
}

export function reducerCarrito(state : IArticulo[], action: Action): IArticulo[]{
    const {type, payload} = action;
    switch (type) {
        case OperacionesCarritoEnum.Agregar : {
            const arrayTemp = [...state];
            const articuloCarrito = arrayTemp.find(ar => ar.id === payload.id)
            const articuloCarritoIndex = arrayTemp.findIndex(ar => ar.id === payload.id)
            if (articuloCarrito === undefined) {
                arrayTemp.push(payload)
            } else {
                articuloCarrito.cantidad = payload.cantidad
                arrayTemp[articuloCarritoIndex] = articuloCarrito
            }
            return arrayTemp;
        }
        case OperacionesCarritoEnum.Actualizar:{
            return state;
        }
        case OperacionesCarritoEnum.EliminarArticulo:{
            const arrayTemp = [...state];
            const newArray = arrayTemp.filter((pr) => pr.id !== payload.id)
            return newArray
        }
        default:
            return state;
    }
}