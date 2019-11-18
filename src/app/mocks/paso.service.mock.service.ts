import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PasoMockService {

  pasosUrl = 'http://localhost:3000/api//flujo/list/';
  constructor(private http: HttpClient) {   }

  getPasos(id) {
    return this.http.get(this.pasosUrl+id);
  }
}
 