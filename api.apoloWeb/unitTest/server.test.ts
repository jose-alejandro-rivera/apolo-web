
/**
 * @ignore
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

var base_url = "http://localhost:8080/api/";

describe('pruebas de enrrutamiento api.apoloWeb', () => {

    describe("GET /", function () {

     

        it('prueba de alistamiento de categorias', function (done) {
            const url = base_url + "/api/flujo/categorias";
            request.get(url, function (error, response, body) {
                expect(response).not.toBe(null);
                done();
            });
        });


        it('prueba de alistamiento de flujos', function (done) {
            const url = base_url + "testListFlujos";
            request.get(url, function (error, response, body) {
                expect(response).not.toBe(null);
                done();
            });
        });

        it('prueba de alistamiento de los pasos del flujo', function (done) {
            const url = base_url + "testPasosFlujo";
            request.get(url, function (error, response, body) {
                expect(response).not.toBe(null);
                done();
            });
        });

    });


});