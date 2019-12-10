import { ApiConsult } from '../src/api/apiConsult';
import { ApiInsert } from '../src/api/apiInsert';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Inject, Container, Scope } from "typescript-ioc";

/**
 * @ignore
 */
const
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    Http = require('http'),
    //   request = require("request"),
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

var request = require("request");
var base_url = "http://localhost:8080/api/";


const PORT = process.env.PORT || 8081;
const server = app.listen(PORT, () => {
    console.log('Connected to port ' + PORT)
});


describe('pruebas de enrrutamiento api.apoloWeb', () => {

    describe("GET /", function () {

        it('prueba alistamiento de categorias coneccion al back', function (done) {
            const url = base_url + "flujo/categorias";
            request.get(url, function (error, response, body) {
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it('prueba validacion de enteros', function (done) {
            const url = base_url + "flujo/categorias";
            request.get(url, function (error, response, body) {
                const categorias: any[] = body;
                expect(response.statusCode).toBe(200);
                done();
            });
        });

        it('prueba de alistamiento de categorias', function (done) {
            const url = base_url + "testCategoria";
            request.get(url, function (error, response, body) {
                expect(response).not.toBe(null);
                done();
            });
        });


        it('prueba de alistamiento de flujos', function (done) {
            const url = base_url + "testListFlujos";
            request.get(url, function (error, response, body) {
                console.log(body)
                expect(response).not.toBe(null);
                done();
            });
        });

        it('prueba de alistamiento de los pasos del flujo', function (done) {
            const url = base_url + "testPasosFlujo";
            request.get(url, function (error, response, body) {
                console.log(body)
                expect(response).not.toBe(null);
                done();
            });
        });

    });


});