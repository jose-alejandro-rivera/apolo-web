import { ApiConsult } from './api/apiConsult';
import { ApiInsert } from './api/apiInsert';
import { ServicePasoMock } from '../unitTest/mocks/service.pasoMocks';
import { Inject, Container } from "typescript-ioc";
import { Express } from 'express';
import { async } from '@angular/core/testing';

/**
 * constantes de coneccion 
 */
const
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  Http = require('http'),
  request = require("request"),
  axios = require("axios");
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
 * contate que obtiene el puesto de visualizacion
 */
const PORT = process.env.PORT || 8080;
/**
 * validacion de coneccion
 */
const server = app.listen(PORT, () => {
  console.log('Connected to port ' + PORT)
});
/**
 * clase de inicializacion de los servidores
 */
export class Server {
  /**
   * variable que contiene las funciones de consulta 
   */
  apiConsult: ApiConsult = Container.get(ApiConsult);
  /**
   * variable que contiene las funciones de insercion
   */
  apiInsert: ApiInsert = Container.get(ApiInsert);
  /**
   * variable que contine los mocks para pruebas unitarias
   */
  serviceMocks: ServicePasoMock = Container.get(ServicePasoMock);
  public data: any;

  constructor() {
    this.router();
  }
  /**
   * contenedor de los servicios expuestos
   */
  router(): void {

    //parametros de consulta
    /**
     * funcion de validacion de prueba a la coneccion
     */
    app.get('/api/testConnection', function (req, res) {
      console.log('usted esta aqui')
      return res.status(200).json('testConnection OK');
    });

    /**
     * funcion que obtiene el listado de las categorias
     */
    app.get('/api/flujo/categorias', async (request, response) => {
      this.data = await this.apiConsult.getCategoriasFlujo();
      if (!this.data){
        console.log('usted esta aqui')
        this.data = await this.serviceMocks.categoriasData;
      }
      return response.send(this.data);
    });

    /**
     * funcion que obtiene el listado de los flujos asociado a la categoria seleccionada
     */
    app.get('/api/flujos/por/categorias/:id', async (request, response) => {
      const data = await this.apiConsult.getFlujoPorCategoria(request.params.id);
      return response.send(data);
    });
    /**
     * funcion que obtiene el listado de componentes del flujo 
     */
    app.get('/api/flujo/list/:id', async (request, response) => {
      const data = await this.apiConsult.getPasosCategoria(request.params.id);
      return response.send(data);
    });

    //parametros de insercion
    /**
     * funcion que realiza la cracion de la atencion
     */
    app.post('/api/atencion/create/', async (request, response) => {
      console.log('crear atencion')
      const data = await this.apiInsert.postCrearAtencion(request.body);
      return response.send(data);
    });
    /**
     * funcion rueba
     */
    app.post('/api/proceso/fake', async (request, response) => {
      const data = await this.apiInsert.postConsumirProceso(request.body);
      return response.send(data);
    });

    /**
     * funcion que registra el paso a paso ejecutado por el usuario
     */
    app.post('/api/atencion-paso-campo/create', async (request, response) => {
      const data = await this.apiInsert.postAtencionPaso(request.body);
      return response.send(data);
    });


    //---------------------tests-------------------

    app.get('/api/testCategoria', async (request, response) => {
      console.log('usted esta aqui')
      const data = await this.serviceMocks.categoriasData;
      return  response.send(data);
    });

    app.get('/api/testListFlujos', async (request, response) => {
      console.log('usted esta aqui')
      const data = await this.serviceMocks.FlujosCategoriaData;
      return  response.send(data);
    });

    app.get('/api/testPasosFlujo', async (request, response) => {
      console.log('usted esta aqui')
      const data = await this.serviceMocks.FlujoData;
      return  response.send(data);
    });



  }


}
/**
 * variable que inicialilza el server
 */
let serverApi = new Server();


