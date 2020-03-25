
import { Injectable, Inject, Optional } from '@angular/core';
import { DecodeficacionServiceService } from '../servicios/decodeficacion-service.service';
import { AppGlobals } from 'src/app/app.global';
import { HttpClient } from '@angular/common/http';
import axios from "axios";


@Injectable({
  providedIn: 'root',
})

export class AccesoRutasSingleton {

  private static instance: AccesoRutasSingleton;
  private decodeficacionServiceService: DecodeficacionServiceService;
  private http: HttpClient;
  public acceso: boolean = false;
  private appGlobal: AppGlobals;

  private AccesoRutasSingleton() { }

  public static getInstance(): AccesoRutasSingleton {
    if (AccesoRutasSingleton.instance == null) {
      AccesoRutasSingleton.instance = new AccesoRutasSingleton();
    }
    return AccesoRutasSingleton.instance;
  }

  public async decodificiacionParametroSingleton(parametro) {
    let resultado = await this.decodificacionParametro(parametro.parametro);
    let dataparametro =  resultado.data.parametro;
     let key: any;
    const date = new Date();
    const month = ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    const day = ((date.getDate() + 1) < 10) ? '0' + (date.getDate()) : (date.getDate());
    //const day = ((date.getDay() + 1) < 10) ? '0' + (date.getDay() + 1) : (date.getDay() + 1);
    key = date.getFullYear() + '' + month + '' + '' + day;
    let paramObten = String(dataparametro).split('_');
    if(key == paramObten[2]){
       this.acceso = true; 
    }
  }



  public async instanciaResultado()  {
    let acceso = (this.acceso == true ) ? {caracter_valido : 'caracter_valido', data : null} : {caracter_valido : 'caracter_invalido', data : null}
  localStorage.setItem('recursos', JSON.stringify(acceso))    
  return this.acceso
}

private async decodificacionParametro(parametro){
this.appGlobal = new AppGlobals();
console.log('0parametro ', parametro);
//const res = await axios.post('http://localhost:8080/api/decodeficacion/parametro', { data: parametro });
const res = await axios.post(`${this.appGlobal.url}decodeficacion/parametro`, {data: parametro});
    return res;
  }
}

