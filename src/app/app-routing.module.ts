import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home-components/home-components.component';


const routes: Routes = [
  {
    path: 'table/list',
   	component: HomeComponent
  },
  {
    path: './componentes/flujo-components/atencion-components', 
    component: HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
