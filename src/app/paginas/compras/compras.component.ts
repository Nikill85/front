import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/servicios/message.service';
import { Compra } from 'src/app/clases/compra.model';
import { Producto } from 'src/app/clases/producto.model';
import { CompraRequest } from 'src/app/clases/requests/compra.request';
import { TipoProducto } from 'src/app/clases/tipoProducto.model';
import { ComprasService } from 'src/app/servicios/compras.service';
import { ProductoService } from 'src/app/servicios/producto.service';



@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  compraReq: CompraRequest = new CompraRequest();
  compras: Compra[];
  productos: Producto[];
  productoSelected: Producto = new Producto();
  existeProducto: boolean = false;
  compra: Compra = new Compra();
  copiaCompra: Compra = new Compra();
  estoyEditando: boolean;
  editarOnuevaCompra: Compra = new Compra();
  Compra: Compra[] = new Array<Compra>();
  precioProductoEncontrado: number;
  productoSeleccionado: Producto;
  totalCompra: number;


  constructor(private httpClient: HttpClient, private messageService: MessageService, private comprasService: ComprasService, private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getCompras();
    this.getProductos();
  }



  cal(evn) {

    const ProductoEncontrado = this.productos.find(p => p.id_producto === parseInt(evn.target.value))
    // this.precioProductoEncontrado = ProductoEncontrado.precio
    console.log("algo2", this.precioProductoEncontrado)
    console.log(ProductoEncontrado)
    console.log(this.compraReq.fk_producto)

  }
  getCompras() {
    this.httpClient.get<Compra[]>('http://localhost:3000/compras').subscribe(
      (c: Compra[]) => {
        console.log(c);
        this.compras = c;
      },
      (error) => {
        console.error('Error al obtener las compras:', error);
      }
    );
  }
  getProductos() {
    this.httpClient.get<Producto[]>('http://localhost:3000/producto').subscribe(
      (productos: Producto[]) => {
        console.log('PRODUCTOS:', productos);
        this.productos = productos;
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }
  crearCompra() {


    // Enviar solicitud HTTP
    this.httpClient.post<any>('http://localhost:3000/compras', this.compraReq).subscribe(
      (response) => {
        console.log(response);
        this.getCompras();
        this.resetForm();
      },
      (error) => {
        console.error('Error al crear la compra:', error);
        // Manejar el error según sea necesario
      }
    );
  }
  getProductoDescripcion(idProducto: number): string {
    if (this.productos && this.productos.length > 0) {
      const producto = this.productos.find(p => p.id_producto === idProducto);
      return producto ? producto.descripcion : 'Descripción no disponible';
    } else {
      return 'Descripción no disponible';
    }
  }
 
  eliminarCompra(compra: Compra) {
    this.messageService.confirmMessage(``, `Seguro que desea eliminar al tipo de producto: ${compra.id_compras}`, `Eliminar`, `warning`)
      .then(r => {
        if (r.isConfirmed) {
          this.eliminarCo(compra.id_compras);
        }
      });
  }

  eliminarCo(id: number) {
    this.comprasService.eliminarCompra(id)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.getCompras();
      });


  }
  calcularTotal(evn) {
    if (this.compraReq.fk_producto) {
      const ProductoEncontrado = this.productos.find(p => p.id_producto === this.compraReq.fk_producto)
      this.compraReq.total_costoCompra = evn.target.value * ProductoEncontrado.precio
      this.totalCompra = this.compraReq.total_costoCompra;
    } else {
      console.log("no existee")
    }

    console.log("algoooo", evn.target.value)
    console.log(this.compraReq.total_costoCompra)
  }

  editarCompra(com: Compra) {

    this.estoyEditando = true;
    this.compraReq.id_compras = com.id_compras;
    this.compraReq.fecha_compra = com.fecha_compra;
    this.compraReq.fk_producto = com.fk_producto;
    this.compraReq.cantidad = com.cantidad;
    this.productoSeleccionado = this.productos.find(p => p.id_producto === com.fk_producto);
    //  this.calcularTotal(com);

  }
  salvarEdicion() {
    this.comprasService.editarCompra(this.compraReq).subscribe(
      (data: any) => {
        console.log('Compra actualizada:', data);
        this.getCompras(); // Actualizar lista de compras después de la edición
        this.resetForm(); // Limpiar formulario después de la edición exitosa
        this.estoyEditando = false; // Salir del modo de edición
      },
      (error: HttpErrorResponse) => {
        console.error('Error al actualizar la compra:', error);
        if (error.status === 500) {
          // Aquí puedes manejar el error específico del servidor, si es necesario
          // Puedes mostrar un mensaje al usuario o realizar alguna acción de manejo de errores
          console.error('Error interno en el servidor:', error.error);
        }
      }
    );
  }

  resetForm() {
    this.compraReq = new CompraRequest();
    this.productoSelected = new Producto();
    this.totalCompra = null;
  }
  cancelarEdicion() {
    this.compra = new Compra();
    this.resetForm();
    this.estoyEditando = false;
  }



}



