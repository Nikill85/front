import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Error404Component } from './paginas/error404/error404.component';

import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { TableModule } from 'primeng/table';
import { TipoProductoComponent } from './componentes/tipo-producto/tipo-producto.component';

import { ProductoComponent } from './paginas/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfiguracionComponent } from './paginas/configuracion/configuracion.component';
import { ComprasComponent } from './paginas/compras/compras.component';
import { StockComponent } from './paginas/stock/stock.component';
import { NoStockPipe } from './pipes/no-stock.pipe';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { VentasComponent } from './paginas/ventas/ventas.component';
import { ProveedoresComponent } from './paginas/proveedores/proveedores.component';
import { LoguinComponent } from './componentes/loguin/loguin.component';
import { HomeComponent } from './componentes/home/home.component';
import { ChartModule } from 'primeng/chart';


@NgModule(
  {
    //Componentes de la aplicacion, AppComponent/ErrorComponent/HomeComponent/etc
    declarations: [
      AppComponent,
      Error404Component,
      TablaComponent,
      TipoProductoComponent,

      ProductoComponent,
      ConfiguracionComponent,
      ComprasComponent,
      StockComponent,
      NoStockPipe,
      VentasComponent,
      ProveedoresComponent,
      LoguinComponent,
      HomeComponent,
    ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      FormsModule,
      AppRoutingModule,
      ButtonModule,
      CardModule,
      MenubarModule,
      DialogModule,
      TableModule,
      HttpClientModule,
      ToggleButtonModule,
      HttpClientModule,
      ChartModule
   
     
      
    ],
    providers: [],
    bootstrap: [AppComponent]
  }
)
export class AppModule { }
