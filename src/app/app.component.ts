import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { DecodeficacionServiceService } from './servicios/decodeficacion-service.service'


/**
 * componente inicial
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppGlobals]
})
/**
 * clase que relaciona los componentes creados para la aplicacion web
 */
export class AppComponent {
  componentFlujo: boolean;
  componentCategoria: boolean;
  title = 'apolo-web';
  homeAtencion: any;
  atencionComponet: any;
  ordenComponente: any;
  //parametroDecodificado: any;
  userview: any;
  admin: Boolean;
  name: any;
  //parametroChat:any
 

  /**
   * variables de secion
   * @param router 
   */
  constructor(private router: Router,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    //private decodeficacionServiceService: DecodeficacionServiceService,
    private global: AppGlobals) {
    this.componentFlujo = false;
    this.componentCategoria = false;
    this.userview = this.global.usuarioView;
    this.admin = (this.userview != '') ? true : false;
  /*  this.router.events.subscribe((event: Event) => {
      console.log(event,'events')
    }); */
  }
  /**
   * funcion que itera los componentes
   */
  async ngOnInit() {
   /* this._activatedRoute.params.subscribe(params =>{
      //this.parametroChat = params
      console.log('Parametro recibido ----', params)
    }) */
    //await this.encriptado();
    //await this.getDataTokenize();
    localStorage.setItem('home_component', '');
    localStorage.setItem('atencion_component', '');
    localStorage.setItem('orden_componet', '');

    this.homeAtencion = localStorage.getItem('home_component');
    this.atencionComponet = localStorage.getItem('atencion_component');
    this.ordenComponente = localStorage.getItem('orden_componet');


    this.enrutamiento();
  }

  enrutamiento() {
    // this.router.navigate(['autorizado/no']);
    return false;

  }

  /*
  async encriptado() {
    // traer la clave
    let key = 'claveSpartans_';
    const date = new Date();
    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = ((date.getDay() + 1) < 10) ? '12' + (date.getDay() + 1) : (date.getDay() + 1);
    key = key.concat(date.getFullYear() + '' + month + '' + '' + day);
    key = btoa(key);
    for (let index = 0; index < 2; index++) {
      key = btoa(this.getRdnInteger().concat(key));
    }
    console.log('------',key)
    this.parametroDecodificado = key;

  }

  public getRdnInteger(): string {
    const limitSuperior = 90;
    const limitInferior = 65;
    const number = Math.floor(Math.random() * (limitSuperior - limitInferior)) + limitInferior;
    return String.fromCharCode(number);
  }

  private async getDataTokenize() {
    console.log(this.parametroChat,'lllllllllllllllll')
    this.decodeficacionServiceService.decodificacionParametro(this.parametroDecodificado).subscribe((data: any) => {
      let key : any;
      const date = new Date();
      const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      const day = ((date.getDay() + 1) < 10) ? '0' + (date.getDay() + 1) : (date.getDay() + 1);
      key = date.getFullYear() + '' + month + '' + '' + day;
      let parametro = String(data.parametro).split('_');
      console.log('parametro ----->>>', parametro, ' ' + key);
      if(parametro[1] == key){
        this.router.navigate(['home/orden']);
      }else{
        this.router.navigate(['autorizado/denegado']);
        //this.router.navigate(['index']);
      }
      console.log('data ---+>> ', data);
    });

  } */
}





