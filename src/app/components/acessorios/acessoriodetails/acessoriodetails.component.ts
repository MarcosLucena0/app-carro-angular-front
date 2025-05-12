import { AcessorioService } from './../../../services/acessorio.service';
import { routes } from './../../../app.routes';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Acessorio } from '../../../models/acessorio';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-acessoriodetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './acessoriodetails.component.html',
  styleUrl: './acessoriodetails.component.scss'
})
export class AcessoriodetailsComponent {

  @Input("acessorio") acessorio: Acessorio = new Acessorio(0, "");
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  acessorioService = inject(AcessorioService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){
    this.acessorioService.findById(id).subscribe({
      next: retorno => {
        this.acessorio = retorno;
      },
      error: erro => {
        Swal.fire({
          title: 'Editado com sucesso!',
          icon: 'success',
          confirmButtonText: 'ok'
        });
      }
    });
  }

  save(){
    if(this.acessorio.id > 0){
      this.acessorioService.update(this.acessorio, this.acessorio.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'ok'
          });
          this.router2.navigate(['admin/acessorios'], { state: { acessorioEditado: this.acessorio } });
          this.retorno.emit(this.acessorio);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'ok'
          });
          this.retorno.emit(this.acessorio);
        }
      });

    }else{
      this.acessorioService.save(this.acessorio).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'ok'
          });
          this.router2.navigate(['admin/acessorios'], { state: { acessorioNovo: this.acessorio } });
          this.retorno.emit(this.acessorio);
        },
        error: erro => {
          Swal.fire({
            title: "Ocorreu um erroaaaaa",
            icon: 'error',
            confirmButtonText: 'ok'
          });
            this.retorno.emit(this.acessorio);
        }
      });
    }
  }

}
