import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { MessageService } from 'src/app/servicios/message.service';
import * as _ from 'lodash';
import { Proveedor } from 'src/app/clases/proveedor.model';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent implements OnInit {
  proveedores: Proveedor[];
  nuevoProveedor: Proveedor = new Proveedor();
  esEdit: boolean;
  constructor(
    private httpClient: HttpClient,
    private messageService: MessageService,
    private proveedoresService: ProveedoresService
  ) { }

  ngOnInit(): void {
    this.getProveedores();
  }

  getProveedores() {
    this.httpClient.get(`http://localhost:3000/proveedor`).subscribe((proveedores: Proveedor[]) => {
      console.log("PROVEEDORES: ", proveedores);
      this.proveedores = proveedores;
    });
  }
  crearProveedor() {
    this.httpClient.post(`http://localhost:3000/proveedor`, this.nuevoProveedor).subscribe((data: any) => {
      console.log(data);
      if (data.ProveedorID) {
        this.nuevoProveedor.id_proveedores = data.ClienteID;
        this.proveedores.push(this.nuevoProveedor);
        this.nuevoProveedor = new Proveedor();
        this.messageService.automaticMessageOk(`Proveedor agregado correctamente`);
      }
      this.getProveedores();
      this.resetForm();
    });
  }
  actualizarProveedor() {
    this.esEdit = false;
    this.proveedoresService.editProveedor(this.nuevoProveedor)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.getProveedores();
        this.resetForm();
      });

  }
  cancelarUpdate() {
    this.esEdit = false;
    this.nuevoProveedor = new Proveedor();
  }
  resetForm() {
    this.nuevoProveedor = new Proveedor();

  }
  editarProveedor(proveedor) {
    this.nuevoProveedor.id_proveedores = proveedor.id_proveedores ;
    this.nuevoProveedor.nombre = proveedor.nombre;
    this.nuevoProveedor.direccion = proveedor.direccion;
    this.nuevoProveedor.telefono = proveedor.telefono;
    this.nuevoProveedor.email = proveedor.email;
   this.esEdit = true;
    
    
  }
  eliminarProveedorr(proveedor: Proveedor) {
    this.messageService.confirmMessage(``, `Seguro que desea eliminar el usuario ${proveedor.nombre}`, `Eliminar`, `warning`)
      .then(r => {
        if (r.isConfirmed) {
          this.eliminarProv(proveedor.id_proveedores); // Asegúrate de pasar el ID del proveedor
        }
      });
  }
  
  eliminarProv(id: number) {
    this.proveedoresService.eliminarProveedor(id)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.getProveedores();
      });
  }
  
}
