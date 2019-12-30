import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy, ɵConsole } from '@angular/core';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { IServiceResponse } from '../../interfaces/serviceResponse';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { IRecordResponse } from '../../interfaces/recordResponse';
import { async } from '@angular/core/testing';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-atencion-components',
  templateUrl: './atencion-components.component.html',
  styleUrls: ['./atencion-components.component.css'],
  providers: [AppGlobals]
})
/**
 * provee la injeccion de los componentes del flujo seleccionado
 */
export class AtencionComponentsComponent implements OnInit {
  /**
   * variable que permite visualizar el componente
   */
  atencionComponente: boolean;
  /**
   * varible que contiene el local storach
   */
  dataFlujoCat: any;
  /**
   * variable que contiene el valor del flujo a consultar
   */
  idFlujo: any;
  /**
   * variable qu econtiene el nombre del flujo
   */
  nombreFlujo: any;
  /**
   * variable que captura la estructura del flujo 
   */
  info: any;
  /**
   * variable que identifica el paso actual
   */
  pasoActual: any;
  /**
   * variable que identifica el tipo de decicion a tomar
   */
  decisionActual: any;
  /**
   * variable que intencifica la decision seleccionada
   */
  decisionSeleccionada: any;
  /**
   * variable que optiene el llistado de los campo que tiene el cuestionario
   */
  cuestionarioPaso: any[] = [];
  /**
   * variable que optiene el proceso de paso a visualizar 
   */
  procesoPaso: any;
  /**
   * variable que optien el flujo completo con sus componentes
   */
  flujoPaso: any;
  /**
   * variable que contiene los componentes del paso
   */
  codComponentePasos: any;
  /**
   * variable que obtiene los campos del cuestionario
   */
  atencionCuestionario: any[] = [];
  /**
   * variable que valida la respuesta del servicio
   */
  response: any;
  /**
   * variable que representa la finalizaciond el flujo
   */
  finflujo: boolean;
  /**
   * variable que almacena el proceso
   */
  consumirProceso: any;
  /**
   * validar con ejecucion del proceso
   */
  pruebaproceso: any;//validar con el proceso de crear
  respuestaProcesoActual: IServiceResponse = { data: { status: 200, response: "proceso ejecutado exitosamente" } };
  /**
   * variable que obtiene el listado de pasos
   */
  ListaPasos = [];
  /**
   * variable que calcula el cuestionario
   */
  CuestionarioActual: boolean;
  /**
   * variable que calcula el proceso 
   */
  ProcesoActual: boolean;
  /**
   * variable que obtiene el paso actual
   */
  actualPaso: any;
  /**
   * variable que valida la solucion del paso 
   */
  atencionSoluciona: any;
  /**
   * variable que trae la url de conexion
   */
  URL: any;
  /**
   * variable que calcula el proceso 
   */
  seleccionObligatoria: boolean;
  /**
   * variable que contiene el mensaje del campo obligatorio
   */
  mensajeCampoCuestionario: any;

  seleccionPositiva: boolean;

  /**
  * variable que guarda la ruta que va seleccionado en un flujo cuando el paso tiene multiples opciones
  */
  mapaTrazabilidad: any[] = [];

  seleccionCampo: any;
  url: any;


  /**
   * 
   * @param atencionService 
   * @param router 
   */
  constructor(
    private atencionService: EjecucionAtencionService,
    private router: Router,
    private global: AppGlobals
  ) {
    this.atencionComponente = true;
    this.atencionSoluciona = "0";
    this.URL = this.global.url;
    this.seleccionObligatoria = false;
    this.seleccionPositiva = true;
  }

  /**
  * Funcion que retorna el listado de 
  *
  * @Params dataFlujoCat: objeto de memoria donde se obtiene el id del formulario 
  * @returns flujoPaso: listado de pasos relacionados con el flujo con sus respectivos procesos y cuestionarios
  */
  ngOnInit() {
    this.dataFlujoCat = JSON.parse(localStorage.getItem('dataFlujoCat'));
    this.idFlujo = this.dataFlujoCat.Id_Flujo;
    this.nombreFlujo = this.dataFlujoCat.NomFlujo;
    this.url = this.URL + 'flujo/list/' + this.idFlujo;
    //se obtiene la atencion seleccionada con todos sus componentes
    return this.atencionService.getData(this.url).toPromise().then(data => {
      let info: any = data;
      info = info.rows[0];
      info = info[0];
      info = info[0];
      return info;
    }).then(data => {
      this.info = data;
      this.pasoActual = data.CodPaso_Inicial;
      this.ListaPasos = data.Pasos;
      this.flujoPaso = data.FlujoPasos.find(x => x.CodPaso_Origen == this.pasoActual);
      //se evalua la existencia de cuestionario o proceso en el paso
      this.codComponentePasos = this.ListaPasos.find(x => x.Id_Paso == this.pasoActual);
      if (data.Cuestionarios.find(x => x.Id_Paso == this.pasoActual)) {
        this.cuestionarioPaso = data.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual);
        this.CuestionarioActual = true;
      } else if (data.Procesos.find(x => x.Id_Paso == this.pasoActual)) {
        this.procesoPaso = data.Procesos.filter(x => x.Id_Paso == this.pasoActual)[0];
        this.ProcesoActual = true;
      }
      this.finflujo = this.flujoPaso.finaliza;
    });
  }

  /**
   * Funcion que valida las opciones seleccionadas del cuestionario 
   *
   * @Param event: valor del campo seleccionado
   * @param IdCuestionarioCampo: valor del id del cuestionarioCampo seleccionado 
   * @returns atencionCuestionario: lista de los cuestionariosCampo seleccionados
   */
  resultadoCuestionario(event, IdCuestionarioCampo: number) {
    //resultado de la seleccion del cuestionario
    if (event.target.value === "" || event.target.value == 0) {
      this.seleccionCampo = this.cuestionarioPaso.find(x => x.Id_CuestionarioCampo == IdCuestionarioCampo);
      if (this.seleccionCampo.Obligatorio) {
        this.mensajeCampoCuestionario = this.global.mensajeCampoObligatorio;
        this.seleccionObligatoria = true;
        this.seleccionPositiva = true;
      }
    } else {
      const selectCuestionarioCampo = {
        CodCuestionarioCampo: IdCuestionarioCampo,
        ValorCampo: event.target.value
      };
      this.seleccionObligatoria = false;
      // this.seleccionPositiva=false;
      //validacion de la existencia del campoCuestionario guardado
      if (this.atencionCuestionario.find(x => x.CodCuestionarioCampo == IdCuestionarioCampo)) {
        for (let i = 0; i < this.atencionCuestionario.length; i++) {
          if (this.atencionCuestionario.find(x => x.CodCuestionarioCampo == IdCuestionarioCampo)) {
            this.atencionCuestionario[i] = selectCuestionarioCampo;
          }
        }
      } else {
        this.atencionCuestionario.push(selectCuestionarioCampo);
      }
      if (this.cuestionarioPaso.length == this.atencionCuestionario.length) {
        this.seleccionPositiva = false;
      }
    }
  }

  /**
   * Funcion que valida la opcion seleccionada de la decision del cuestionario 
   *
   * @Param event: valor del campo seleccionado
   * @returns decisionSeleccionada:valor de la decision seleccionada 
   */
  DecisionSeleccionada(value) {
    this.decisionSeleccionada = value;
    this.seleccionObligatoria = false;
    this.seleccionPositiva = false;
  }

  /**
   * Funcion que realiza la continuidad de los pasos expuestos por el flujo seleccionado 
   *
   * @Param Id_Paso: id del paso actual
   * @returns pasoActual: id del paso siguiente que sera visualizado 
   */
  async Siguiente(Id_Paso: number) {
    this.limpiarVariables();
    //buscar el siguiente paso a visualizar
    const actualPaso = this.info.Pasos.find(x => x.Id_Paso == Id_Paso);
    this.response = false;
    let siguientePaso;
    //caso de paso tipo decision
    if (actualPaso.Id_TipoPaso == 2) {
      //lista de los pasos siguientes
      const opcionesSiguientePaso = this.info.FlujoPasos.filter(x => x.CodPaso_Origen == Id_Paso);
      //evaluar expresion de ejecucion para saber que paso sigue 
      for (let op of opcionesSiguientePaso) {
        let Cuestionario = this.info.Cuestionarios.filter(x => x.Id_Paso == op.CodPaso_Origen);
        let exp = '@' + Cuestionario[0].Id_Cuestionario + '.' + Cuestionario[0].Sigla + '==' + this.decisionSeleccionada;
        if (op.ExpresionEjecucion == exp) {
          this.pasoActual = op.CodPaso_Destino;
          //buscar el siguiente paso 
          siguientePaso = this.info.FlujoPasos.filter(x => x.CodPaso_Origen == Id_Paso && x.CodPaso_Destino == op.CodPaso_Destino);
          this.finflujo = siguientePaso[0].finaliza;
          //this.guardaTrazabilidad(Id_Paso, op.CodPaso_Destino);
        } else if (this.decisionSeleccionada === '') {

          this.mensajeCampoCuestionario = this.global.mensajeCampoDecision;
          this.seleccionObligatoria = true;
          this.seleccionPositiva = true;
        }
      }
    } else {
      //buscar el siguiente paso
      siguientePaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == Id_Paso);
      //paso tipo actividad
      this.pasoActual = siguientePaso.CodPaso_Destino;
      this.finflujo = siguientePaso.finaliza;
    }
    //se evalua la existencia de cuestionario o de un proceso en el paso
    if (this.info.Cuestionarios.find(x => x.Id_Paso == this.pasoActual)) {
      this.cuestionarioPaso = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual);
      this.CuestionarioActual = true;
      this.seleccionPositiva = true;
    } else if (this.info.Procesos.find(x => x.Id_Paso == this.pasoActual)) {
      this.procesoPaso = this.info.Procesos.filter(x => x.Id_Paso == this.pasoActual)[0];
      this.ProcesoActual = true;
    }
    if (this.finflujo) {
      this.seleccionPositiva = true;
    }
    this.decisionSeleccionada = '';

    this.decisionActual = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual)[0];
  }
  /**
   * Funcion que realiza la opcion atras del flujo presentando el paso anterior  
   *
   * @Param Id_Paso: id del paso actual
   * @returns pasoActual: id del paso anterior que sera visualizado 
   */
  Atras(Id_Paso: number) {
    this.limpiarVariables();
    this.response = false;
    // servicio para validar historial
    let url = this.URL + 'atencion/lastStep/' + this.atencionService.idAtencion;
    this.atencionService.getData(url).toPromise().then((data: IRecordResponse) => {
      //Asignacion de la data en un arreglo
      var newArray = [];
      for (var i in data.recordset) {
        newArray.push(data.recordset[i]);
      }
      this.mapaTrazabilidad = [];
      // validacion donde elimina pasos superiores o iguales al actual del historial
      for (let i = 0; i < newArray.length; i++) {
        if (!((newArray[i].CodPaso > Id_Paso) || (newArray[i].CodPaso == Id_Paso))) {
          this.mapaTrazabilidad.push(newArray[i]);
        }
      }
      // eleccion del maximo Id_AtencionPaso
      let max = 0;
      for (let i in this.mapaTrazabilidad) {
        var y = + this.mapaTrazabilidad[i].Id_AtencionPaso;
        if (y > max) {
          max = y; 
        }
      }
      var regPasoAnterior = this.mapaTrazabilidad.find(x => x.Id_AtencionPaso == max);
      const anteriorPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == Id_Paso && x.CodPaso_Origen == regPasoAnterior.CodPaso);
      this.pasoActual = anteriorPaso.CodPaso_Origen;
      this.actualPaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == regPasoAnterior.CodPaso);
      ////////////////////////////////////////////////////////
      //se evalua la existencia de cuestionario o de un proceso en el paso
      if (this.info.Cuestionarios.find(x => x.Id_Paso == this.pasoActual)) {
        this.cuestionarioPaso = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual);
        this.CuestionarioActual = true;
      } else if (this.info.Procesos.find(x => x.Id_Paso == this.pasoActual)) {
        this.procesoPaso = this.info.Procesos.filter(x => x.Id_Paso == this.pasoActual)[0];
        this.ProcesoActual = true;
      }
      //se evalua si el anterior paso finaliza la atencion
      if (this.actualPaso.finaliza) {
        this.actualPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == this.pasoActual);
      }
      this.seleccionObligatoria = false;
      this.seleccionPositiva = false;
      this.finflujo = this.actualPaso.finaliza;
      this.decisionActual = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual)[0];
      ///////////////////////////////////////////////////////

    })
  }


  /**
   * Funcion que realiza la limpieza de las variables para seguir con el proceso 
   *
   * @Param 
   * @return variables limpias de objeros o parametros
   */
  limpiarVariables() {
    this.CuestionarioActual = false;
    this.ProcesoActual = false;
    this.cuestionarioPaso = [];
    this.procesoPaso = [];
    this.finflujo = false;
    this.atencionCuestionario = [];
  }

  /**
   * Funcion que realiza la ejecucion del proceso
   *
   * @Param event: variable que identifica el id del proceso a ejecutar
   * @return atencionService: respuesta del proceso ejecutado
   */
  ejecutarProceso(event) {
    this.consumirProceso = {
      "Id_Proceso": this.procesoPaso.Id_Proceso,
      "TipoServicio": this.procesoPaso.Servicio,
      "Servicio": "http://localhost:3000/api/proceso/fake/ok"
    };
    this.response = true;
    this.url = this.URL + 'proceso/fake/';
    this.atencionService.postData(this.url, this.consumirProceso).subscribe((data: IServiceResponse) => {
      this.respuestaProcesoActual = data;
      return this.respuestaProcesoActual;
    })
  }

  /**
   * Funcion que realiza el registro del seguimiento e los pasos ejecutados
   *
   * @Param Id_Paso: id del paso actual
   * @return data: respuesta de la ejecucion de registro del paso
   */
  RegistrarAtencionPaso(Id_Paso: number) {
    //regitrar en bd y validar paso anterior
    let atencionProceso;
    let atencionProcesoSalida;
    let atencionCampo;
    // Armar JSON paso registro de Atencion Paso
    let atencionPaso = {
      CodAtencion: this.atencionService.idAtencion,
      CodPaso: Id_Paso,
      Secuencia: 1,
      Soluciona: this.atencionSoluciona
    };
    // informacion para determinar que contiene el paso a registrar
    const cuestionario = this.info.Cuestionarios.find(x => x.Id_Paso == Id_Paso);
    const proceso = this.info.Procesos.find(x => x.Id_Paso == Id_Paso);
    // Si el paso tiene un proceso
    if (proceso) {
      const respuestaProceso = this.respuestaProcesoActual.data.response;
      atencionProceso = {
        CodProceso: proceso.Id_Proceso,
        TipoServicio: proceso.TipoServicio,
        Servicio: proceso.Servicio,
        Request: proceso.TipoServicio,
        Response: respuestaProceso
      };
      atencionProcesoSalida = {
        CodProcesoSalida: proceso.Id_ProcesoSalida,
        Valor: respuestaProceso
      };
    } else {
      atencionProceso = {
        "CodAtencionPaso": "",
        "CodProceso": "",
        "TipoServicio": "",
        "Servicio": "",
        "Request": "",
        "Response": ""
      };
      atencionProcesoSalida = {
        "CodProcesoSalida": "",
        "Valor": ""
      };
    }
    // Si el paso tiene cuestionario
    if (cuestionario) {
      atencionCampo = this.atencionCuestionario;
      if (!this.atencionCuestionario) {
        atencionCampo = [{
          "CodCuestionarioCampo": "",
          "ValorCampo": ""
        }];
      }
    } else {
      atencionCampo = [{
        "CodCuestionarioCampo": "",
        "ValorCampo": ""
      }];
    }
    // Arma Obj para registro del paso
    // Variable para envio del la informacion
    let data = [{
      atencionPaso: atencionPaso,
      atencionProceso: atencionProceso,
      atencionProcesoSalida: atencionProcesoSalida,
      atencionCampo: atencionCampo
    }];
    this.url = this.URL + 'atencion-paso-campo/create';
    //Registro de atencion paso y retorno del ID ATENCION PASO creado
    this.atencionService.postData(this.url, data).toPromise().then((res: IServiceResponse) => {
      if (res.data.status == 200 && this.atencionSoluciona == "0") {
        //llamar al siguiente paso
        this.Siguiente(Id_Paso);
      }
    });
  }

  /**
    * metodo que realiza la finalizaciond ell metodo
    * la 
    * @param Id_Paso 
    */
  finalizarAtencion(Id_Paso: number) {
    this.pasoActual = 0;
    if (this.decisionSeleccionada != '') {
      this.atencionSoluciona = this.decisionSeleccionada;
      // Se realiza el registro del paso final
      this.RegistrarAtencionPaso(Id_Paso);
      this.atencionComponente = false;
      localStorage.setItem('dataFlujoCat', '');
      //Se redirije a la pagina de inicio 
      this.router.navigate(['home/componet']);
    } else {
      console.log('seleccione una opcion');
    }
  }

}

