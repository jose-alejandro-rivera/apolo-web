
import config from '../../config';
/*
 * constantes de coneccion 
 */
const bodyParser = require('body-parser'),axios = require("axios");

/**
 * clase de insercion y actualizacion en la base de datos
 */
export class ApiInsertProces {
  private res : any;
  private baseUrl: string;
  constructor() {
      this.res = null;
      this.baseUrl = config.BASE_URL;
  }
 
  /**
   * funcion actualiza la orden al finalizar el flujo
   * @param params 
   */
  async  pastchActualizarOrden(num_Orden, params) {
    try {
      this.res = await axios.patch(this.baseUrl +"/api/integracion/toa/finaliza/rest/"+ num_Orden, params);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }


//   async  getActivationAutoconfi(num_Orden) {
//     try {
//       this.res = await axios.get(this.baseUrl + '/api/integracion/toa/finaliza/rest/' + num_Orden );
//       return this.res.data;
//     } catch (error) {
//       console.error(error)
//     }
//   }
 

}