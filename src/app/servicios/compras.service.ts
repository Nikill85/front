import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Compra } from '../clases/compra.model';
import { ProductoService } from './producto.service';
import { switchMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  url: string = 'http://localhost:3000/compras';

  constructor(private httpClient: HttpClient, private productoService: ProductoService) { }

  obtenerCompra() {
    return this.httpClient.get<Compra[]>(this.url);
  }

  // agregarCompra(compra: any) {
  //   return this.httpClient.post(this.url, compra);
  // }

  eliminarCompra(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  editarCompra(editarOnuevaCompra: Compra){
    console.log('Enviando solicitud PUT para editar:',editarOnuevaCompra);
    return this.httpClient.put(`${this.url}/${editarOnuevaCompra.id_compras}`, editarOnuevaCompra)
  }
  
  agregarCompra(compra: any) {
    return this.httpClient.post(this.url, compra).pipe(
      // Actualizar el stock del producto comprado
      switchMap((response: any) => {
        const { id_producto, cantidad } = compra;
        return this.productoService.actualizarStock(id_producto, cantidad);
      })
    );
  }
}
  
  
  

