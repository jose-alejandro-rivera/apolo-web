import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component'; 
import { HomeComponent } from './componentes/home-components/home-components.component';
import { AtencionComponentsComponent } from './componentes/atencion-components/atencion-components.component';
import { OrdenComponentsComponent } from './componentes/orden-components/orden-components.component'

const routes: Routes = [
  
  {
    path: 'home',
   	component: AppComponent
  },
  {
    path: 'home/orden',
   	component: OrdenComponentsComponent
  },
  {
    path: 'home/componet',
   	component: HomeComponent
  },
  {
    path: 'flujo/list',
    component: AtencionComponentsComponent
  }
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
