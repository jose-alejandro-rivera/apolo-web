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
/**
 * constantes de coneccion
 */
const express = require('express'), cors = require('cors'), //**** */
bodyParser = require('body-parser'), //**** */
http = require('http'), //
request = require("request"), axios = require("axios"); //
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
class ApiInsert {
    constructor(router) {
        this.res = null;
        this.url = null;
    }
    /**
     * funcion que crea la atencion
     * @param params
     */
    postCrearAtencion(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.url = "http://localhost:3000/api/atencion/create";
                this.res = yield axios.post(this.url, params);
                return this.res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
     * funcion de prueba
     */
    postConsumirProceso(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.url = "http://localhost:3000/api/proceso/fake";
                this.res = yield axios.post(this.url, body);
                return this.res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
     * funcion que crea la funcion
     */
    postAtencionPaso(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.url = "http://localhost:3000/api/atencion-paso-campo/create";
                this.res = yield axios.post(this.url, data);
                return this.res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.ApiInsert = ApiInsert;
//# sourceMappingURL=apiInsert.js.map