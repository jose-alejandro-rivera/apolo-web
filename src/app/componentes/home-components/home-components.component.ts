import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CategoriasService } from '../../servicios/categorias.service';
import { FlujoService } from '../../servicios/flujo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
export class HomeComponent implements OnInit {
  listCategoria: any[] = []; // variable para el cargue de categorias
  listFlujos: any; // variable para el cargue de todos los flujos
 // flujo: any[] = []; // 
  flujo2:any; // 
  categoria:any;
  flujo:any;
  categorias:any;
  formCategorias: FormGroup;
  arregloCat:any[] = [];
 
  constructor(private http: HttpClient, private categoriasService: CategoriasService, private flujoService: FlujoService, private router: Router, private formBuilder: FormBuilder ) { 
   
  }

  ngOnInit() {
    /* Esta funcion permite cargar el servicio para alimentar el select  de todas las categorias*/
    this.categoriasService.getCategorias().subscribe((data) => {

      setTimeout(()=>{
        this.listCategoria.push(data);
        for(let x in data){ 
          if(data[x].Id_CategoriaFlujo != undefined){
            this.arregloCat.push({
              Id_CategoriaFlujo :  data[x].Id_CategoriaFlujo,
              NomCategoriaFlujo : data[x].NomCategoriaFlujo,
            })
          }          
        }

      },100)
    });

  }
  /* Esta funcion permite realizar el filtro de los flujos segun la categoria que se haya seleccionada*/
  cargueFlujo(event) {
    let idCatefgoria = event.target.value;
    console.log(idCatefgoria);
        this.flujoService.getFlujos(idCatefgoria).subscribe((data) => {
          this.flujo2 = data;
        })
 }

    //formCategorias = new FormGroup({
      
     /* categoria = new FormControl('',Validators.required),
      flujo = new FormControl('',Validators.required) */
    //});

    validaCampos (){
      this.formCategorias = this.formBuilder.group({
        categoria: ['', Validators.required],
        flujo: ['', Validators.required]
      });
    }

    public creaAtencion(e) {
      console.log(this.flujo)
      e.preventDefault();
     
      return false;
      
        //this.categoriasService.crearAtencion(this.formCategorias.value).subscribe( data => {
          
        //})
    }

}
