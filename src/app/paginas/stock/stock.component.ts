import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/clases/producto.model';
import { ProductoService } from 'src/app/servicios/producto.service';
import { HttpClient } from '@angular/common/http';
import { Compra } from 'src/app/clases/compra.model';
import { Venta } from 'src/app/clases/venta.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  productos: Producto[] = [];
  compras: Compra[] = [];
  ventas: Venta[] = [];
  mostrarModal = false;

  pieChartData: any;
  pieChartOptions: any;

  // Datos para el gráfico de barras (ventas mensuales)
  barChartData: any;
  barChartOptions: any;

  // Datos para el gráfico de barras (productos más vendidos)
  barChartProductosData: any;
  barChartProductosOptions: any;

  constructor(private httpClient: HttpClient, private productoService: ProductoService) {}

  ngOnInit(): void {
    this.getProductos();
    this.getCompras();
    this.getVentas();
     // Inicializa los datos del gráfico de pastel
    this.initializeBarChartData(); // Inicializa los datos del gráfico de barras (ventas mensuales)
    this.initializeBarChartProductosData(); // Inicializa los datos del gráfico de barras (productos más vendidos)
  }

  getProductos() {
    this.productoService.getProductos().subscribe(
      (productos: Producto[]) => {
        this.productos = productos;
        this.calcularStock();
      },
      (error) => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }

  getCompras() {
    this.httpClient.get<Compra[]>('http://localhost:3000/compras').subscribe(
      (compras: Compra[]) => {
        this.compras = compras;
        this.calcularStock();
      },
      (error) => {
        console.error('Error al obtener las compras:', error);
      }
    );
  }

  getVentas() {
    this.httpClient.get<Venta[]>('http://localhost:3000/ventas').subscribe(
      (ventas: Venta[]) => {
        this.ventas = ventas;
        this.calcularStock();
        this.updateBarChartData(); // Actualiza los datos del gráfico de ventas mensuales
        this.updateBarChartProductosData(); // Actualiza los datos del gráfico de productos más vendidos
      },
      (error) => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

  calcularStock() {
    let bajoStock = 0;
    let sinStock = 0;
    let suficienteStock = 0;

    this.productos.forEach(producto => {
      const comprasProducto = this.compras.filter(c => c.fk_producto === producto.id_producto)
                                          .reduce((total, compra) => total + compra.cantidad, 0);
      const ventasProducto = this.ventas.filter(v => v.fk_producto === producto.id_producto)
                                        .reduce((total, venta) => total + venta.cantidad, 0);
      let stock = comprasProducto - ventasProducto;
      producto.stock = stock >= 0 ? stock : 0;

      if (producto.stock <= 5 && producto.stock > 0) {
        bajoStock++;
      } else if (producto.stock === 0) {
        sinStock++;
      } else {
        suficienteStock++;
      }
    });

    this.pieChartData = {
      labels: ['Bajo Stock', 'Sin Stock', 'Suficiente Stock'],
      datasets: [
        {
          data: [bajoStock, sinStock, suficienteStock],
          backgroundColor: ['#FFE262', '#FF6364', '#91C483']
        }
      ]
    };

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  initializeBarChartData() {
    // Inicializa los datos y opciones del gráfico de barras (ventas mensuales)
    this.barChartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio' ,'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      datasets: [
        {
          label: 'Ventas Mensuales',
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Inicializa con valores en 0
          backgroundColor: '#FFCE56'
        }
      ]
    };

    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false
    };
  }

  updateBarChartData() {
    // Actualiza los datos del gráfico de barras (ventas mensuales) con las ventas reales
    const monthlySales = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // Inicializa con valores en 0 para cada mes
    this.ventas.forEach(venta => {
      const monthIndex = new Date(venta.fecha_venta).getMonth(); // Obtiene el índice del mes
      monthlySales[monthIndex] += venta.cantidad; // Suma la cantidad de ventas al mes correspondiente
    });

    this.barChartData.datasets[0].data = monthlySales;
  }

  initializeBarChartProductosData() {
    // Inicializa los datos y opciones del gráfico de barras (productos más vendidos)
    this.barChartProductosData = {
      labels: [],
      datasets: [
        {
          label: 'Productos Más Vendidos',
          data: [], // Inicializa con datos vacíos
          backgroundColor: '#4bc0c0'
        }
      ]
    };

    this.barChartProductosOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };
  }

  updateBarChartProductosData() {
    // Actualiza los datos del gráfico de barras (productos más vendidos)
    const productsSalesMap = new Map<number, number>(); // Mapa para almacenar las ventas por producto

    this.ventas.forEach(venta => {
      if (productsSalesMap.has(venta.fk_producto)) {
        productsSalesMap.set(venta.fk_producto, productsSalesMap.get(venta.fk_producto) + venta.cantidad);
      } else {
        productsSalesMap.set(venta.fk_producto, venta.cantidad);
      }
    });

    // Ordena los productos por cantidad de ventas de mayor a menor
    const sortedProducts = Array.from(productsSalesMap.entries())
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 5); // Obtiene los 5 productos más vendidos

    // Prepara los datos para el gráfico
    this.barChartProductosData.labels = sortedProducts.map(item => `Producto ${item[0]}`);
    this.barChartProductosData.datasets[0].data = sortedProducts.map(item => item[1]);
  }

  mostrarEstadisticas() {
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
  }
}
