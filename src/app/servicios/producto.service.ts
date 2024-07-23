import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../clases/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:3000/producto';
  producto: Producto = new Producto();
  
  constructor(private httpClient: HttpClient) {
    
   }

  crearProducto(producto: any) {
    return this.httpClient.post(this.url, producto);
  }
  getProductos() {
    return this.httpClient.get(this.url);
  }
  eliminarProducto(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  getPrecio():number{
    return this.producto.precio;
  }
  actualizarStock(idProducto: number, cantidad: number) {
    return this.httpClient.put(`${this.url}/${idProducto}/stock`, { cantidad });
  }
}
