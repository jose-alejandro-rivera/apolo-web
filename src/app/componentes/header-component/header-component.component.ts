import { Component, OnInit } from '@angular/core';
import { DecodeficacionServiceService } from '../../servicios/decodeficacion-service.service';
import { AppGlobals } from 'src/app/app.global';
import { Event, Router, ActivatedRoute } from '@angular/router';


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
  accesoDenegado : boolean;

  /**
  * variables de secion
  * @param router 
  */
  constructor(private decodeficacionServiceService: DecodeficacionServiceService,
    private global: AppGlobals,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.userview = this.global.usuarioView;
    this.admin = (this.userview != '') ? true : false;
  }

  //QVFWa3llR2hrYlZaVVkwZEdlV1JIUm5WamVWRjVUVVJKZDAxNldUMD0=

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.parametroChat = params;
      console.log('Parametro recibido ----', params);
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
    const day = ((date.getDay() + 1) < 10) ? '0' + (date.getDay() + 1) : (date.getDay());
    key = key.concat(date.getFullYear() + '' + month + '' + '' + day);
    key = btoa(key);
    for (let index = 0; index < 2; index++) {
      key = btoa(this.getRdnInteger().concat(key));
    }
    this.parametroDecodificado = key;
    console.log('this.parametroDecodificad --->', this.parametroDecodificado);


  }

  public getRdnInteger(): string {
    const limitSuperior = 90;
    const limitInferior = 65;
    const number = Math.floor(Math.random() * (limitSuperior - limitInferior)) + limitInferior;
    return String.fromCharCode(number);
  }

  private async getDataTokenize() {
 
    this.decodeficacionServiceService.decodificacionParametro(this.parametroChat.parametro).subscribe((data: any) => {
      console.log('dataaa--- ', data.parametro);
      let key: any;
      const date = new Date();
      const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      const day = ((date.getDay() + 1) < 10) ? '0' + (date.getDay() + 1) : (date.getDay() + 1);
      key = date.getFullYear() + '' + month + '' + '' + day;
      let parametro = String(data.parametro).split('_');
      console.log('parametro ', parametro[2], '+++++ ' +key);
      if (parametro[2] == key) {
        this.router.navigate(['home/orden']);
      } else {
        this.router.navigate(['autorizado/denegado']);
        this.accesoDenegado = false;
      }
      console.log('data ---+>> ', parametro[2]);
    });

  }

}
