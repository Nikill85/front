// login.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private usuario_Comun = { nombre_Usuario: "", conectado: false };
  private admin = { nombre_Usuario: "admin", clave: "123", conectado: false };

  constructor() { }

  iniciarConectado() {
    const storedUser = JSON.parse(localStorage.getItem('Login'));
    if (storedUser) {
      this.setConectado(storedUser.nombre_Usuario, storedUser.conectado);
    }
    this.admin.conectado = JSON.parse(localStorage.getItem('Admin'));
  }

  getConectado() {
    return this.usuario_Comun;
  }

  setConectado(nom: string, bool: boolean) {
    this.usuario_Comun.conectado = bool;
    this.usuario_Comun.nombre_Usuario = nom;
    localStorage.setItem('Login', JSON.stringify(this.usuario_Comun));
  }

  getAdmin() {
    return this.admin;
  }

  setAdmin(bool: boolean) {
    this.admin.conectado = bool;
    localStorage.setItem('admin', JSON.stringify(bool));
  }
}
