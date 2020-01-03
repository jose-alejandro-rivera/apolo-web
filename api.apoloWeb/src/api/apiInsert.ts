import { Router } from 'express';
import { cors } from 'cors';
/*
 * constantes de coneccion 
 */
const bodyParser = require('body-parser'),axios = require("axios");

// Express settings
/**
 * constantes de coneccion 
 */
const app = require('express')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
/**
 * clase de insercion en la base de datos
 */
export class ApiInsert {
  private res : any;
  private url: any;
    constructor(
    router: Router) {
      this.res = null;
      this.url = null;
  }

 
  /**
   * funcion que crea la atencion
   * @param params 
   */
  async  postCrearAtencion(params: any) {
    try {
      this.url = "http://10.203.221.51:3000/api/atencion/create";
      this.res = await axios.post(this.url, params);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion de prueba
   */
  async postConsumirProceso(body) {
    try {
      this.url = "http://10.203.221.51:3000/api/proceso/fake";
      this.res = await axios.post(this.url, body);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion que crea la funcion
   */
  async postAtencionPaso(data) {
    try {
      this.url = "http://10.203.221.51:3000/api/atencion-paso-campo/create";
      this.res = await axios.post(this.url, data);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }

}