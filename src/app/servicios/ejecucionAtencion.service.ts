import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/* Consume el servicios asociados al registro y  flujo de una atencion */
export class EjecucionAtencionService {
  idAtencion: number;
  info: any;

  constructor(private http: HttpClient) { }

  getData(url){
    return this.http.get(url);
  }

  postData(url, body){
    return this.http.post(url,body);
  }

  saveIdAtencion(id:number){
    this.idAtencion = id;
  }

  saveInfoFlujo(data){
    this.info = data[0].Flujo[0];
    console.log(this.info);
  }

} 
