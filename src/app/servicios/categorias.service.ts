import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/* Consume el servicio que carga las categorias */
export class CategoriasService {
  localUrl = 'http://localhost:3000/api/flujo/categorias';
  crearCatUrl = '';
  constructor(private http: HttpClient) { }

  getCategorias() {
    return this.http.get(this.localUrl);
  }

  crearAtencion(datosCatFlu){
    return this.http.post(this.crearCatUrl, datosCatFlu);
  }

  testBackEnd(url){
    let res = this.http.get(url);
    console.log(res);
    return res;
  }
  
}

