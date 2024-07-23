import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Venta } from '../clases/venta.model';
import { ProductoService } from './producto.service';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  url: string = 'http://localhost:3000/ventas';
  constructor(
    private httpClient: HttpClient,private productoService: ProductoService
  ) { }

  obtenerVentas() {
    return this.httpClient.get<Venta[]>(this.url);
  }
  // crearVenta(venta: Venta) {
  //   return this.httpClient.post<any>(this.url, venta);
  // }
  crearVenta(venta: Venta) {
    return this.httpClient.post<any>(this.url, venta).pipe(
      // Actualizar el stock del producto vendido
      switchMap((response: any) => {
        const { fk_producto, cantidad } = venta;
        return this.productoService.actualizarStock(fk_producto, -cantidad); // Restar la cantidad vendida
      })
    );
  }

  editarVenta(editarOnuevaVenta: Venta){
    console.log('Enviando solicitud PUT para editar:',editarOnuevaVenta);
    return this.httpClient.put(`${this.url}/${editarOnuevaVenta.id_ventas}`, editarOnuevaVenta)
  }
  eliminarVenta(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

}
