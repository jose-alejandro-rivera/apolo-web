
import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistroFotograficoService {

  constructor(@Optional() private http: HttpClient) { }

  /**
   * Función que envía los datos a la api por metodo post para ser almacenada
   * @param url url del servicio
   * @param body Datos que se envian
   */
  postRegistroFotografico(url, body){
    return this.http.post(url, body);
  }


  /**
   * Función que envía los datos a la api por metodo pastch para ser modificada
   * @param url url del servicio
   * @param body Datos que se envian
   */
  pastchRegistroFotografico(url, body){
    return this.http.patch(url,body);
  }


}
