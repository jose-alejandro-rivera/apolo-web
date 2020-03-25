
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
    let resp: any;
    try {
      this.res = await axios.post(this.baseUrl +"/api/atencion/create", params);
      resp = this.res.data;
      return resp;
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

   /**
   * funcion que guarda la foto
   */
  async postGuardarFoto(body, params) {
    try {
      this.res = await axios.post(this.baseUrl + `/api/registro/fotografico/${params.numOrden}/${params.numpaso}`, body);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }


   /**
   * Función actualiza el registro fotográfico
   * @param params 
   */
  async  pastchActualizaRegistroFotografico(body, params) {
    try {
      this.res = await axios.patch(this.baseUrl +`/api/registro/fotografico/${params.numOrden}/${params.numpaso}`, body);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }

}