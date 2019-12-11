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
const service_pasoMocks_1 = require("./mocks/service.pasoMocks");
const typescript_ioc_1 = require("typescript-ioc");
/**
 * constantes de coneccion
 */
const express = require('express'), cors = require('cors'), bodyParser = require('body-parser'), Http = require('http'), request = require("request"), axios = require("axios");
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
    console.log('Connected to port ' + PORT);
});
/**
 * clase de inicializacion de los servidores
 */
class Server {
    constructor() {
        /**
         * variable que contiene las funciones de consulta
         */
        this.apiConsult = typescript_ioc_1.Container.get(apiConsult_1.ApiConsult);
        /**
         * variable que contiene las funciones de insercion
         */
        this.apiInsert = typescript_ioc_1.Container.get(apiInsert_1.ApiInsert);
        /**
         * variable que contine los mocks para pruebas unitarias
         */
        this.serviceMocks = typescript_ioc_1.Container.get(service_pasoMocks_1.ServicePasoMock);
        this.router();
    }
    /**
     * contenedor de los servicios expuestos
     */
    router() {
        //parametros de consulta
        /**
         * funcion de validacion de prueba a la coneccion
         */
        app.get('/api/testConnection', function (req, res) {
            console.log('usted esta aqui');
            return res.status(200).json('testConnection OK');
        });
        /**
         * funcion que obtiene el listado de las categorias
         */
        app.get('/api/flujo/categorias', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsult.getCategoriasFlujo();
            return response.send(data);
        }));
        /**
         * funcion que obtiene el listado de los flujos asociado a la categoria seleccionada
         */
        app.get('/api/flujos/por/categorias/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsult.getFlujoPorCategoria(request.params.id);
            return response.send(data);
        }));
        /**
         * funcion que obtiene el listado de componentes del flujo
         */
        app.get('/api/flujo/list/:id', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiConsult.getPasosCategoria(request.params.id);
            return response.send(data);
        }));
        //parametros de insercion
        /**
         * funcion que realiza la cracion de la atencion
         */
        app.post('/api/atencion/create/', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiInsert.postCrearAtencion(request.body);
            return response.send(data);
        }));
        /**
         * funcion rueba
         */
        app.post('/api/proceso/fake', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiInsert.postConsumirProceso(request.body);
            return response.send(data);
        }));
        /**
         * funcion que registra el paso a paso ejecutado por el usuario
         */
        app.post('/api/atencion-paso-campo/create', (request, response) => __awaiter(this, void 0, void 0, function* () {
            const data = yield this.apiInsert.postAtencionPaso(request.body);
            return response.send(data);
        }));
        //---------------------tests-------------------
        app.get('/api/testCategoria', (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log('usted esta aqui');
            const data = yield this.serviceMocks.categoriasData;
            return response.send(data);
        }));
        app.get('/api/testListFlujos', (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log('usted esta aqui');
            const data = yield this.serviceMocks.FlujosCategoriaData;
            return response.send(data);
        }));
        app.get('/api/testPasosFlujo', (request, response) => __awaiter(this, void 0, void 0, function* () {
            console.log('usted esta aqui');
            const data = yield this.serviceMocks.FlujoData;
            return response.send(data);
        }));
    }
}
exports.Server = Server;
/**
 * variable que inicialilza el server
 */
let serverApi = new Server();
//# sourceMappingURL=server.js.map