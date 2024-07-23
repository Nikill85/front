import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/clases/proveedor.model';
import { Producto } from 'src/app/clases/producto.model';
import { VentaRequest } from 'src/app/clases/requests/venta.request';
import { Venta } from 'src/app/clases/venta.model';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { ProductoService } from 'src/app/servicios/producto.service';
import { VentasService } from 'src/app/servicios/ventas.service';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'src/app/servicios/message.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {
  ventaRequest: VentaRequest = new VentaRequest();
  productoSelected: Producto;
  // ventas: Venta[];
  ven:  Venta = new Venta()
  // productos: Producto[];
  existeProducto: boolean = false;
  estoyEditando: boolean;
  productoSeleccionado: Producto;
  ventas: Venta[];
  productos: Producto[];
  totalVenta: number;
  Venta: Venta[] = new Array<Venta>();




  constructor(
    private messageService: MessageService,
    private httpClient: HttpClient,
    private ventasService: VentasService,
    private productoService: ProductoService) { }

  ngOnInit(): void {
    this.getVentas();
   
    this.getProductos();
  }

  getVentas() {
    // this.ventasService.obtenerVentas().subscribe(
    //   (ventas: Venta[]) => {
    //     this.ventas = ventas;
    //   },
    //   (error) => {
    //     console.error('Error al obtener las ventas:', error);
    //   }
    // );
    this.httpClient.get<Venta[]>('http://localhost:3000/ventas').subscribe(
      (v: Venta[]) => {
        console.log(v);
        this.ventas = v;
      },
      (error) => {
        console.error('Error al obtener las compras:', error);
      }
    );
  }
  
  getProductos() {
    this.productoService.getProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        console.log('Productos:', this.productos); // Verificar en la consola del navegador
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }


  nuevaVenta(){
    console.log(this.ventaRequest);
  }

  crearVenta() {
    if (!this.ventaRequest.fecha_venta) {
      this.ventaRequest.fecha_venta = null; 
    }
    if (!this.ventaRequest.fk_producto) {
      this.ventaRequest.fk_producto = null; 
    }
    if (!this.ventaRequest.cantidad) {
      this.ventaRequest.cantidad = null; 
    }
    if (!this.ventaRequest.total_venta) {
      this.ventaRequest.total_venta = null; 
    }
  
    this.httpClient.post<any>('http://localhost:3000/ventas', this.ventaRequest).subscribe(
      (response) => {
        console.log(response);
        this.getVentas(); // Actualizar la lista de ventas después de crear una nueva venta
        this.resetForm(); // Limpiar el formulario después de la creación exitosa
      },
      (error) => {
        console.error('Error al crear la venta:', error);
      }
    );
  }
  // getProductoDescripcion(idProducto: number): string {
  //   // Verifica si this.productos está definido y no es nulo antes de usar find
  //   if (this.productos && this.productos.length > 0) {
  //     const producto = this.productos.find(p => p.id_producto === idProducto);
  //     return producto ? producto.descripcion : '';
  //   } else {
  //     return 'Descripción no disponible';
  //   }
  // }
  getProductoDescripcion(idProducto: number): string {
    if (this.productos && this.productos.length > 0) {
      const producto = this.productos.find(p => p.id_producto === idProducto);
      return producto ? producto.descripcion : '';
    } else {
      return 'Descripción no disponible';
    }
  }
  resetForm() {
    this.ventaRequest = new VentaRequest();
    this.productoSelected = new Producto();
    this.existeProducto = false;
  }

  // calcularTotal(){
  //   console.log(this.productoSelected);
  //   this.ventaRequest.id_ventas= this.productoSelected.id_producto;
  // }
  eliminarVenta(venta: Venta) {
    this.messageService.confirmMessage(``, `Seguro que desea eliminar al tipo de producto: ${venta.id_ventas}`, `Eliminar`, `warning`)
      .then(r => {
        if (r.isConfirmed) {
          this.eliminarCo(venta.id_ventas); 
        }
      });
  }
  
  eliminarCo(id: number) {
    this.ventasService.eliminarVenta(id)
      .subscribe(respuesta => {
        console.log(respuesta);
        this.getVentas();
      });  }

  calcularTotal() {  if (this.productoSeleccionado && this.ventaRequest.cantidad) {
    this.ventaRequest.total_venta = this.productoSeleccionado.precio * this.ventaRequest.cantidad   ;
    this.totalVenta = this.ventaRequest.total_venta; // Actualizar totalCompra para mostrar en el formulario
   
  } else {
    
    this.totalVenta = null;
  }
 
  }
  metodoEjemplo(evt){
    console.log(evt);
  }
  editarVenta(ven: Venta) {
    
    this.estoyEditando = true;
    this.ventaRequest.id_ventas = ven.id_ventas;
    this.ventaRequest.fecha_venta = ven.fecha_venta;
    this.ventaRequest.fk_producto = ven.fk_producto;
    this.ventaRequest.cantidad= ven.cantidad;
    this.productoSeleccionado = this.productos.find(p => p.id_producto === ven.fk_producto);

    this.calcularTotal();
    
    
  }
  salvarEdicion() {
    this.ventasService.editarVenta(this.ventaRequest).subscribe(
      data => {
        console.log('Compra actualizada:', data);
        this.getVentas(); // Actualizar lista de compras después de la edición
        this.resetForm(); // Limpiar formulario después de la edición exitosa
        this.estoyEditando = false; // Salir del modo de edición
      },
      error => {
        console.error('Error al actualizar la compra:', error);
      }
    );
  }
  
 cancelarEdicion() {
    this.ven = new Venta();
    this.resetForm()
    this.estoyEditando = false;
  }
}