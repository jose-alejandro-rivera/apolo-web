import axios from "axios";
import config from '../../config';

/**
 * clase de consulta en la base de datos
 */
export class ApiConsult {
  private res : any;
  private baseUrl: string;
  constructor() {
      this.res = null;
      this.baseUrl = config.BASE_URL;
  }

  /**
   * funcion que consulta las categorias
   */
  async  getCategoriasFlujo() {
    try {
      this.res = await axios.get(this.baseUrl + '/api/flujo/categorias');
      return this.res.data;
    } catch (error) {
      return error;
    }
  }

  /**
   * funcion que consulta los flujos con el id de las categorias
   * @param id: id de la categoria a consultar 
   */
  async  getFlujoPorCategoria(idCategoria) {
      try {
        this.res = await axios.get(this.baseUrl + '/api/flujos/por/Categorias/' + idCategoria);
        return this.res.data;
      } catch (error) {
        console.error(error)
      }
    }
  
  /**
   * funcion que consulta los componentes del flujo
   * @param id: id del flujo a consultar
   */
  async  getPasosCategoria(idFlujo) {
    try {
      this.res = await axios.get(this.baseUrl + '/api/flujo/list/' + idFlujo);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }

  }


  /**
   * funcion que consulta el ultimo paso registrado para el boton atras
   * @param id: id de la atencion
   */
  async  getUltimoAtencionPaso(idAtencion) {
    try {
      this.res = await axios.get(this.baseUrl + '/api/atencion/lastStep/' + idAtencion);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }


  /**
   * funcion que consulta el estad de la orden 
   * @param formOrden parametros para consuktar la orden
   */
  async  getOrdenActiva(formOrden) {
    try {
      this.res = await axios.get(this.baseUrl + '/api/integracion/apolo/toa/' + formOrden.param +'/'+ formOrden.orden +'/'+formOrden.tipo);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }


}