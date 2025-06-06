
//import { Carro } from '../../../../../../aula-angular/src/app/models/carro';
import { Carro } from '../../../models/carro';
import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CarrosdetailsComponent } from '../carrosdetails/carrosdetails.component';
import { CarroService } from '../../../services/carro.service';
import { Marca } from '../../../models/marca';
import { ɵNullViewportScroller } from '@angular/common';

@Component({
  selector: 'app-carroslist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, CarrosdetailsComponent],
  templateUrl: './carroslist.component.html',
  styleUrl: './carroslist.component.scss'
})
export class CarroslistComponent {

  lista: Carro[] = [];
  carroEdit: Carro = new Carro(0, "", null);

  modalService = inject(MdbModalService); //serve para brir o modal ou popup
  @ViewChild("modalCarroDetalhe") modalCarroDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);

  constructor(){

    this.listAll();

    let carroNovo = history.state.carroNovo;
    let carroEditado = history.state.carroEditado;

    if(carroNovo != null){
      carroNovo.id = 333;
      this.lista.push(carroNovo);
    }

    if(carroEditado != null){
      let indice = this.lista.findIndex((x) => {return x.id == carroEditado.id});
      this.lista[indice] = carroEditado;
    }


  }

  listAll(){

    this.carroService.listAll().subscribe({
      next: lista => { //quando o back retornar o q se espera
        this.lista = lista;
      },
      error: erro => { //quando ocorrer algum erro
        Swal.fire({
          title: 'Ocorreu um erro',
          icon: 'error',
          confirmButtonText: 'ok'
        });
      }
    });
  }



  deleteById(carro: Carro){

    Swal.fire({
            title: 'Tem certeza que deseja deletar? ',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
          }).then((result) => {
            if(result.isConfirmed){

              this.carroService.delete(carro.id).subscribe({
                next: mensagem => { //quando o back retornar o q se espera
                  Swal.fire({
                      title: mensagem,
                      icon: 'success',
                      confirmButtonText: 'ok'
                    });
                    this.listAll();
                },
                error: erro => { //quando ocorrer algum erro
                  Swal.fire({
                    title: 'Ocorreu um erro',
                    icon: 'error',
                    confirmButtonText: 'ok'
                  });
                }
              });
            }
          });

  }

  new(){
    this.carroEdit = new Carro(0, "", null);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  edit(carro: Carro){
    this.carroEdit = Object.assign({}, carro);
    this.modalRef = this.modalService.open(this.modalCarroDetalhe);
  }

  retornoDetalhe(carro: Carro){
    this.listAll();
    this.modalRef.close();
  }

}
