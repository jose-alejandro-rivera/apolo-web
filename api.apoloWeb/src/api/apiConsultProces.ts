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


}