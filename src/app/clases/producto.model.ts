export class Producto {
    id_producto: number | undefined;
    descripcion: string | undefined;
    precio: number | undefined;
    stock: number | undefined; 
    cantidad: number | undefined; // Agregar esta propiedad si es necesaria para calcular el stock
    fk_tipoProducto: any | undefined;
   

    constructor(){}
}