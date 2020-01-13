import { ApiConsult } from '../src/api/apiConsult';
//const cl = require('../src/api/apiConsult') // Link to your server file
//const supertest = require('supertest')
//const request = supertest(ApiConsult)


it('Gets the test endpoint', async done => {
    let app = new ApiConsult();
    // Sends GET Request to /test endpoint
    const res = await app.getCategoriasFlujo();
    // ...
    done();
  })