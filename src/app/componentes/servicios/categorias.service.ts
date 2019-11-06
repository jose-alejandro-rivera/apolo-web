import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  localUrl = 'http://localhost:3000/api/flujo/categorias';
  constructor(private http: HttpClient) { }

  getCategorias() {
    return this.http.get(this.localUrl);
  }
}

