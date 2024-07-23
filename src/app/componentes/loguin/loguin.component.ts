import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/servicios/login.service';
import { MessageService } from 'src/app/servicios/message.service';

@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.component.html',
  styleUrls: ['./loguin.component.scss']
})
export class LoguinComponent implements OnInit {
  usuario: string = "";
  password: string = "";
  entrar: boolean = false;

  constructor(private router: Router, private messageService: MessageService, public login: LoginService) { }

  ngOnInit() {
    this.login.iniciarConectado();
    if (this.login.getConectado().conectado) {
      this.router.navigate(['/stock']);
    }
  }

  verificarIngreso() {
    const usuario = this.usuario.trim();
    const password = this.password.trim();

    if (usuario === "admin" && password === "123") {
      this.login.setConectado(usuario, true);
      this.ingresar();
    } else {
      this.messageService.automaticMessageError(`Usuario o contraseña incorrectos`);
    }
  }

  ingresar() {
    this.entrar = true;
    this.messageService.automaticMessageOk(`Bienvenido Admin`);
    this.router.navigate(['/stock']);
  }
}