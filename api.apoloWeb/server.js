const express = require('express'),
  cors = require('cors'),
  bodyParser = require('body-parser');
  const http = require('http');
  const request = require("request");
  const axios = require("axios");

// Express settings
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

//parametros de consulta
app.get('/api/testConnection', function (req, res) {
  return res.status(200).json('testConnection OK');
});

app.get('/api/flujo/categorias',  async (request, response) => {
  const data = await getCategoriasFlujo();
  return response.send(data);
});
  
app.get('/api/flujos/por/categorias/:id',  async (request, response) => {
  const data = await getFlujoPorCategoria(request.params.id);
  return response.send(data);
});

app.get('/api/flujo/list/:id',  async (request, response) => {
  const data = await getPasosCategoria(request.params.id);
  return response.send(data);
});



//parametros de creacion 

app.post('/api/atencion/create/',  async (request, response) => {
  console.log(request.body);
  const data = await postCrearAtencion(request.body);
  return response.send(data);
});

app.post('/api/proceso/fake',  async (request, response) => {
  console.log(request.body);
  const data = await postConsumirProceso(request.body);
  return response.send(data);
});

app.post('/api/atencion-paso-campo/create',  async (request, response) => {
  console.log(request.body);
  const data = await postAtencionPaso(request.body);
  return response.send(data);
});

//funciones de solicitudes al back

async function getCategoriasFlujo() {
  try {
    let res = await axios.get('http://localhost:3000/api/flujo/categorias');
    return res.data;
  } catch (error) {
    console.error(error)
  }
}

async function getFlujoPorCategoria(id) {
  try {
    var url="http://localhost:3000/api/flujos/por/categorias/" + id;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error)
  }
}

async function getPasosCategoria(id) {
  try {
    var url="http://localhost:3000/api/flujo/list/" + id;
    let res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error)
  }
}

async function postCrearAtencion(params) {
  try {
    var url="http://localhost:3000/api/atencion/create";
    let res = await axios.post(url,params);
    return res.data;
  } catch (error) {
    console.error(error)
  }
}

async function postConsumirProceso(params) {
  try {
    var url="http://localhost:3000/api/proceso/fake";
    res = await axios.post(url,params);
    return res.data;
  } catch (error) {
    console.error(error)
  }
}

async function postAtencionPaso(params) {
  try {
    var url="http://localhost:3000/api/atencion-paso-campo/create";
    res = await axios.post(url,params);
    return res.data;
  } catch (error) {
    console.error(error)
  }
}

// Create PORT
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log('Connected to port ' + PORT)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});