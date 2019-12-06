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
 * clase de consulta en la base de datos
 */
export class ApiConsult {

  constructor(
    router: Router) {
  }

  /**
   * funcion que consulta las categorias
   */
  async  getCategoriasFlujo() {
    try {
      let res = await axios.get('http://localhost:3000/api/flujo/categorias');
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion que consulta los flujos con el id de las categorias
   * @param id: id de la categoria a consultar 
   */
  async  getFlujoPorCategoria(id) {
    try {
      var url = "http://localhost:3000/api/flujos/por/categorias/" + id;
      let res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion que consulta los componentes del flujo
   * @param id: id del flujo a consultar
   */
  async  getPasosCategoria(id) {
    try {
      var url = "http://localhost:3000/api/flujo/list/" + id;
      let res = await axios.get(url);
      return res.data;
    } catch (error) {
      console.error(error)
    }
    /**
     * 
     */
    app.use(function (err, req, res, next) {
      console.error(err.message);
      if (!err.statusCode) err.statusCode = 500;
      res.status(err.statusCode).send(err.message);
    });

  }
}