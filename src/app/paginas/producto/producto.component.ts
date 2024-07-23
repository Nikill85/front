import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto.model';
import { TipoProducto } from 'src/app/clases/tipoProducto.model';
import { TipoProductoService } from 'src/app/servicios/tipo-producto.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { MessageService } from 'src/app/servicios/message.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {
  productos: Producto[];
  tipoProductos: TipoProducto[];
  producto: Producto = new Producto();
  esEdit: boolean; 
  TipoproductoSelected: TipoProducto = new TipoProducto();
  constructor(
    private httpClient: HttpClient,
    private tipoProductoService: TipoProductoService,
    private productoService: ProductoService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getProductos();
    this.getTiposDeProducto();
  }

  getProductos() {
    this.httpClient.get('http://localhost:3000/producto').subscribe((productos: Producto[]) => {
      console.log("PRODUCTOS: ", productos);
      
      this.productos = productos;
    });
  }


  getTiposDeProducto() {
    this.tipoProductoService.obtenerTiposDeProducto()
      .subscribe(respuesta_backend => {
        this.tipoProductos = respuesta_backend;
        console.log(this.tipoProductos);
      });
  }

  editarProducto(producto: Producto): void {
    
    this.producto.id_producto = producto.id_producto;
    this.producto.descripcion = producto.descripcion;
    this.producto.precio = producto.precio;
    this.producto.fk_tipoProducto = producto.fk_tipoProducto;
    this.esEdit = true;
  }


  crearProducto() {
    const idTipoProducto = this.producto.fk_tipoProducto; 
    const productoConTipo = { 
      ...this.producto,
      fk_tipoProducto: idTipoProducto
    };
  
    this.httpClient.post('http://localhost:3000/producto', productoConTipo).subscribe(data => {
      console.log("insert prod", data);
      this.getProductos();
      this.resetForm()
    });
  }
  
  

  actualizarProducto() {
    this.httpClient.put(`http://localhost:3000/producto/${this.producto.id_producto}`, this.producto).subscribe(data => {
      console.log("Producto actualizado:", data);
      this.getProductos(); 
      this.resetForm()
      this.esEdit = false; 
    }, error => {
      console.error('Error al actualizar el producto:', error);
    
    });
  }
  cancelarActualizar() {
    this.producto = new Producto();
    this.esEdit = false;
  }

  getTipoProductoDescripcion(idTipoProducto: number): string {
    const tipoProducto = this.tipoProductos.find(tp => tp.id_tipo_producto === idTipoProducto);
    return tipoProducto ? tipoProducto.descripcion : '';
  }

  eliminarProducto(producto: Producto) {
    this.messageService.confirmMessage(``, `Seguro que desea eliminar el producto ${producto.descripcion}`, `Eliminar`, `warning`)
      .then(r => {
        if (r.isConfirmed) {
          this.eliminarProd(producto.id_producto);
        }
      });
  }

  eliminarProd(id: number) {
    this.productoService.eliminarProducto(id)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.getProductos();
      });
  }
  resetForm() {
    this.producto = new Producto();
    this.TipoproductoSelected=  new TipoProducto();
    
  }

}
