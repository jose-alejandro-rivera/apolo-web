import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    readonly url: string = 'http://localhost:8080/api/';
    readonly mensajeCampoObligatorio: string = 'Debe diligenciar el cuestionario, con respuesta positiva';
    readonly mensajeCampoDecision: string = 'Debe diligenciar el cuestionario, con una respuesta ';
    
}