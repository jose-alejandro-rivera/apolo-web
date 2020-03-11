import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

/* Consume el servicio que carga las categorias */
export class CategoriasService {
  crearCatUrl = '';
  constructor(private http: HttpClient) { }

  crearAtencion(datosCatFlu){
    return this.http.post(this.crearCatUrl, datosCatFlu);
  }

  getData(url){
    return this.http.get(url);
  }

} 
