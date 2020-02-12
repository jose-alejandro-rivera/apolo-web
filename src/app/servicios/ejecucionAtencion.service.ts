import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
/**
 * injeccion de componente root
 */
@Injectable({
  providedIn: 'root'
})

/**
 * Consume el servicios asociados al registro y  flujo de una atencion
 */
export class EjecucionAtencionService {
  /**
   * variable que identifica el id de la atencion
   */
  idAtencion: number;
  /**
   * variable de iteracion de informacion del flujo
   */
  info: any;

  /**
   * variables de secion 
   * @param http 
   */
  constructor(@Optional() private http: HttpClient) { }

  /**
   * funcion para traer la informacion de la api
   * @param url url del servicio
   */
  getData(url){
    console.log(this.http)
    return this.http.get(url);
  }

  /**
   * funcion que realiza el envio de infomacion a la api 
   * @param url url del servicio
   * @param body informacion a enviar al api
   */
  postData(url, body){
    return this.http.post(url,body);
  }

  /**
   * funcion que realiza la iteracion del idAtencion
   * @param id. id de la atencion a iterar 
   */
  saveIdAtencion(id:number){
    this.idAtencion = id;
  }

  /**
   * 
   * @param data 
   */
  saveInfoFlujo(data){
    this.info = data[0].Flujo[0];
  }

} 
