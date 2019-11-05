import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlujoComponentsComponent } from './componentes/flujo-components/flujo-components.component';
import { HomeComponentsComponent } from './componentes/home-components/home-components.component';

@NgModule({
  declarations: [
    AppComponent,
    FlujoComponentsComponent,
    HomeComponentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
