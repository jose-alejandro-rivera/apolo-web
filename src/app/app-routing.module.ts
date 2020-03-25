import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../app/app.component'; 
import { HomeComponent } from './componentes/home-components/home-components.component';
import { AtencionComponentsComponent } from './componentes/atencion-components/atencion-components.component';
import { OrdenComponentsComponent } from './componentes/orden-components/orden-components.component';
import { PageErrorComponent } from './componentes/page-error/page-error.component';
import { HeaderComponentComponent } from './componentes/header-component/header-component.component';
const routes: Routes = [
 
  {
    path: '',
    component: PageErrorComponent
  },
 {
    path: ':parametro',
    component: HeaderComponentComponent
  }, 
  {
    path: 'home/orden', pathMatch: 'full',
   	component: OrdenComponentsComponent
  },
  {
    path: 'home/componet', pathMatch: 'full',
   	component: HomeComponent
  },
  {
    path: 'flujo/list', pathMatch: 'full',
    component: AtencionComponentsComponent
  },
  {
    path: 'autorizado/denegado', pathMatch: 'full',
    component: PageErrorComponent
  },
  {
    path: '**',
    component: PageErrorComponent
  },
  /*{
    path: '**',
    component: HeaderComponentComponent
  } */
 ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
