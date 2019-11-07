import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlujoService {
  urlFlujo = 'http://localhost:3000/api//flujos/por/categorias/1';
  constructor(private http: HttpClient) { }

  getFlujos() {
    return this.http.get(this.urlFlujo);
  }
}
