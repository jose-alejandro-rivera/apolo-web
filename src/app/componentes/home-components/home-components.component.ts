import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { Router, RouterStateSnapshot } from '@angular/router';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';

const URL = 'http://localhost:3001/api/';

@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
export class HomeComponent implements OnInit {
  listCategoria: any[] = []; // variable para el cargue de categorias
  listFlujos: any; // variable para el cargue de todos los flujos
  flujo2: any; //
  categoria: any;
  categorias: any;
  idFlujo: any;
  formCategorias: FormGroup;
  homeComponent: Boolean;
  submitted = false;
  arregloCat: any;
  usuario: any;
  crearCategoria:any;

  constructor(
    private http: HttpClient,
    private ejecucionAtencionService: EjecucionAtencionService,
    private router: Router,
    private formBuilder: FormBuilder) {

    this.homeComponent = true;
    localStorage.setItem('dataFlujoCat', '');
    this.formCategorias = this.formBuilder.group({
      idCategoria: ['', Validators.required],
      idflujo: ['', Validators.required]
    });
  }

  ngOnInit() {
    /* Esta funcion permite cargar el servicio para alimentar el select de todas las categorias activas*/
    this.ejecucionAtencionService.getData(URL + 'flujo/categorias').subscribe((res: any) => {
      setTimeout(() => {
        this.arregloCat = res;
      }, 100)
    }, err => {
      console.log(err);
    });
  }

  get f() {
    return this.formCategorias.controls;
  }
  /* Esta funcion permite realizar el filtro de los flujos segun la categoria que se haya seleccionada*/
  cargueFlujo(event) {
    let idCatefgoria = event.target.value;

    if (idCatefgoria == null || idCatefgoria == '') {
      this.flujo2 = [];
      return
    } else {
      for (let categoria of this.arregloCat) {
        if (categoria.Id_CategoriaFlujo == idCatefgoria) {
          this.usuario = categoria.Usuario
        }
      }
      let url = URL + 'flujos/por/categorias/' + idCatefgoria;
      console.log(url);
      this.ejecucionAtencionService.getData(url).subscribe((data) => {
        this.flujo2 = data;
      })

    }

  }

  cargueIdFlujo(event) {

    let jsonFlujo = this.flujo2.find((e) => {
      return e.Id_Flujo == event.target.value
    })
    this.idFlujo = jsonFlujo;

  }
  /* Valida el formulario de la pagina home-components.componentes.html */
  crearAtencion(e) {
    debugger;
    if (this.formCategorias.invalid) {
      this.submitted = true;
      return;
    } else {
      this.crearCategoria = {
        "CodLogin":1,
        "CodFlujo":this.idFlujo.Id_Flujo
      };
      this.homeComponent = false;
      let url = URL + 'atencion/create/';
      this.ejecucionAtencionService.postData(url, this.crearCategoria).subscribe(data => {

        localStorage.setItem('dataFlujoCat', JSON.stringify(this.idFlujo));
        this.router.navigate(['flujo/list']);
        return false;
      })
    }

  }
  /* Este metodo permite conectarse al servicio CategoriasService */
  // public creaAtencion(e, state: RouterStateSnapshot) {
  //   this.ejecucionAtencionService.postData(URL, this.crearCategoria).subscribe(data => {
  //     this.router.navigate(['flujo/list'], { queryParams: { data: 'crearCategoria' } });
  //     return false;
  //   })
  // }
}