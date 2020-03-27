import { ApiConsult } from './api/apiConsult';
import { ApiInsert } from './api/apiInsert';
import { ServicePasoMock } from '../unitTest/mocks/service.pasoMocks';
import { Inject, Container } from "typescript-ioc";
import { ApiConsultProces } from './api/apiConsultProces';
import { ApiInsertProces } from './api/apiInsertProces';
import * as fs from 'fs';
import { async } from 'q';

/**
 * constantes de coneccion 
 */

let express = require('express');
let cors = require('cors');
let helmet = require('helmet');

const app: any = express();
let bodyParser = require('body-parser');
/*let hpp = require('hpp');


app.use(function(req, res, next) {
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('Content-Security-Policy', "frame-ancestors 'none'");
  next();
});

 app.use(helmet.frameguard());
 */
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//app.use(hpp()); // FIXED  
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

  apiConsult: ApiConsult = Container.get(ApiConsult);
  apiInsert: ApiInsert = Container.get(ApiInsert);
  apiConsultProces: ApiConsultProces = Container.get(ApiConsultProces);
  apiInsertProces: ApiInsertProces = Container.get(ApiInsertProces);
  serviceMocks: ServicePasoMock = Container.get(ServicePasoMock);

  public repositorioImg: any;
  public data: any;

  constructor() {
    this.router();
  }
  /**
   * contenedor de los servicios expuestos
   */
  router(): void {

    console.log('asociacionn axios');
    //parametros de consulta
    app.get('/api/testConnection', function (req, res, next) {
      return res.status(200).json('testConnection OK');
    });
    app.get('/api/atencion/lastStep/:id', async (request, response) => {
      const data = await this.apiConsult.getUltimoAtencionPaso(request.params.id);
      // return response.status(201).json({ 'status': 201, 'response': "informacion incompleta" });
      return response.status(200).json(data);
      // return response.send(data);
    });
    app.get('/api/flujo/categorias', async (request, response, next) => {
      const data = await this.apiConsult.getCategoriasFlujo();
      //return response.send(this.data);
      return response.status(200).json(data);
    });
    app.get('/api/flujos/por/Categorias/:id', async (request, response, next) => {
      const data = await this.apiConsult.getFlujoPorCategoria(request.params.id);
      //return response.send(data);
      return response.status(200).json(data);
    });
    app.get('/api/flujo/list/:id', async (request, response, next) => {
      const data = await this.apiConsult.getPasosCategoria(request.params.id);
      //return response.send(data);
      return response.status(200).json(data);
    });



    //parametros de insercion POS

    app.post('/api/testConnection', async function (req, res, next) {
      console.log('Si entraaaaa testConnection');
      return res.status(200).json('testConnection OK');
    });

    app.post('/api/atencion/create/', async (request, response, next) => {
      const data = await this.apiInsert.postCrearAtencion(request.body);
      //return response.send(data);
      return response.status(200).json(data);
    });
    app.post('/api/proceso/fake', async (request, response, next) => {
      const data = await this.apiInsert.postConsumirProceso(request.body);
      //return response.send(data);
      return response.status(200).json(data);
    });
    app.post('/api/atencion-paso-campo/create', async (request, response, next) => {
      const data = await this.apiInsert.postAtencionPaso(request.body);
      //return response.send(data);
      return response.status(200).json(data);
    });
    //Registro fotografico 
    app.post('/api/registro/fotografico/:numOrden/:numpaso', async (request, response, next) => {
      this.repositorioImg = await this.decodificarImagen(request.body, request.params);
      let dataRegistroFoto = {
        nombreImagen: request.body.nombreImgen,
        imagen: "imagen.jpeg"
      };
      const data = await this.apiInsert.postGuardarFoto(dataRegistroFoto, request.params);
      // return response.send(this.data);
      return response.status(200).json(data);
    });



    app.post('/api/decodeficacion/parametro', async (request, response) => {
      console.log(request.body)
      let parametro: any = request.body.data;
      console.log('parametro ---- ', parametro);
      let dataValidate: string = Buffer.from(parametro, 'base64').toString();
      for (let index = 0; index < 2; index++) {
        dataValidate = Buffer.from((dataValidate.substr(1, dataValidate.length)), 'base64').toString();
      }
      let decodificacion: any = {
        parametro: dataValidate
      }
      return response.status(200).json(decodificacion);
    });



    // GET parametros de configuaracion de procesos (integraciones) 
    app.get('/api/integracion/apolo/toa/:param/:orden/:tipo', async (request, response, next) => {
      const data = await this.apiConsultProces.getOrdenActiva(request.params);
      //return response.send(data);
      return response.status(200).json(data);
    });
    app.get('/api/retoma/apolo/:orden/:param', async (request, response, next) => {
      const data = await this.apiConsultProces.getOrdenRetoma(request.params);
      //return response.send(data);
      return response.status(200).json(data);
    });
    app.get('/api/autoconfiguracion/rest/:ordenActivity/:autoconfig', async (request, response, next) => {
      const data = await this.apiConsultProces.getActivationAutoconfi(request.params);
      //return response.send(data);
      return response.status(200).json(data);
    });

    //Integracion con hada --get
    app.get('/api/certificacion/servicio/validarar/tipo_orden/:activityId', async (request, response, next) => {
      console.log('Entra al servicio en el server');
       const data = await this.apiConsultProces.getIntegracionHada(request.params);
        return response.status(200).json(data);

      });


    // PASTCH parametros de configuaracion de procesos (integraciones) 
    app.patch('/api/integracion/toa/finaliza/rest/:num_orden', async (request, response, next) => {
      const data = await this.apiInsertProces.pastchActualizarOrden(request.params.num_orden, request.body);
      // return response.send(data);
      return response.status(200).json(data);
    });

    //Actualiza registro fotografico
    app.patch('/api/registro/fotografico/:numOrden/:numpaso', async (request, response, next) => {
      this.repositorioImg = await this.decodificarImagen(request.body, request.params);
      let dataRegistroFoto = {
        nombreImagen: request.body.nombreImgen,
        imagen: "imagen.jpeg"
      };
      const data = await this.apiInsert.pastchActualizaRegistroFotografico(dataRegistroFoto, request.params);
      //return response.send(data);
      return response.status(200).json(data);
    });

    app.get('/api/atencion/paso/atras/:idAtencion/:idPaso', async (request, response, next) => {
      const { idAtencion, idPaso } = request.params;
      const data = await this.apiConsult.AtencionPasoAtras(idAtencion, idPaso);
      // return response.send(data);
      return response.status(200).json(data);
    });
  }

  /**
   * Funcion que decodifica de base64 y convierte a imagen .jpg
   * Se almacena en el repositorio indicado
   */
  public async decodificarImagen(body, params) {
    //let imagenajustada = this.reduceTamanoImg(body.imagen);
    let dir: any = "C:/Users/usuario/Documents/imagenesPrueba/";
    var bitmap = Buffer.from(String.fromCharCode.apply(null, new Uint16Array(body.imagen)), "base64")
    fs.writeFileSync(`${dir}${body.nombreImgen}.jpg`, bitmap);
    return dir;
  }
}
/**
 * variable que inicialilza el server
 */
let serverApi = new Server();