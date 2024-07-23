import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProveedoresComponent } from '../paginas/proveedores/proveedores.component';
import { Proveedor } from '../clases/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  url = `http://localhost:3000/proveedor`;
  
  constructor(private httpClient: HttpClient) { }

  getProveedores() {
    return this.httpClient.get(this.url);
  }

  editProveedor(proveedor){
    return this.httpClient.put(`${this.url}/${proveedor.id_proveedores}`, proveedor)
  }
  eliminarProveedor(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }
  
}