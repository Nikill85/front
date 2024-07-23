import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { TipoProducto } from 'src/app/clases/tipoProducto.model';
import { TipoProductoService } from 'src/app/servicios/tipo-producto.service';
import { MessageService } from 'src/app/servicios/message.service';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styleUrls: ['./tipo-producto.component.scss']
})
export class TipoProductoComponent implements OnInit {

  constructor(private tipoProductoService: TipoProductoService,private messageService: MessageService) { }
  tipoProductos: TipoProducto[] = new Array<TipoProducto>();

  editarOnuevoTipoProducto: TipoProducto = new TipoProducto();
  copiaTipoProducto: TipoProducto = new TipoProducto(); 
  estoyEditando: boolean;

  ngOnInit(): void {
    this.obtenerTiposDeProducto();
  }

  obtenerTiposDeProducto() {
    this.tipoProductoService.obtenerTiposDeProducto()
      .subscribe(respuesta_backend => {
        this.tipoProductos = respuesta_backend;
        console.log(this.tipoProductos);
      });
  }

  agregarTipo() {
    this.tipoProductoService.agregarTipo(this.editarOnuevoTipoProducto)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.obtenerTiposDeProducto();
        this.resetForm(); 
      });
  }
  resetForm() {
    this.editarOnuevoTipoProducto =  new TipoProducto();

    
  }

  // eliminarTipo(tipoProd: TipoProducto) {
  //   this.tipoProductoService.eliminarTipo(tipoProd)
  //     .subscribe(respuesta => {
  //       console.log(respuesta);
  //       this.obtenerTiposDeProducto();
  //     });
  // }
  eliminarTipo(tipo: TipoProducto) {
    this.messageService.confirmMessage(``, `Seguro que desea eliminar al tipo de producto: ${tipo.descripcion}`, `Eliminar`, `warning`)
      .then(r => {
        if (r.isConfirmed) {
          this.eliminarTi(tipo.id_tipo_producto); 
        }
      });
  }
  
  eliminarTi(id: number) {
    this.tipoProductoService.eliminarTipo(id)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.obtenerTiposDeProducto();
        this.resetForm(); 
      });
  }

  editarTipo(tipoProd: TipoProducto) {
    console.log(tipoProd);
    this.editarOnuevoTipoProducto = { ...tipoProd };
    this.copiaTipoProducto = { ...tipoProd };
    this.estoyEditando = true;
  }
  salvarEdicion() {
    this.estoyEditando = false;
    const index = this.tipoProductos.findIndex(tp => tp.id_tipo_producto === this.editarOnuevoTipoProducto.id_tipo_producto);
    if (index !== -1) {
      this.tipoProductos[index] = this.editarOnuevoTipoProducto ;
    }
    this.tipoProductoService.editarTipoProducto(this.editarOnuevoTipoProducto)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.resetForm(); 
      } );
    
  }
  cancelarEdicion() {
    this.estoyEditando = false;
    this.editarOnuevoTipoProducto = { ...this.copiaTipoProducto };
    this.resetForm(); 
  }
}