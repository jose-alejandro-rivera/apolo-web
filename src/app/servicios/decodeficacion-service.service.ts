import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DecodeficacionServiceService {

  constructor(private http: HttpClient) { }
  decodificacionParametro(parametro){
      return this.http.post('http://localhost:8080/api/decodeficacion/parametro', {data: parametro});
  }
}
