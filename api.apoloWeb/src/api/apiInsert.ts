
import { Inject, Container } from "typescript-ioc";
import { Router } from 'express';
/**
 * constantes de coneccion 
 */
const express = require('express'),
  cors = require('cors'),//**** */
  bodyParser = require('body-parser'),//**** */
  http = require('http'),//
  request = require("request"),
  axios = require("axios");//

// Express settings
/**
 * constantes de coneccion 
 */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
/**
 * clase de insercion en la base de datos
 */
export class ApiInsert {

  constructor(
    router: Router) {
  }
  /**
   * funcion que crea la atencion
   * @param params 
   */
  async  postCrearAtencion(params: any) {
    try {
      var url = "http://localhost:3000/api/atencion/create";
      let res = await axios.post(url, params);
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion de prueba
   */
  async postConsumirProceso(body) {
    try {
      var url = "http://localhost:3000/api/proceso/fake";
      let res = await axios.post(url, body);
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion que crea la funcion
   */
  async postAtencionPaso(data) {
    try {
      var url = "http://localhost:3000/api/atencion-paso-campo/create";
      let res = await axios.post(url, data);
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }

}