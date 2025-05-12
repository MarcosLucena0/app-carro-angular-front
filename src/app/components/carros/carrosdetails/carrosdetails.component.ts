import { Acessorio } from './../../../models/acessorio';
import { CarroService } from './../../../services/carro.service';
import { routes } from './../../../app.routes';
import { Component, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Carro } from '../../../models/carro';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { MarcalistComponent } from "../../marcas/marcalist/marcalist.component";
import { Marca } from '../../../models/marca';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AcessoriolistComponent } from "../../acessorios/acessoriolist/acessoriolist.component";

@Component({
  selector: 'app-carrosdetails',
  standalone: true,
  imports: [FormsModule, MarcalistComponent, AcessoriolistComponent, MdbFormsModule],
  templateUrl: './carrosdetails.component.html',
  styleUrl: './carrosdetails.component.scss'
})
export class CarrosdetailsComponent {

  @Input("carro") carro: Carro = new Carro(0, "", null);
  @Output("retorno") retorno = new EventEmitter<any>();
  router = inject(ActivatedRoute);
  router2 = inject(Router);

  modalService = inject(MdbModalService); //serve para brir o modal ou popup
  @ViewChild("modalMarcas") modalMarcas!: TemplateRef<any>;
  @ViewChild("modalAcessorios") modalAcessorios!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  carroService = inject(CarroService);

  constructor(){
    let id = this.router.snapshot.params['id'];
    if(id > 0){
      this.findById(id);
    }
  }

  findById(id: number){

    this.carroService.findById(id).subscribe({
      next: retorno => {
        this.carro = retorno;
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
    if(this.carro.id > 0){
      this.carroService.update(this.carro, this.carro.id).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'ok'
          });
          this.router2.navigate(['admin/carros'], { state: { carroEditado: this.carro } });
          this.retorno.emit(this.carro);
        },
        error: erro => {
          Swal.fire({
            title: 'Ocorreu um erro',
            icon: 'error',
            confirmButtonText: 'ok'
          });
          this.retorno.emit(this.carro);
        }
      });

    }else{

      this.carroService.save(this.carro).subscribe({
        next: mensagem => {
          Swal.fire({
            title: mensagem,
            icon: 'success',
            confirmButtonText: 'ok'
          });
          this.router2.navigate(['admin/carros'], { state: { carroNovo: this.carro } });
          this.retorno.emit(this.carro);
        },
        error: erro => {
          Swal.fire({
            title: "Ocorreu um erroaaaaa",
            icon: 'error',
            confirmButtonText: 'ok'
          });
          this.retorno.emit(this.carro);
        }
      });
    }

  }

  buscarMarca(){
    this.modalRef = this.modalService.open(this.modalMarcas, {modalClass: 'modal-lg'});
  }

  buscarAcessorio(){
    this.modalRef = this.modalService.open(this.modalAcessorios, {modalClass: 'modal-lg'});
  }

  retornoMarca(marca:Marca){
    this.carro.marca = marca;
    this.modalRef.close();
  }

  retornoAcessorio(acessorio: Acessorio){
    if(this.carro.acessorios == null)
      this.carro.acessorios = [];

    this.carro.acessorios.push(acessorio);
    this.modalRef.close();
  }

  desvincularAcessorioCarro(acessorio: Acessorio){
    let posicao = this.carro.acessorios.findIndex(x => {return x.id == acessorio.id});
    this.carro.acessorios.splice(posicao, 1);
  }

}
