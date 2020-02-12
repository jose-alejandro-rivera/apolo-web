import EnvioIntegracion from './envioIntegracion';
import { Component, OnInit, Optional } from '@angular/core';
import { EjecucionAtencionService } from '../servicios/ejecucionAtencion.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';

@Component({
    providers: [AppGlobals]
})
export class Integracion {

    Integaciones: any;
    URL: any;
    dataFlujoCat: any;
    dataFlujoOrden: any;
    dataProces: any;

    constructor(@Optional()
    private enivoIntegracion: EnvioIntegracion,
        private atencionService: EjecucionAtencionService,
        private router: Router,
        private global: AppGlobals
    ) {
        this.URL = this.global.url;
    }

    ngOnInit() {
    }

    async proces(parametrosIntegracion) {
        debugger

        switch (parametrosIntegracion.sigla) {
            case 'VSBA':
                {
                    let url = this.URL + 'autoconfiguracion/rest/' + parametrosIntegracion.parametros.orden + '/BA';
                    console.log(this.enivoIntegracion)
                    this.dataProces = await this.enivoIntegracion.ejecutarProceso(url);

                    if (this.dataProces.response.statusOrden == 'no_encontrada') {
                        this.dataProces.llavePropiedad = 'NOOK'
                        this.dataProces.mensajeError = this.global.mensajeAutoconfigBA;
                    } else if (this.dataProces.response.propiedad_value === 'A_ACS_RESULT_CODE') {
                        if (this.dataProces.response.propiedad_key === 'OK') {
                            this.dataProces.llavePropiedad = this.dataProces.response.propiedad_key;
                        }
                    } else {
                        this.dataProces.llavePropiedad = 'NOOK'
                        this.dataProces.mensajeError = this.global.mensajeAutoconfigBA;
                    }
                    return this.dataProces;
                    break;
                }
            case 'ATV':
                {
                    let url = this.URL + 'autoconfiguracion/rest/' + parametrosIntegracion.parametros.orden + '/TV';
                    console.log(this.enivoIntegracion)
                    this.dataProces = await this.enivoIntegracion.ejecutarProceso(url);
                    if (this.dataProces.response.statusOrden == 'no_encontrada') {
                        this.dataProces.llavePropiedad = 'NOOK'
                        this.dataProces.mensajeError = this.global.mensajeAutoconfigBA;
                    } else if (this.dataProces.response.propiedad_value === 'A_HC_RESULT_CODE') {
                        if (this.dataProces.response.propiedad_key === 'OK') {
                            this.dataProces.llavePropiedad = this.dataProces.response.propiedad_key;
                        }
                    } else {
                        this.dataProces.llavePropiedad = 'NOOK'
                        this.dataProces.mensajeError = this.global.mensajeAutoconfigBA;
                    }
                    return this.dataProces;
                    break;
                }
            default:
                {
                    this.dataProces = {
                        "llavePropiedad": 'undefine'
                    }
                    this.dataProces.mensajeError = this.global.mensajeProcesNotFound;
                    return this.dataProces;
                    break;
                }

        }

    }


}