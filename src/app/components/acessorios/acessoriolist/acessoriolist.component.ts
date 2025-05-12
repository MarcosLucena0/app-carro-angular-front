import { Acessorio } from './../../../models/acessorio';
import { AcessoriodetailsComponent } from './../acessoriodetails/acessoriodetails.component';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessorioService } from '../../../services/acessorio.service';

@Component({
  selector: 'app-acessoriolist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, AcessoriodetailsComponent, AcessoriolistComponent],
  templateUrl: './acessoriolist.component.html',
  styleUrl: './acessoriolist.component.scss'
})
export class AcessoriolistComponent {

  lista: Acessorio[] = [];
  acessorioEdit: Acessorio = new Acessorio(0, "");

  @Input("esconderBotoes") esconderBotoes: boolean = false;
  @Output("retorno") retorno = new EventEmitter<any>();


  modalService = inject(MdbModalService); //serve para brir o modal ou popup
  @ViewChild("modalAcessorioDetalhe") modalAcessorioDetalhe!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  acessorioService = inject(AcessorioService);


  constructor(){

    this.listAll();

    let marcaNovo = history.state.marcaNovo;
    let marcaEditado = history.state.marcaEditado;

    if(marcaNovo != null){
      marcaNovo.id = 333;
      this.lista.push(marcaNovo);
    }

    if(marcaEditado != null){
      let indice = this.lista.findIndex((x) => {return x.id == marcaEditado.id});
      this.lista[indice] = marcaEditado;
    }
  }

  listAll(){

    this.acessorioService.listAll().subscribe({
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

  deleteById(acessorio: Acessorio){

    Swal.fire({
      title: 'Tem certeza que deseja deletar? ',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
    }).then((result) => {
      if(result.isConfirmed){
        this.acessorioService.delete(acessorio.id).subscribe({
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
    this.acessorioEdit = new Acessorio(0, "");
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  edit(acessorio: Acessorio){
    this.acessorioEdit = Object.assign({}, acessorio);
    this.modalRef = this.modalService.open(this.modalAcessorioDetalhe);
  }

  retornoDetalhe(acessorio: Acessorio){
    this.listAll();
    this.modalRef.close();
  }

  select(acessorio: Acessorio){
    this.retorno.emit(acessorio);
  }


}
