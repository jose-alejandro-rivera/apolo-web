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
 * clase de consulta en la base de datos
 */
class ApiConsult {
    constructor(router) {
    }
    /**
     * funcion que consulta las categorias
     */
    getCategoriasFlujo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let res = yield axios.get('http://localhost:3000/api/flujo/categorias');
                return res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
     * funcion que consulta los flujos con el id de las categorias
     * @param id: id de la categoria a consultar
     */
    getFlujoPorCategoria(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var url = "http://localhost:3000/api/flujos/por/categorias/" + id;
                let res = yield axios.get(url);
                return res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
     * funcion que consulta los componentes del flujo
     * @param id: id del flujo a consultar
     */
    getPasosCategoria(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var url = "http://localhost:3000/api/flujo/list/" + id;
                let res = yield axios.get(url);
                return res.data;
            }
            catch (error) {
                console.error(error);
            }
            /**
             *
             */
            app.use(function (err, req, res, next) {
                console.error(err.message);
                if (!err.statusCode)
                    err.statusCode = 500;
                res.status(err.statusCode).send(err.message);
            });
        });
    }
}
exports.ApiConsult = ApiConsult;
//# sourceMappingURL=apiConsult.js.map