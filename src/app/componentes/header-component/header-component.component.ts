import { Component, OnInit } from '@angular/core';
import { DecodeficacionServiceService } from '../../servicios/decodeficacion-service.service';
import { AppGlobals } from 'src/app/app.global';
import { Event, Router, ActivatedRoute } from '@angular/router';
import { AccesoRutasSingleton } from '../../singleton/AccesoRutasSingleton';


@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.css'],
  providers: [AppGlobals]
})
export class HeaderComponentComponent {

  userview: any;
  admin: Boolean;
  name: any;
  parametroDecodificado: any;
  parametroChat: any;
  accesoDenegado: boolean;


  /**
  * variables de secion
  * @param router 
  */
  constructor(
    private decodeficacionServiceService: DecodeficacionServiceService,
    // private accesoRutasSingleton : AccesoRutasSingleton,
    private global: AppGlobals,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.userview = this.global.usuarioView;
    this.admin = (this.userview != '') ? true : false;
    this.router.events.subscribe((event: Event) => {
    });
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.parametroChat = params;
    })
    this.enrutamiento();
    this.encriptado();
    this.getDataTokenize();
  }

  enrutamiento() {
    // this.router.navigate(['autorizado/no']);
    return false;

  }

  async encriptado() {
    // traer la clave
    let key = 'apolo_index_';
    const date = new Date();
    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = ((date.getDate() + 1) < 10) ? '0' + (date.getDate()) : (date.getDate());
   // const day = ((date.getDay() + 1) < 10) ? '0' + (date.getDay() + 1) : (date.getDay());
    key = key.concat(date.getFullYear() + '' + month + '' + '' + day);
    key = btoa(key);
    console.log('key ', key);
    for (let index = 0; index < 2; index++) {
      key = btoa(this.getRdnInteger().concat(key));
    }
    this.parametroDecodificado = key;
  }

  public getRdnInteger(): string {
    const limitSuperior = 90;
    const limitInferior = 65;
    const number = Math.floor(Math.random() * (limitSuperior - limitInferior)) + limitInferior;
    return String.fromCharCode(number);
  }

  async getDataTokenize() {
   console.log('--------------- ', this.parametroDecodificado);
    let parametro = AccesoRutasSingleton.getInstance();
    //this.accesoRutasSingleton.getInstance();
    await parametro.decodificiacionParametroSingleton(this.parametroChat);
    let valor = await parametro.instanciaResultado();
    if (valor == true) {
      this.router.navigate(['home/orden']);
      // return false;
    } else {
      this.router.navigate(['autorizado/denegado']);
      //return false;
    }
  }

}
