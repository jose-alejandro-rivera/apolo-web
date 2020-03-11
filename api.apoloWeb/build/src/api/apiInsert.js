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
const config_1 = require("../../config");
/*
 * constantes de coneccion
 */
const bodyParser = require('body-parser'), axios = require("axios");
/**
 * clase de insercion en la base de datos
 */
class ApiInsert {
    constructor() {
        this.res = null;
        this.baseUrl = config_1.default.BASE_URL;
    }
    /**
     * funcion que crea la atencion
     * @param params
     */
    postCrearAtencion(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let resp;
            try {
                this.res = yield axios.post(this.baseUrl + "/api/atencion/create", params);
                resp = this.res.data;
                return resp;
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
                this.res = yield axios.post(this.baseUrl + "/api/proceso/fake", body);
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
                this.res = yield axios.post(this.baseUrl + "/api/atencion-paso-campo/create", data);
                return this.res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
    * funcion que guarda la foto
    */
    postGuardarFoto(body, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.res = yield axios.post(this.baseUrl + `/api/registro/fotografico/${params.numOrden}/${params.numpaso}`, body);
                return this.res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
    * Función actualiza el registro fotográfico
    * @param params
    */
    pastchActualizaRegistroFotografico(body, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.res = yield axios.patch(this.baseUrl + `/api/registro/fotografico/${params.numOrden}/${params.numpaso}`, body);
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