
import { Router } from 'express';
import axios from "axios";
/**
 * clase de consulta en la base de datos
 */
export class ApiConsult {
  private res : any;
  private url: any;
  constructor() {
      this.res = null;
      this.url = null;
  }

  /**
   * funcion que consulta las categorias
   */
  async  getCategoriasFlujo() {
    try {
      this.res = await axios.get('http://10.203.221.51:3000/api/flujo/categorias');
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion que consulta los flujos con el id de las categorias
   * @param id: id de la categoria a consultar 
   */
  async  getFlujoPorCategoria(id) {
    try {
      this.url = "http://10.203.221.51:3000/api/flujos/por/categorias/" + id;
      this.res = await axios.get(this.url);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }
  /**
   * funcion que consulta los componentes del flujo
   * @param id: id del flujo a consultar
   */
  async  getPasosCategoria(id) {
    try {
      this.url = "http://10.203.221.51:3000/api/flujo/list/" + id;
      this.res = await axios.get(this.url);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }

  }


  /**
   * funcion que consulta el ultimo paso registrado para el boton atras
   * @param id: id de la atencion
   */
  async  getUltimoAtencionPaso(id) {
    try {
      this.url = 'http://10.203.221.51:3000/api/atencion/lastStep/' + id;
      this.res = await axios.get(this.url);
      return this.res.data;
    } catch (error) {
      console.error(error)
    }
  }
}