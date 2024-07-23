import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router, private loginService: LoginService) { }

  goTo(where: string): void {
    if (where === 'loguin') {
      // Limpiar la información de inicio de sesión al salir
      this.loginService.setConectado('', false);
    }
    this.router.navigate([where]);
  }
  isAdminLoggedIn(): boolean {
    // Verifica si el usuario actual está conectado como administrador
    const user = this.loginService.getConectado();
    return user.nombre_Usuario === 'admin' && user.conectado;
  }
}