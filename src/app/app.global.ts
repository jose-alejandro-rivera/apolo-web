import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
        public url: string
        public usuarioView: any;
     
    //readonly url: string = 'http://localhost:8080/api/';
    readonly mensajeCampoObligatorio: string = ' Debe seleccionar los puntos anteriores';
    readonly mensajeCampoDecision: string = ' Debe seleccionar el punto anterior';
    readonly mensajeOrdenNoIniciada: string= ' La orden no se encuentra en estado iniciada, por favor inicia la orden e intenta de nuevo.';
    readonly mensajeOrdenNoExiste: string= ' La orden indicada no existe en TOA o se ha relacionado mal el parámetro de búsqueda.';
    readonly mensajeAutoconfigBA: string=' Debes asegurar que la autoconfiguración de BA sea correcta en TOA. Por favor valida y asegura el resultado en TOA.';
    readonly mensajeProcesNotFound: string=' El proceso se encuentra sin integracion';
    
    constructor(){
        this.usuarioView = '';
        this.validateIP()
        //this.validateIP()
    }
    public validateIP() {

        let urlIp = document.location.href
        //readonly url: string = 'http://localhost:8080/api/';
        if(urlIp.indexOf("http://localhost:4200/") > -1){
            this.url ='http://localhost:8080/api/'
        }
        if(urlIp.indexOf("https://10.203.217.36") > -1){
            this.url ='https://10.203.217.36:20203/api/'
        }
        if(urlIp.indexOf("http://10.203.221.51") > -1){
            this.url ='http://10.203.221.51:8080/api/'
        }
        if(urlIp.indexOf("http://10.203.220.30") > -1){
            this.url ='http://10.203.220.30:8080/api/'
        }
        if(urlIp.indexOf("https://apilab.telefonica.co") > -1){
            this.url ='"https://apilab.telefonica.co:20203/data/api/'
        }
    }


    
   getCleanedString(cadena){
    // Definimos los caracteres que queremos eliminar
    var specialChars = "!@#$^&%*()+=-[]\/{}|:<>?,.";
    // se eliminan los caracteres especiales
    for (var i = 0; i < specialChars.length; i++) {
        cadena= cadena.replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }   
    // cambiar cadena en minusculas
    cadena = cadena.toLowerCase();
    // Quitamos espacios y los sustituimos por _ para validar caracter por caracter
    cadena = cadena.replace(/ /g,"_");
    // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
    cadena = cadena.replace(/á/gi,"a");
    cadena = cadena.replace(/é/gi,"e");
    cadena = cadena.replace(/í/gi,"i");
    cadena = cadena.replace(/ó/gi,"o");
    cadena = cadena.replace(/ú/gi,"u");
    cadena = cadena.replace(/ñ/gi,"n");
    return cadena;
 }
    
}