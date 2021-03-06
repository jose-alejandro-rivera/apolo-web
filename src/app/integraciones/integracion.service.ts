import EnvioIntegracion from './envioIntegracion.service';
import { Component, OnInit, Optional, Injectable, Inject } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class Integracion {

    Integaciones: any;
    dataFlujoCat: any;
    dataFlujoOrden: any;
    dataProces: any;
    private envioIntegracion: EnvioIntegracion;
    private mensajesApolo: any;

    constructor(
        @Inject(EnvioIntegracion) envioIntegracion: EnvioIntegracion) {
        this.envioIntegracion = envioIntegracion;
    }

    ngOnInit() {
    }

    async proces(parametrosIntegracion, urlApi) {
        this.mensajesIntegraciones();
        switch (parametrosIntegracion.sigla) {
            case 'AutoBA':
                {
                    let url = urlApi + 'autoconfiguracion/rest/' + parametrosIntegracion.parametros.ordenAtivity + '/BA';
                    console.log(this.envioIntegracion)
                    this.dataProces = await this.envioIntegracion.ejecutarProceso(url);

                    if (this.dataProces.response.statusOrden == 'no_encontrada') {
                        this.dataProces.llavePropiedad = 'NOOK'
                        this.dataProces.mensajeError = this.mensajesApolo.mensajeAutoconfigBA;
                    } else if (this.dataProces.response.propiedad_value === 'A_ACS_RESULT_CODE') {
                        if (this.dataProces.response.propiedad_key === 'OK') {
                            this.dataProces.llavePropiedad = this.dataProces.response.propiedad_key;
                        } else {
                            this.dataProces.llavePropiedad = 'NOOK'
                            this.dataProces.mensajeError = this.mensajesApolo.mensajeAutoconfigBA;
                        }
                    } else {
                        this.dataProces.llavePropiedad = 'NOOK'
                        this.dataProces.mensajeError = this.mensajesApolo.mensajeAutoconfigBA;
                    }
                    return this.dataProces;
                    break;
                }
            case 'ActiTV':
                {
                    let url = urlApi + 'autoconfiguracion/rest/' + parametrosIntegracion.parametros.ordenAtivity + '/TV';
                    console.log(this.envioIntegracion)
                    this.dataProces = await this.envioIntegracion.ejecutarProceso(url);
                    if (this.dataProces.response.statusOrden == 'no_encontrada') {
                        this.dataProces.llavePropiedad = 'NOOK'
                        this.dataProces.mensajeError = this.mensajesApolo.mensajeActivacionTV;
                    } else if (this.dataProces.response.propiedad_value === 'A_HC_RESULT_CODE') {
                        if (this.dataProces.response.propiedad_key === 'OK') {
                            this.dataProces.llavePropiedad = this.dataProces.response.propiedad_key;
                        } else {
                            this.dataProces.llavePropiedad = 'NOOK'
                            this.dataProces.mensajeError = this.mensajesApolo.mensajeActivacionTV;
                        }
                    } else {

                        this.dataProces = {
                            "response": {
                                "TipoServicio": '',
                                "Servicio": '',
                                "Request": '',
                                "Response": '',
                            },
                            "llavePropiedad": 'NOOK'
                        }
                        this.dataProces.mensajeError = this.mensajesApolo.mensajeActivacionTV;
                    }
                    return this.dataProces;
                    break;
                }
            case 'VOSTOA':
                {
                    //let url =  urlApi + 'api/certificacion/servicio/validarar/tipo_orden/' ;
                    let url =  urlApi + 'certificacion/servicio/validarar/tipo_orden/'+parametrosIntegracion.parametros.ordenAtivity;
                    //let url = urlApi + 'autoconfiguracion/rest/' + parametrosIntegracion.parametros.ordenAtivity + '/TV';
                    this.dataProces = await this.envioIntegracion.ejecutarProceso(url);
                    if (this.dataProces.result == 'encontrada') {
                        if(this.dataProces.A_TOOLBOX_RESULT_VOZ_COD === 'OK' && this.dataProces.A_ASISTEC_RESULT_CODE === 'OK' && this.dataProces.A_TOOLBOX_RESULT_TV_COD === 'OK'){
                           console.log('consulta ok');
                            this.dataProces.llavePropiedad = 'OK';
                        }else{
                           this.dataProces.llavePropiedad = 'NOK';
                           console.log('consulta nok');
                        }
                    } else {
                        this.dataProces = {
                            "response": {
                                "TipoServicio": '',
                                "Servicio": '',
                                "Request": '',
                                "Response": '',
                            },
                            "llavePropiedad": 'NOOK'
                        }
                    }
                    return this.dataProces;
                }

            default:
                {
                    this.dataProces = {
                        "response": {
                            "TipoServicio": '',
                            "Servicio": '',
                            "Request": '',
                            "Response": '',
                        },
                        "llavePropiedad": 'undefine'
                    }
                    this.dataProces.mensajeError = this.mensajesApolo.mensajeProcesNotFound;
                    return this.dataProces;
                    break;
                }

        }

    }
    mensajesIntegraciones() {
        this.mensajesApolo = {
            mensajeProcesNotFound: ' El proceso de encuentra sin integración',
            mensajeAutoconfigBA: ' Debes asegurar que la autoconfiguración de BA sea correcta en TOA. Por favor valida y asegura el resultado en TOA.',
            mensajeActivacionTV: ' Debes asegurar que la activación de TV sea correcta en TOA. Por favor valida y asegura el resultado en TOA'
        }
    }


}