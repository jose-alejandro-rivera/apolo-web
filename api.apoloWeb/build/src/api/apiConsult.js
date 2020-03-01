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
const axios_1 = require("axios");
const config_1 = require("../../config");
/**
 * clase de consulta en la base de datos
 */
class ApiConsult {
    constructor() {
        this.res = null;
        this.baseUrl = config_1.default.BASE_URL;
    }
    /**
     * funcion que consulta las categorias
     */
    getCategoriasFlujo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.res = yield axios_1.default.get(this.baseUrl + '/api/flujo/categorias');
                return this.res.data;
            }
            catch (error) {
                return error;
            }
        });
    }
    /**
     * funcion que consulta los flujos con el id de las categorias
     * @param id: id de la categoria a consultar
     */
    getFlujoPorCategoria(idCategoria) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.res = yield axios_1.default.get(this.baseUrl + '/api/flujos/por/Categorias/' + idCategoria);
                return this.res.data;
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
    getPasosCategoria(idFlujo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.res = yield axios_1.default.get(this.baseUrl + '/api/flujo/list/' + idFlujo);
                return this.res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
     * funcion que consulta el ultimo paso registrado para el boton atras
     * @param id: id de la atencion
     */
    getUltimoAtencionPaso(idAtencion) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.res = yield axios_1.default.get(this.baseUrl + '/api/atencion/lastStep/' + idAtencion);
                return this.res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    /**
   * funcion que consulta el ultimo paso registrado para el boton atras
   * @param idAtencion: idAtencion de la atencion
   */
    AtencionPasoAtras(idAtencion, idPaso) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.res = yield axios_1.default.get(this.baseUrl + '/api/atencion/paso/atras/' + idAtencion + '/' + idPaso);
                return this.res.data;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.ApiConsult = ApiConsult;
//# sourceMappingURL=apiConsult.js.map