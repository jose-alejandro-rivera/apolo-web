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
    /* Esta funcion permite cargar el servicio para alimentar el select  de todas los flujos*/
    this.flujoService.getFlujos().subscribe((data) => {
      this.listFlujos = data;
      for(let x of this.listFlujos){
        this.flujo.push(x)
      }
    })
    }
/* Esta funcion permite realizar el filtro de los flujos segun la categoria seleccionada*/
  cargueFlujo(event){
    debugger;
    let idCatefgoria = event.target.value;
    this.flujo2 = this.flujo.filter((e) => {
      if(e.Id_Flujo == idCatefgoria){
        return e;
      }
    })
    console.log(this.flujo2);
    
  }

  

}
