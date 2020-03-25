import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './componentes/home-components/home-components.component';
import { AtencionComponentsComponent } from './componentes/atencion-components/atencion-components.component';
import { OrdenComponentsComponent } from './componentes/orden-components/orden-components.component';
import { IntegracionCamaraComponent } from './componentes/integracion-camara/integracion-camara.component';
import {WebcamModule} from 'ngx-webcam';
import { PageErrorComponent } from './componentes/page-error/page-error.component';
import { HeaderComponentComponent } from './componentes/header-component/header-component.component';
import { IntegracionHadaComponent } from './componentes/integracion-hada/integracion-hada.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    HomeComponent,
    AtencionComponentsComponent,
    OrdenComponentsComponent,
    IntegracionCamaraComponent,
    PageErrorComponent,
    HeaderComponentComponent,
    IntegracionHadaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    FormsModule,
    WebcamModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
