import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy, ɵConsole, Optional,Injectable, Inject } from '@angular/core';
import { EjecucionAtencionService } from '../servicios/ejecucionAtencion.service';

@Injectable({
    providedIn: 'root'
})
export default class EnvioIntegracion implements OnInit {
    Integaciones: any;
    URL: any;
    dataFlujoCat: any;
    dataFlujoOrden: any;
    dataProces: any;
     private atencionService: EjecucionAtencionService
  
    constructor( 
        @Inject(EjecucionAtencionService) atencionService:EjecucionAtencionService)
     {
        this.atencionService = atencionService;
    }

    ngOnInit() {
    }

    ejecutarProceso(parametrosProceso) {
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


    updateProces(url,param){
        return this.atencionService.pastchData(url,param)
        .toPromise().then(data => {
            let info = data;
            return info;
        }).then(data => {
            this.dataProces = data;
                console.log(data);
            return this.dataProces;
        });

    }


}