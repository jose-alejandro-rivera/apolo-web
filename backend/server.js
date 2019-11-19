const express = require('express'),
  path = require('path'),
  cors = require('cors'),
  multer = require('multer'),
  bodyParser = require('body-parser');
  http = require('http');
  request = require("request");
  axios = require("axios");

// Express settings
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


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

async function getCategoriasFlujo() {
  try {
    res = await axios.get('http://localhost:3000/api/flujo/categorias');
    return res.data;
  } catch (error) {
    console.error(error)
  }
}

async function getFlujoPorCategoria(id) {
  try {
    var url="http://localhost:3000/api/flujos/por/categorias/" + id;
    res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error)
  }
}

// Create PORT
const PORT = process.env.PORT || 8080;
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