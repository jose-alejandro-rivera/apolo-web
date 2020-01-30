import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import * as camera from 'nativescript-camera';


/**
 * 
 */
@Component({
  selector: 'app-orden-components',
  templateUrl: './orden-components.component.html',
  styleUrls: ['./orden-components.component.css'],
  providers: [AppGlobals]
})
/**
 * 
 */
export class OrdenComponentsComponent implements OnInit {

  /**
 * variable que itera el componente atencion
 */
  componentFlujo: boolean;
  /**
   * variable que itera el componente de categorias
   */
  componentCategoria: boolean;

  /**
   * 
   */
  public orden: any;
  /**
   * 
   */
  public param: any;
  /**
   * 
   * 
   */
  public URL: any;
  /**
   * 
   */
  public formOrden: FormGroup;
  /**
   * 
   */
  public submitted = false;

  public ordenInexistente: boolean;
  /**
   * 
   */
  public mensajeOrden: any;
  /**
   * 
   */
  public ordenResponse: any;

  retomaOrden: any;
  tipoEjecucion: any;


  /**
   * 
   * @param router 
   * @param ejecucionAtencionService 
   * @param formBuilder 
   * @param global 
   */
  constructor(private router: Router,
    private ejecucionAtencionService: EjecucionAtencionService,
    private formBuilder: FormBuilder,
    private global: AppGlobals) {
    this.componentFlujo = false;
    this.componentCategoria = false;
    this.ordenInexistente = false;
    this.URL = this.global.url;
    localStorage.setItem('dataFlujoOrden', '');
    this.router.events.subscribe((event: Event) => {
    });
    this.formOrden = this.formBuilder.group({
      param: ['', Validators.required],
      orden: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  get f() {
    return this.formOrden.controls;
  }

  parametroSeleccion($event) {
    debugger
    this.param = this.formOrden.value.param;
    this.ordenInexistente = false;
  }

  ingresoOrden($event) {
    if (this.formOrden.invalid) {
      this.submitted = true;
      return;
    } else {
      this.orden = this.formOrden.value.orden;
      //validacion orden con atencion 
      if (this.retomaOrden) {

        let url = this.URL + 'integracion/apolo/toa/' + this.param + '/' + this.orden;
        return this.ejecucionAtencionService.getData(url).toPromise().then(data => {
          console.log(data + ' imprecion data')
          let info: any = data;
          info = info.responseToa;
          return info;
        }).then(data => {
          this.ordenResponse = data;
          this.ordenResponse.retoma = data.retoma;
          localStorage.setItem('dataFlujoOrden', JSON.stringify(this.ordenResponse));
          this.enrutamientoFlujo();
        })

      } else {
        this.validacionOrden();
      }
    }
  }


  validacionOrden() {
    this.tipoEjecucion='orden';
    let url = this.URL + 'integracion/apolo/toa/' + this.param + '/' + this.orden + '/' + this.tipoEjecucion;
    return this.ejecucionAtencionService.getData(url).toPromise().then(data => {
      console.log(data + ' imprecion data')
      let info: any = data;
      info = info.responseToa;
      return info;
    }).then(data => {
      this.ordenResponse = data;
      this.ordenResponse.formOrden = this.formOrden.value;
      if (this.ordenResponse.status) {
        if (this.ordenResponse.status === 'started') {
          localStorage.setItem('dataFlujoOrden', JSON.stringify(this.ordenResponse));
          this.enrutamientoHome();
        } else {
          this.mensajeOrden = this.global.mensajeOrdenNoIniciada;
          this.ordenInexistente = true;
        }
      } else {
        this.mensajeOrden = this.global.mensajeOrdenNoExiste;
        this.ordenInexistente = true;
      }
    })

  }

  enrutamientoHome() {
    this.router.navigate(['home/componet']);
    return false;
  }

  enrutamientoFlujo() {
    this.router.navigate(['flujo/list']);
    return false;
  }



  // onButoonTap():void{
  //   Image
  //   camera.requestCameraPermissions().then(


  //   );
  // }

}
