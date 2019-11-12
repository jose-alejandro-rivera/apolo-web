import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { CategoriasService } from '../../servicios/categorias.service';
import { FlujoService } from '../../servicios/flujo.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
export class HomeComponent implements OnInit {
  listCategoria: any; // variable para el cargue de categorias
  listFlujos: any; // variable para el cargue de todos los flujos
  flujo: any[] = []; // 
  flujo2: any; // 
  formCategoriasSelect: FormGroup;
  selectInvalido: boolean = false;
  constructor(private http: HttpClient, private categoriasService: CategoriasService, private flujoService: FlujoService, private router: Router) {

  }

  ngOnInit() {
    /* Esta funcion permite cargar el servicio para alimentar el select  de todas las categorias*/
    this.categoriasService.getCategorias().subscribe((data) => {
      this.listCategoria = data;
    });

  }
  /* Esta funcion permite realizar el filtro de los flujos segun la categoria que se haya seleccionada*/
  cargueFlujo(event) {
    debugger;
    let idCatefgoria = event.target.value;
    console.log(idCatefgoria);
    /* Esta funcion permite cargar el servicio para alimentar el select  de todas los flujos*/
    this.flujoService.getFlujos(idCatefgoria).subscribe((data) => {
      this.flujo2 = data;
    })
  }



  crearAtencion() {
    if (this.formCategoriasSelect.invalid) {
      return;
      console.log('Si entraaaaaaaa----');
    }

  

    const datosSeleccionados = {
      username: this.formCategoriasSelect.controls.categoria.value,
      password: this.formCategoriasSelect.controls.flujo.value
    } 
    this.categoriasService.categoria(datosSeleccionados).subscribe(data => {
      if(data.status === 200) {
       /* window.localStorage.setItem('token', data.result.token);
        this.router.navigate(['list-user']);*/
        console.log('valida el if y si entra');
      }else {
        this.selectInvalido = true;
        console.log('Es invalidoooooo');
      }
    })  
  }
}
