import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
    public url: string
    public usuarioView: any;
    public mensajesApolo: any;
    public mensajeOk: Boolean;

    //readonly url: string = 'http://localhost:8080/api/';
    readonly mensajeCampoObligatorio: string = ' Por favor, seleccione los campos requeridos';
    readonly mensajeCampoDecision: string = ' Por favor, seleccione una de las opciones';
    readonly mensajeOrdenNoIniciada: string = ' La orden no< se encuentra en estado iniciada, por favor inicia la orden e intenta de nuevo.';
    readonly mensajeOrdenNoExiste: string = ' La orden indicada no existe en TOA o se ha relacionado mal el parámetro de búsqueda.';
    readonly mesnajeConfirmacionActividad: string = ' Actividad terminada exitosamente.';
    readonly mensajeNoFinaliza: string = ' No se finalizo exitosamente.';
    readonly mensajeProcesNotFound: string = ' El proceso se encuentra sin integración';
    readonly mensajeRetomaFound: string = ' La orden ya se encuentra con un proceso, selecciona el botón de retoma';
    readonly mensajeCargaFoto: string = ' Para continuar con el flujo debe tomar una foto reflejando lo indicado en la actividad.';



    constructor() {
        this.usuarioView = '';
        this.mensajeOk = false;
        this.validateIP();

    }
    public validateIP() {

        let urlIp = document.location.href
        //readonly url: string = 'http://localhost:8080/api/';
        if (urlIp.indexOf("http://localhost:4200/") > -1) {
            this.url = 'http://localhost:8080/api/'
        }
        if (urlIp.indexOf("https://10.203.217.36") > -1) {
            this.url = 'https://10.203.217.36:20203/api/'
        }
        if (urlIp.indexOf("http://10.203.221.51") > -1) {
            this.url = 'http://10.203.221.51:8080/api/'
        }
        if (urlIp.indexOf("http://10.203.220.30") > -1) {
            this.url = 'http://10.203.220.30:8080/api/'
        }
        if (urlIp.indexOf("https://apilab.telefonica.co") > -1) {
            this.url = '"https://apilab.telefonica.co:20203/data/api/'
        }
    }



    getCleanedString(cadena) {
        // Definimos los caracteres que queremos eliminar
        var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
        // se eliminan los caracteres especiales
        for (var i = 0; i < specialChars.length; i++) {
            cadena = cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
        }
        // cambiar cadena en minusculas
        cadena = cadena.toLowerCase();
        // Quitamos espacios y los sustituimos por _ para validar caracter por caracter
        cadena = cadena.replace(/ /g, "_");
        // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
        cadena = cadena.replace(/á/gi, "a");
        cadena = cadena.replace(/é/gi, "e");
        cadena = cadena.replace(/í/gi, "i");
        cadena = cadena.replace(/ó/gi, "o");
        cadena = cadena.replace(/ú/gi, "u");
        cadena = cadena.replace(/ñ/gi, "n");
        return cadena;
    }



}