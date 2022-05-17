
export interface IArticulo{
    id? : number;
    nombre : string;
    descripcion : string;
    precio : number;
    stock : number;
    foto? : string;
    onClick?() : void;
    cantidad?: number
}

