import { routes } from './../../../app.routes';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  usuario!: string;
  senha!: string;

  router = inject(Router);

  logar(){
    if(this.usuario == "admin" && this.senha == 'admin'){
      this.router.navigate(['admin/carros']);
    }else {
      alert("usuario ou senha incorretos")
    }
  }

}
