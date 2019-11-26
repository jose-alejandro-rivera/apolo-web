import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/* Consume el servicios asociados al registro y  flujo de una atencion */
export class EjecucionAtencionService {
  idAtencion: number;

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

} 
