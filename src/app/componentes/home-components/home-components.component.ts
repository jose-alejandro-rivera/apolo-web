import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CategoriasService } from '../servicios/categorias.service';
import { FlujoService } from '../servicios/flujo.service';

@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
export class HomeComponent implements OnInit {
  listCategoria: any; // variable para el cargue de categorias
  listFlujos: any ; // variable para el cargue de todos los flujos
  flujo: any[]=[]; // 
  flujo2: any; // 
  constructor(private http: HttpClient, private categoriasService: CategoriasService, private flujoService: FlujoService ) { 
   
  }
  
  ngOnInit() {
    /* Esta funcion permite cargar el servicio para alimentar el select  de todas las categorias*/
    this.categoriasService.getCategorias().subscribe((data) => {
     this.listCategoria = data;
    });

    }
/* Esta funcion permite realizar el filtro de los flujos segun la categoria que se haya seleccionada*/
  cargueFlujo(event){
    debugger;
    let idCatefgoria = event.target.value;
    console.log(idCatefgoria);
        /* Esta funcion permite cargar el servicio para alimentar el select  de todas los flujos*/
        this.flujoService.getFlujos(idCatefgoria).subscribe((data) => {
          this.flujo2 = data;
        })
 }
}
