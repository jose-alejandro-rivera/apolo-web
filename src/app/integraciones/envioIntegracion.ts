import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy, ɵConsole, Optional,Injectable } from '@angular/core';
import { IServiceResponse } from '../interfaces/serviceResponse';
import { Router, RouterStateSnapshot } from '@angular/router';
import { IRecordResponse } from '../interfaces/recordResponse';
import { EjecucionAtencionService } from '../servicios/ejecucionAtencion.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
@Component({
    providers: [EjecucionAtencionService,]
})
export default class EnvioIntegracion implements OnInit {
    Integaciones: any;
    URL: any;
    dataFlujoCat: any;
    dataFlujoOrden: any;
    dataProces: any;
  
    constructor( @Optional()
        private atencionService: EjecucionAtencionService
    ) {

    }

    ngOnInit() {
    }

    ejecutarProceso(parametrosProceso) {
        debugger

        return this.atencionService.getData(parametrosProceso)
        .toPromise().then(data => {
            let info = data;
            return info;
        }).then(data => {
            this.dataProces = data;
                console.log(data);
            return this.dataProces;
        });
    }


    insertProces(){
        console.log('prueba insert procesos')
    }


}