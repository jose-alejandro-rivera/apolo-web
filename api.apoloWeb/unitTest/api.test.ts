import { ApiConsult } from '../src/api/apiConsult';
import { ServicePasoMock } from '../unitTest/mocks/service.pasoMocks';
import {Container, Scope} from 'typescript-ioc';
//const cl = require('../src/api/apiConsult') // Link to your server file
//const supertest = require('supertest')
//const request = supertest(ApiConsult)


it('Gets the test endpoint', async done => {

  Container.bind(ApiConsult).to(ServicePasoMock).scope(Scope.Local);
  let serviceMock: ServicePasoMock = Container.get(ApiConsult);
  let apiConsult: ApiConsult = Container.get(ApiConsult);

  //let objectModel = chargeJsonResponse('menuResponseObj');
  //database.setProcedureResponse(objectModel, true);
  // console.log(serviceMock.categoriasData);
  let dataResponse = await apiConsult.getCategoriasFlujo;
  let app = new ApiConsult();
  // Sends GET Request to /test endpoint
  const res = await app.getCategoriasFlujo();
  // ...
  done();
  })

