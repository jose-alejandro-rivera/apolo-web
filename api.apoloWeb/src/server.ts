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
const
  express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser');
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

  apiConsult: ApiConsult = Container.get(ApiConsult);
  apiInsert: ApiInsert = Container.get(ApiInsert);
  apiConsultProces: ApiConsultProces = Container.get(ApiConsultProces);
  apiInsertProces: ApiInsertProces = Container.get(ApiInsertProces);
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
    app.get('/api/testConnection', function (req, res) {
      return res.status(200).json('testConnection OK');
    });
    app.get('/api/atencion/lastStep/:id', async (request, response) => {
      const data = await this.apiConsult.getUltimoAtencionPaso(request.params.id);
      return response.send(data);
    });
    app.get('/api/flujo/categorias', async (request, response) => {
      this.data = await this.apiConsult.getCategoriasFlujo();
      return response.send(this.data);
    });
    app.get('/api/flujos/por/Categorias/:id', async (request, response) => {
      const data = await this.apiConsult.getFlujoPorCategoria(request.params.id);
      return response.send(data);
    });
    app.get('/api/flujo/list/:id', async (request, response) => {
      const data = await this.apiConsult.getPasosCategoria(request.params.id);
      return response.send(data);
    });



    //parametros de insercion POS

    app.post('/api/testConnection', async function (req, res) {
      console.log('Si entraaaaa testConnection');
      return res.status(200).json('testConnection OK');
    });

    app.post('/api/atencion/create/', async (request, response) => {
      const data = await this.apiInsert.postCrearAtencion(request.body);
      return response.send(data);
    });
    app.post('/api/proceso/fake', async (request, response) => {
      const data = await this.apiInsert.postConsumirProceso(request.body);
      return response.send(data);
    });
    app.post('/api/atencion-paso-campo/create', async (request, response) => {
      const data = await this.apiInsert.postAtencionPaso(request.body);
      return response.send(data);
    });
    //Registro fotografico 
    app.post('/api/registro/fotografico/:numOrden/:numpaso', async (request, response) => {
      let repositorioImg: any = await this.decodificarImagen(request.body, request.params);
      let dataRegistroFoto = {
        nombreImagen: request.body.nombreImgen,
        imagen: "imagen.jpeg"
      };
      this.data = await this.apiInsert.postGuardarFoto(dataRegistroFoto, request.params);
      return response.send(this.data);
    });


    // GET parametros de configuaracion de procesos (integraciones) 
    app.get('/api/integracion/apolo/toa/:param/:orden/:tipo', async (request, response) => {
      const data = await this.apiConsultProces.getOrdenActiva(request.params);
      return response.send(data);
    });
    app.get('/api/retoma/apolo/:orden/:param', async (request, response) => {
      const data = await this.apiConsultProces.getOrdenRetoma(request.params);
      return response.send(data);
    });
    app.get('/api/autoconfiguracion/rest/:ordenActivity/:autoconfig', async (request, response) => {
      const data = await this.apiConsultProces.getActivationAutoconfi(request.params);
      return response.send(data);
    });

    // PASTCH parametros de configuaracion de procesos (integraciones) 
    app.patch('/api/integracion/toa/finaliza/rest/:num_orden', async (request, response) => {
      const data = await this.apiInsertProces.pastchActualizarOrden(request.params.num_orden, request.body);
      return response.send(data);
    });

    //Actualiza registro fotografico
    app.patch('/api/registro/fotografico/:numOrden/:numpaso', async (request, response) => {
      let repositorioImg: any = await this.decodificarImagen(request.body, request.params);
      let dataRegistroFoto = {
        nombreImagen: request.body.nombreImgen,
        imagen: "imagen.jpeg"
      };
      const data = await this.apiInsert.pastchActualizaRegistroFotografico(dataRegistroFoto, request.params);
      return response.send(data);
    });

    app.get('/api/atencion/paso/atras/:idAtencion/:idPaso', async (request, response) => {
      const { idAtencion, idPaso } = request.params;
      const data = await this.apiConsult.AtencionPasoAtras(idAtencion, idPaso);
      return response.send(data);
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



  public reduceTamanoImg(imagen) {
    let resizebase64 = require('resize-base64');
    // resizebase64 = function (imagen, maxWidth, maxHeight) {
    let maxWidth: number = 0;
    let maxHeight: number = 0;
    // Max size for thumbnail
    if (typeof (maxWidth) === 'undefined') maxWidth = 500;
    if (typeof (maxHeight) === 'undefined') maxHeight = 500;

    console.log('despues del if');
    // Create and initialize two canvas
   /* 
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let canvasCopy = document.createElement("canvas");
    let copyContext = canvasCopy.getContext("2d");
*/
    // Create original image
    let img = new Image();
    console.log('despues del img');
    img.src = imagen;

    // Determine new ratio based on max size
    let ratio = 1;
    if (img.width > maxWidth)
      ratio = maxWidth / img.width;
    else if (img.height > maxHeight)
      ratio = maxHeight / img.height;

      console.log('--------------------->>> ', ratio);
    // Draw original image in second canvas
   /* canvasCopy.width = img.width;
    canvasCopy.height = img.height;
    copyContext.drawImage(img, 0, 0);
    */

    // Copy and resize second canvas to first canvas
 /*   canvas.width = img.width * ratio;
    canvas.height = img.height * ratio;
    ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
*/
    //return canvas.toDataURL();
  }


}
/**
 * variable que inicialilza el server
 */
let serverApi = new Server();