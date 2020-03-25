
import { Component, OnInit, NgModule } from '@angular/core';
import { AppGlobals } from 'src/app/app.global';


@Component({
  selector: 'app-integracion-hada',
  templateUrl: './integracion-hada.component.html',
  styleUrls: ['./integracion-hada.component.css']
})
export class IntegracionHadaComponent {

  private URL: any;
  private url: any;

  constructor(
    private global: AppGlobals
  ) {
    
    this.URL = this.global.url;
   }

  ngOnInit() {
  }

  public validaCertificacionHada(activityId:any){
    console.log('validaCertificacionHada ---- >>> integracion ', activityId);
    //this.url =  `${this.URL}api/certificacion/servicio/validarar/tipo_orden/${this.numOrdenFoto}`;

    //this.url =  `${this.URL}registro/fotografico/`;
    let integracionhada:any = 'NOK';
    return integracionhada;
  }

}
