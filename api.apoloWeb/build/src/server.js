"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiConsult_1 = require("./api/apiConsult");
const apiInsert_1 = require("./api/apiInsert");
const service_pasoMocks_1 = require("../unitTest/mocks/service.pasoMocks");
const typescript_ioc_1 = require("typescript-ioc");
const apiConsultProces_1 = require("./api/apiConsultProces");
const apiInsertProces_1 = require("./api/apiInsertProces");
const fs = require("fs");
/**
 * constantes de coneccion
 */
let express = require('express');
let cors = require('cors');
let helmet = require('helmet');
const app = express();
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
    console.log('Connected to port ' + PORT);
});
/**
 * clase de inicializacion de los servidores
 */
class Server {
    constructor() {
        this.apiConsult = typescript_ioc_1.Container.get(apiConsult_1.ApiConsult);
        this.apiInsert = typescript_ioc_1.Container.get(apiInsert_1.ApiInsert);
        this.apiConsultProces = typescript_ioc_1.Container.get(apiConsultProces_1.ApiConsultProces);
        this.apiInsertProces = typescript_ioc_1.Container.get(apiInsertProces_1.ApiInsertProces);
        this.serviceMocks = typescript_ioc_1.Container.get(service_pasoMocks_1.ServicePasoMock);
        this.router();
    }
    /**
     * contenedor de los servicios expuestos
     */
    router() {
        console.log('asociacionn axios');
        //parametros de consulta
        app.get('/api/testConnection', function (req, res, next) {
            return res.status(200).json('testConnection OK');
        });
        app.get('/api/atencion/lastStep/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsult.getUltimoAtencionPaso(request.params.id);
            // return response.status(201).json({ 'status': 201, 'response': "informacion incompleta" });
            return response.status(200).json(data);
            // return response.send(data);
        }));
        app.get('/api/flujo/categorias', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsult.getCategoriasFlujo();
            //return response.send(this.data);
            return response.status(200).json(data);
        }));
        app.get('/api/flujos/por/Categorias/:id', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsult.getFlujoPorCategoria(request.params.id);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        app.get('/api/flujo/list/:id', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsult.getPasosCategoria(request.params.id);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        //parametros de insercion POS
        app.post('/api/testConnection', function (req, res, next) {
            return __awaiter(this, void 0, void 0, function* () {
                console.log('Si entraaaaa testConnection');
                return res.status(200).json('testConnection OK');
            });
        });
        app.post('/api/atencion/create/', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiInsert.postCrearAtencion(request.body);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        app.post('/api/proceso/fake', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiInsert.postConsumirProceso(request.body);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        app.post('/api/atencion-paso-campo/create', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiInsert.postAtencionPaso(request.body);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        //Registro fotografico 
        app.post('/api/registro/fotografico/:numOrden/:numpaso', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            this.repositorioImg = yield this.decodificarImagen(request.body, request.params);
            let dataRegistroFoto = {
                nombreImagen: request.body.nombreImgen,
                imagen: "imagen.jpeg"
            };
            const data = yield this.apiInsert.postGuardarFoto(dataRegistroFoto, request.params);
            // return response.send(this.data);
            return response.status(200).json(data);
        }));
        app.post('/api/decodeficacion/parametro', (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log(request.body);
            let parametro = request.body.data;
            console.log('parametro ---- ', parametro);
            let dataValidate = Buffer.from(parametro, 'base64').toString();
            for (let index = 0; index < 2; index++) {
                dataValidate = Buffer.from((dataValidate.substr(1, dataValidate.length)), 'base64').toString();
            }
            let decodificacion = {
                parametro: dataValidate
            };
            return response.status(200).json(decodificacion);
        }));
        // GET parametros de configuaracion de procesos (integraciones) 
        app.get('/api/integracion/apolo/toa/:param/:orden/:tipo', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsultProces.getOrdenActiva(request.params);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        app.get('/api/retoma/apolo/:orden/:param', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsultProces.getOrdenRetoma(request.params);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        app.get('/api/autoconfiguracion/rest/:ordenActivity/:autoconfig', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsultProces.getActivationAutoconfi(request.params);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        // PASTCH parametros de configuaracion de procesos (integraciones) 
        app.patch('/api/integracion/toa/finaliza/rest/:num_orden', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiInsertProces.pastchActualizarOrden(request.params.num_orden, request.body);
            // return response.send(data);
            return response.status(200).json(data);
        }));
        //Actualiza registro fotografico
        app.patch('/api/registro/fotografico/:numOrden/:numpaso', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            this.repositorioImg = yield this.decodificarImagen(request.body, request.params);
            let dataRegistroFoto = {
                nombreImagen: request.body.nombreImgen,
                imagen: "imagen.jpeg"
            };
            const data = yield this.apiInsert.pastchActualizaRegistroFotografico(dataRegistroFoto, request.params);
            //return response.send(data);
            return response.status(200).json(data);
        }));
        app.get('/api/atencion/paso/atras/:idAtencion/:idPaso', (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const { idAtencion, idPaso } = request.params;
            const data = yield this.apiConsult.AtencionPasoAtras(idAtencion, idPaso);
            // return response.send(data);
            return response.status(200).json(data);
        }));
    }
    /**
     * Funcion que decodifica de base64 y convierte a imagen .jpg
     * Se almacena en el repositorio indicado
     */
    decodificarImagen(body, params) {
        return __awaiter(this, void 0, void 0, function* () {
            //let imagenajustada = this.reduceTamanoImg(body.imagen);
            let dir = "C:/Users/usuario/Documents/imagenesPrueba/";
            var bitmap = Buffer.from(String.fromCharCode.apply(null, new Uint16Array(body.imagen)), "base64");
            fs.writeFileSync(`${dir}${body.nombreImgen}.jpg`, bitmap);
            return dir;
        });
    }
}
exports.Server = Server;
/**
 * variable que inicialilza el server
 */
let serverApi = new Server();
//# sourceMappingURL=server.js.map