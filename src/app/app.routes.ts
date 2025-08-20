 import { AcessoriolistComponent } from './components/acessorios/acessoriolist/acessoriolist.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CarroslistComponent } from './components/carros/carroslist/carroslist.component';
import { CarrosdetailsComponent } from './components/carros/carrosdetails/carrosdetails.component';
import { MarcalistComponent } from './components/marcas/marcalist/marcalist.component';
import { MarcadetailsComponent } from './components/marcas/marcadetails/marcadetails.component';
import { AcessoriodetailsComponent } from './components/acessorios/acessoriodetails/acessoriodetails.component';

export const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "admin", component: PrincipalComponent, children: [
    {path: "carros", component: CarroslistComponent},
    {path: "carros/new", component: CarrosdetailsComponent},
    {path: "carros/edit/:id", component: CarrosdetailsComponent},
    {path: "marcas", component: MarcalistComponent},
    {path: "marcas/new", component: MarcadetailsComponent},
    {path: "marcas/edit/:id", component: MarcadetailsComponent},
    {path: "acessorios", component: AcessoriolistComponent},
    {path: "acessorios/new", component: AcessoriodetailsComponent},
    {path: "acessorios/edit/:id", component: AcessoriodetailsComponent}
  ]}
];

