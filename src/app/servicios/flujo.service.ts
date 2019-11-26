import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/* Consume el servicio que carga los flujos */
export class FlujoService {
  urlFlujo = 'http://localhost:3000/api//flujos/por/categorias/';
  constructor(private http: HttpClient) { }

  getFlujos(id) {
    return this.http.get(this.urlFlujo+id);
  }
}
