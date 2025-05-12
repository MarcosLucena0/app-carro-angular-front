import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { MarcadetailsComponent } from '../marcadetails/marcadetails.component';
import { MarcaService } from '../../../services/marca.service';
import { Marca } from '../../../models/marca';


@Component({
  selector: 'app-marcalist',
  standalone: true,
  imports: [RouterLink, MdbModalModule, MarcadetailsComponent, MarcalistComponent],
  templateUrl: './marcalist.component.html',
  styleUrl: './marcalist.component.scss'
})
export class MarcalistComponent {

    lista: Marca[] = [];
    marcaEdit: Marca = new Marca(0, "");

    @Input("esconderBotoes") esconderBotoes: boolean = false;
    @Output("retorno") retorno = new EventEmitter<any>();


    modalService = inject(MdbModalService); //serve para brir o modal ou popup
    @ViewChild("modalMarcaDetalhe") modalMarcaDetalhe!: TemplateRef<any>;
    modalRef!: MdbModalRef<any>;

    marcaService = inject(MarcaService);
    //marca: any;

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

        this.marcaService.listAll().subscribe({
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


    deleteById(marca: Marca){

          Swal.fire({
                  title: 'Tem certeza que deseja deletar? ',
                  icon: 'warning',
                  showConfirmButton: true,
                  showDenyButton: true,
                  confirmButtonText: "Sim",
                  cancelButtonText: "Não",
                }).then((result) => {
                  if(result.isConfirmed){

                    this.marcaService.delete(marca.id).subscribe({
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
    this.marcaEdit = new Marca(0, "");
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  edit(marca: Marca){
    this.marcaEdit = Object.assign({}, marca);
    this.modalRef = this.modalService.open(this.modalMarcaDetalhe);
  }

  retornoDetalhe(marca: Marca){
    this.listAll();
    this.modalRef.close();
  }

  select(marca: Marca){
    this.retorno.emit(marca);
  }

}
