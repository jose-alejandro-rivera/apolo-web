/**
 * @ignore
 */
const
    express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    Http = require('http'),
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
const request = require('supertest')

describe('pruebas de enrrutamiento api.apoloWeb', () => {

    describe("GET /", function () {
        
        it('prueba listado de categorias', async () => {
            const res = await request(app).get('http://localhost:3000/api/flujo/categorias')
            expect(res.statusCode).toEqual(200);
          })
    });
});