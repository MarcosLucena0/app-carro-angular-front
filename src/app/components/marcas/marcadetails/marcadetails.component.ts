import { MarcaService } from './../../../services/marca.service';
import { routes } from './../../../app.routes';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Marca } from '../../../models/marca';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-marcadetails',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './marcadetails.component.html',
  styleUrl: './marcadetails.component.scss'
})
export class MarcadetailsComponent {

    @Input("marca") marca: Marca = new Marca(0, "");
    @Output("retorno") retorno = new EventEmitter<any>();
    router = inject(ActivatedRoute);
    router2 = inject(Router);

    marcaService = inject(MarcaService);

    constructor(){
      let id = this.router.snapshot.params['id'];
      if(id > 0){
        this.findById(id);
      }
    }

      findById(id: number){

        this.marcaService.findById(id).subscribe({
          next: retorno => {
            this.marca = retorno;
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
          if(this.marca.id > 0){
            this.marcaService.update(this.marca, this.marca.id).subscribe({
              next: mensagem => {
                Swal.fire({
                  title: mensagem,
                  icon: 'success',
                  confirmButtonText: 'ok'
                });
                this.router2.navigate(['admin/marcas'], { state: { marcaEditado: this.marca } });
                this.retorno.emit(this.marca);
              },
              error: erro => {
                Swal.fire({
                  title: 'Ocorreu um erro',
                  icon: 'error',
                  confirmButtonText: 'ok'
                });
                this.retorno.emit(this.marca);
              }
            });

          }else{

            this.marcaService.save(this.marca).subscribe({
              next: mensagem => {
                Swal.fire({
                  title: mensagem,
                  icon: 'success',
                  confirmButtonText: 'ok'
                });
                this.router2.navigate(['admin/marcas'], { state: { marcaNovo: this.marca } });
                this.retorno.emit(this.marca);
              },
              error: erro => {
                Swal.fire({
                  title: "Ocorreu um erroaaaaa",
                  icon: 'error',
                  confirmButtonText: 'ok'
                });
                this.retorno.emit(this.marca);
              }
            });
          }

        }

}
