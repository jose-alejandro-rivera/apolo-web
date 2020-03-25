


let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let Http = require('http');
let helmet = require('helmet');
let axios = require("axios");
let request = require("request");
let cookieParser = require('cookie-parser');

let app : any;


/**
 * constantes de coneccion
 */


app = express();
app.use(function(req, res, next) {
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('Content-Security-Policy', "frame-ancestors 'none'");
  next();
});

app.use(helmet.frameguard());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

let base_url = "http://localhost:8080/api/";

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