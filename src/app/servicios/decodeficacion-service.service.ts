import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DecodeficacionServiceService {

  constructor(@Optional() private http: HttpClient) { }
  public decodificacionParametro(parametro){
    console.log('0parametro ', parametro);
      return this.http.post('http://localhost:8080/api/decodeficacion/parametro', {data: parametro});
  }
}
