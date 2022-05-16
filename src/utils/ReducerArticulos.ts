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
            arrayTemp.push(payload);
            return arrayTemp;
        }
        case OperacionesCarritoEnum.Actualizar:{
            return state;
        }
        default:
            return state;
    }
}