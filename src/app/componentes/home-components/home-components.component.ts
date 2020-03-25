import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, RouterStateSnapshot } from '@angular/router';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { IRecordResponse } from '../../interfaces/recordResponse';
import { AppGlobals } from 'src/app/app.global';
import { AppComponent } from 'src/app/app.component';
import { async } from '@angular/core/testing';
import { AccesoRutasSingleton } from '../../singleton/AccesoRutasSingleton';

/**
 * componente que obtiene las categorias y los flujos asociados
 */
@Component({
  selector: 'app-home-components',
  templateUrl: './home-components.component.html',
  styleUrls: ['./home-components.component.css'],
  providers: [AppGlobals]
})
/**
 * provee el almacenamiento de categorias y de flujos 
 */
export class HomeComponent implements OnInit {

  public flujoList: any;
  private idFlujo: any;
  public formCategorias: FormGroup;
  public homeComponent: boolean;
  public submitted = false;
  public arregloCat: any;
  private usuario: any;
  private crearCategoria: any;
  public URL: any;
  dataFlujoOrden: any;
  orden: any;
  idCatefgoria: any;
  public categoria: any;
  private acceso : boolean = false;


  /**
   * variables de secion
   * @param ejecucionAtencionService 
   * @param router 
   * @param formBuilder 
   */
  constructor(
   // private accesoRutasSingleton: AccesoRutasSingleton,
    private ejecucionAtencionService: EjecucionAtencionService,
    private router: Router,
    private formBuilder: FormBuilder,
    private global: AppGlobals) {
    this.homeComponent = true;
    this.URL = this.global.url;
    localStorage.setItem('dataFlujoCat', '');
    this.formCategorias = this.formBuilder.group({
      idCategoria: [''],
      idflujo: ['', Validators.required]
    });
  }

  /**
   * Funcion que permite la carga de las categorias activas
   * 
   * @param
   * @returns arregloCat: lisatado de las categorias activas
   */
  async ngOnInit() {
    await this.validarAcceso();
    this.dataFlujoOrden = JSON.parse(localStorage.getItem('dataFlujoOrden'));
    this.orden=this.dataFlujoOrden.formOrden.orden;
    this.ejecucionAtencionService.getData(this.URL + 'flujo/categorias').subscribe((res: any) => {
      setTimeout(() => {
        this.arregloCat = res;
        let consult = this.dataFlujoOrden.activityType.split("_")[1];
        for (let categorias of this.arregloCat) {
          let NomCategoriaFlujo = categorias.NomCategoriaFlujo;
          NomCategoriaFlujo = this.global.getCleanedString(NomCategoriaFlujo);
          NomCategoriaFlujo = NomCategoriaFlujo.toUpperCase();
          if (NomCategoriaFlujo === consult) {
            this.categoria = categorias.NomCategoriaFlujo;
            this.idCatefgoria = categorias.Id_CategoriaFlujo
          }
        }
        this.cargueFlujo(this.idCatefgoria);
      }, 100)
    }, err => {
      console.log(err);
    });
  }
    /**
   * Funcion que nos permite validar el acceso a las url, 
   * si el parametro enviado es valido
   **/
  async validarAcceso(){
    //let parametro = AccesoRutasSingleton.getInstance();
    //let valor = await parametro.instanciaResultado();
    let ACCESO = JSON.parse(localStorage.getItem('recursos'));
    /*if(valor == false){
      this.router.navigate(['autorizado/denegado']);
    }*/
    if(!ACCESO.caracter_valido){
      this.router.navigate(['autorizado/denegado']);
    }
    if(ACCESO.caracter_valido == 'caracter_invalido'){
      this.router.navigate(['autorizado/denegado']);
    }
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
  cargueFlujo(id_Catefgoria) {
    let idCatefgoria = id_Catefgoria;
    if (idCatefgoria == null || idCatefgoria == '') {
      this.flujoList = [];
      return
    } else {
      for (let categoria of this.arregloCat) {
        if (categoria.Id_CategoriaFlujo == idCatefgoria) {
          this.usuario = categoria.Usuario
        }
      }
      let url = this.URL + 'flujos/por/Categorias/' + idCatefgoria;
      console.log(url);
      this.ejecucionAtencionService.getData(url).subscribe((data: IRecordResponse) => {
        this.flujoList = data.recordset;
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
    let activityId:any = JSON.parse(localStorage.getItem('dataFlujoOrden'))
    if (this.formCategorias.invalid) {
      this.submitted = true;
      return;
    } else {
      this.crearCategoria = {
        "CodLogin": 1,
        "CodFlujo": this.idFlujo.Id_Flujo,
         "NumOrden": this.orden,
         "activityId" : activityId.activityId
      };
      this.homeComponent = false;
      let url = this.URL + 'atencion/create/';
      this.ejecucionAtencionService.postData(url, this.crearCategoria).subscribe((data: IRecordResponse) => {
        localStorage.setItem('dataFlujoCat', JSON.stringify(this.idFlujo));
        this.ejecucionAtencionService.saveIdAtencion(data.recordset[0].Id_Atencion);
        this.router.navigate(['flujo/list']);
        return false;
      });
    }
  }

}