import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly url: string = 'http://localhost:8080/api/';
    readonly mensajeCampoObligatorio: string = 'Debe seleccionar los puntos anteriores';
    readonly mensajeCampoDecision: string = 'Debe seleccionar el punto anterior';
    
}