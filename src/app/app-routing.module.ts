import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/home-components/home-components.component';
import { AtencionComponentsComponent } from './componentes/atencion-components/atencion-components.component';


const routes: Routes = [
  {
    path: './componentes/home-components/home-components',
   	component: HomeComponent
  },
  {
    path: './componentes/atencion-components/atencion-components.component',
    component: AtencionComponentsComponent
  }
 
];

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
