import axios from "axios";
import config from '../../config';

export class ApiConsultProces {
    private res : any;
    private baseUrl: string;
    constructor() {
        this.res = null;
        this.baseUrl = config.BASE_URL;
    }

    /**
   * funcion que consulta el estao de la autoconfiguracion para TV y BA
   * @param formOrden parametro para consuktar la orden
   */
  async  getActivationAutoconfi(formProces) {
    try {
      this.res = await axios.get(this.baseUrl + '/api/autoconfiguracion/rest/' + formProces.ordenActivity + '/'+ formProces.autoconfig);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * funcion que consulta el estad de la orden 
   * @param formOrden parametros para consuktar la orden
   */

   //************************************** */
  async  getOrdenActiva(formOrden) {
    try {
      const res = await axios.get(this.baseUrl + '/api/integracion/apolo/toa/' + formOrden.param + '/' + formOrden.orden + '/' + formOrden.tipo);
      return res.data;
    } catch (error) {
      console.error(error)
    }
  }

  /**
     * funcion que consulta el estad de la orden 
     * @param formOrden parametro para consuktar la orden
     */
  async  getOrdenRetoma(formOrden) {
    try {
      this.res = await axios.get(this.baseUrl + '/api/retoma/apolo/' + formOrden.orden +'/'+formOrden.param );
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }

       /**
   * funcion que consume el servicio para integracion con HADA
   */
  async getIntegracionHada(params) {
    console.log('params ---> ', params);
    try {
      this.res = await axios.get(this.baseUrl + `/api/certificacion/servicio/validarar/tipo_orden/${params.activityId}`);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }



}