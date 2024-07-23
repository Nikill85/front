import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoProducto } from '../clases/tipoProducto.model';

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  url: string = 'http://localhost:3000/tipoProducto';
  constructor(
    private httpClient: HttpClient
  ) { }

  obtenerTiposDeProducto() {
    return this.httpClient.get<TipoProducto[]>(this.url);
  }

  agregarTipo(tipo: any) {
    return this.httpClient.post(this.url, tipo);
  }

  eliminarTipo(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  editarTipoProducto(editarOnuevoTipoProducto: TipoProducto){
    console.log('Enviando solicitud PUT para editar:', editarOnuevoTipoProducto);
    return this.httpClient.put(`${this.url}/${editarOnuevoTipoProducto.id_tipo_producto}`, editarOnuevoTipoProducto)
  }
  
 

  }
