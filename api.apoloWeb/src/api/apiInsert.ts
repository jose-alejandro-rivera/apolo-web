
import config from '../../config';
/*
 * constantes de coneccion 
 */
const bodyParser = require('body-parser'),axios = require("axios");

/**
 * clase de insercion en la base de datos
 */
export class ApiInsert {
  private res : any;
  private baseUrl: string;
  constructor() {
      this.res = null;
      this.baseUrl = config.BASE_URL;
  }
 
  /**
   * funcion que crea la atencion
   * @param params 
   */
  async  postCrearAtencion(params: any) {
    try {
      this.res = await axios.post(this.baseUrl +"/api/atencion/create", params);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion de prueba
   */
  async postConsumirProceso(body) {
    try {
      this.res = await axios.post(this.baseUrl +"/api/proceso/fake", body);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion que crea la funcion
   */
  async postAtencionPaso(data) {
    try {
      this.res = await axios.post(this.baseUrl +"/api/atencion-paso-campo/create", data);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }

}