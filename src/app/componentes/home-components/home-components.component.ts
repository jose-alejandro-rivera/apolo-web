import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, RouterStateSnapshot } from '@angular/router';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { IRecordResponse } from '../../interfaces/recordResponse';

/**
 * constante que obtiene la url del api web
 */
const URL = 'http://10.203.221.51:8080/api/';

/**
 * componente que obtiene las categorias y los flujos asociados
 */
@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css']
})
/**
 * provee el almacenamiento de categorias y de flujos 
 */
export class HomeComponent implements OnInit {
  /**
   * variable que obtiene el listado de flujos
   */
  public flujoList: any;
  /**
   * variable que itera el id del flujo seleccionado
   */
  private idFlujo: any;
  /**
   * variable que obtiene el formulario del componente
   */
  public formCategorias: FormGroup;
  /**
   * variable que evalua la visualizacion del componente
   */
  public homeComponent: boolean;
  /**
   * variable que evalia el envio de la informacion
   */
  public submitted = false;
  /**
   * variabe que conprende el listado de categorias
   */
  public arregloCat: any;
  /**
   * variable de usuario
   */
  private usuario: any;
  /**
   * variable que evalua la creacion e la atencion
   */
  private crearCategoria: any;

  /**
   * variables de secion
   * @param ejecucionAtencionService 
   * @param router 
   * @param formBuilder 
   */
  constructor(
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

  /**
   * Funcion que permite la carga de las categorias activas
   * 
   * @param
   * @returns arregloCat: lisatado de las categorias activas
   */
  ngOnInit() {
    this.ejecucionAtencionService.getData(URL + 'flujo/categorias').subscribe((res: any) => {
      setTimeout(() => {
        this.arregloCat = res;
      }, 100)
    }, err => {
      console.log(err);
    });
  }

  /**
   * Funcion que valida si el campo es requerido
   * 
   * @param formCategorias: parametros de entrada de form
   */
  get f() {
    return this.formCategorias.controls;
  }

  /**
   * Funcion que permite realizar el cargue de los flujos asociados a la categoria seleccionada
   * 
   * @param event: id de la categoria seleccionada 
   * @returns flujoList: listado de flujos asociados a la categoria
   */
  cargueFlujo(event) {
    let idCatefgoria = event.target.value;
    if (idCatefgoria == null || idCatefgoria == '') {
      this.flujoList = [];
      return
    } else {
      for (let categoria of this.arregloCat) {
        if (categoria.Id_CategoriaFlujo == idCatefgoria) {
          this.usuario = categoria.Usuario
        }
      }
      let url = URL + 'flujos/por/categorias/' + idCatefgoria;
      this.ejecucionAtencionService.getData(url).subscribe((data) => {
        this.flujoList = data;
      })
    }
  }

  /**
   * Funcion que realiza el guardado del id del flujo seleccionado
   * @param event: evento donde se encuentra el id del flujo seleccionado 
   */
  cargueIdFlujo(event) {
    let jsonFlujo = this.flujoList.find((e) => {
      return e.Id_Flujo == event.target.value
    })
    this.idFlujo = jsonFlujo;
  }

  /**
   * Funcion que valida la el llenado del formularioo y crea la atencion redireccionando el componente a la atencion-Component
   * @param event 
   */
  crearAtencion(event) {
    if (this.formCategorias.invalid) {
      this.submitted = true;
      return;
    } else {
      this.crearCategoria = {
        "CodLogin": 1,
        "CodFlujo": this.idFlujo.Id_Flujo
      };
      this.homeComponent = false;
      let url = URL + 'atencion/create/';
      this.ejecucionAtencionService.postData(url, this.crearCategoria).subscribe((data:IRecordResponse) => {
        console.log(data);
        localStorage.setItem('dataFlujoCat', JSON.stringify(this.idFlujo));
        this.ejecucionAtencionService.saveIdAtencion(data.recordsets[0].Id_Atencion);
        this.router.navigate(['flujo/list']);
        return false;
      });
    }
  }
}