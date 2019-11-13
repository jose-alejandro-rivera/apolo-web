import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/* Consume el servicio de los pasos */
export class PasoService {
  pasosUrl = 'http://localhost:3000/api//flujo/list/';
  constructor(private http: HttpClient) { }

  getPasos(id) {
    return this.http.get(this.pasosUrl+id);
  }
}
