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

@NgModule({
  declarations: [
    AppComponent,
    AppComponent,
    HomeComponent,
    AtencionComponentsComponent,
    OrdenComponentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
