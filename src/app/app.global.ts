import { Injectable } from '@angular/core';

@Injectable()
export class AppGlobals {
        public url: string
    //readonly url: string = 'http://localhost:8080/api/';
    readonly mensajeCampoObligatorio: string = 'Debe seleccionar los puntos anteriores';
    readonly mensajeCampoDecision: string = 'Debe seleccionar el punto anterior';

    constructor(){
        this.validateIP()
        //this.validateIP()
    }
    public validateIP() {
        let urlIp = document.location.href
        //readonly url: string = 'http://localhost:8080/api/';
        if(urlIp.indexOf("http://localhost:4200/") > -1){
            this.url ='http://localhost:8080/api/'
        }
        if(urlIp.indexOf("https://10.203.217.36:20203/") > -1){
            this.url ='https://10.203.217.36:20203/api/'
        }
        if(urlIp.indexOf("http://10.203.221.51") > -1){
            this.url ='http://10.203.221.51:8080/api/'
            console.log("usted se encuentra aca -- 1234")
        }
        if(urlIp.indexOf("http://10.203.220.30") > -1){
            this.url ='http://10.203.220.30:8080/api/'
            console.log("usted se encuentra aca -- 1234")
        }

        if(urlIp.indexOf("https://apilab.telefonica.co:20203/") > -1){
            this.url ='"https://apilab.telefonica.co:20203/api/'
        }
    }
    
}