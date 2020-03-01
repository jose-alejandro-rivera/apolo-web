import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy, ɵConsole } from '@angular/core';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { IServiceResponse } from '../../interfaces/serviceResponse';
import { Router, Event, RouterStateSnapshot } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { IRecordResponse } from '../../interfaces/recordResponse';
import { Integracion } from '../../integraciones/integracion.service';
import { IntegracionCamaraComponent } from '../integracion-camara/integracion-camara.component';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject, from } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegistroFotograficoService } from '../../servicios/registro-fotografico.service'

@Component({
  selector: 'app-atencion-components',
  templateUrl: './atencion-components.component.html',
  styleUrls: ['./atencion-components.component.css'],
  providers: [AppGlobals, Integracion, IntegracionCamaraComponent]
})
/**
 * provee la injeccion de los componentes del flujo seleccionado
 */
export class AtencionComponentsComponent implements OnInit {

  @Output()
  public pictureTaken = new EventEmitter<WebcamImage>();

  loading: Boolean;
  atencionComponente: boolean;
  dataFlujoCat: any;
  idFlujo: any;
  nombreFlujo: any;
  info: any;
  pasoActual: any;
  decisionActual: any;
  decisionSeleccionada: any;
  cuestionarioPaso: any[] = [];
  procesoPaso: any;
  flujoPaso: any;
  codComponentePasos: any;
  atencionCuestionario: any[] = [];
  response: any;
  finflujo: boolean;
  integracionProceso: any;
  pruebaproceso: any;//validar con el proceso de crear
  respuestaProcesoActual: any; //IServiceResponse = { data: { status: 200, response: "1" } };
  ListaPasos = [];
  CuestionarioActual: boolean;
  ProcesoActual: boolean;
  actualPaso: any;
  atencionSoluciona: any;
  URL: any;
  seleccionObligatoria: boolean;
  mensajeCampoCuestionario: any;
  seleccionPositiva: boolean;
  mapaTrazabilidad: any[] = [];
  dataFlujoOrden: any;
  orden: any;
  ordenActivity: any;
  seleccionCampo: any;
  retoma: any;
  url: any;
  parametrosPoceso: any;
  procesoMensage: Boolean;
  procesButton: Boolean;
  responseFinalliza: any;
  paramFinaliza: any;
  public webCamIntegracion = false;

  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public tomaFoto = true;
  public eliminaFoto = false;
  public webcamImage = true;
  public srcImg: any;
  private numpasoFoto: any;
  private numOrdenFoto: any;
  private dataRegistroFoto: Object|any;
  public cargarFoto : number;
  private dataRegistroFotografico: any;
  private nombreFoto: any;
  public  seleccionInactiva : boolean = true;
  private seleccionActiva : boolean;
  private fotoCargada: boolean= false;



  /**
   * 
   * @param atencionService 
   * @param router 
   */
  constructor(
    private registroFotograficoService: RegistroFotograficoService,
    private atencionService: EjecucionAtencionService,
    private router: Router,
    private global: AppGlobals,
    private integracionProces: Integracion,
    private integracionCamaraComponent: IntegracionCamaraComponent,
    private http: HttpClient
  ) {
    this.atencionComponente = true;
    this.atencionSoluciona = "0";
    this.URL = this.global.url;
    this.seleccionObligatoria = false;
    this.seleccionPositiva = false;
    this.procesoMensage = true;
    this.procesButton = false;
    this.loading = false;
  }


  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];
  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  /**
  * Funcion que retorna el listado de 
  *
  * @Params dataFlujoCat: objeto de memoria donde se obtiene el id del formulario 
  * @returns flujoPaso: listado de pasos relacionados con el flujo con sus respectivos procesos y cuestionarios
  */
  ngOnInit() {
    this.dataFlujoOrden = JSON.parse(localStorage.getItem('dataFlujoOrden'));
    this.orden = this.dataFlujoOrden.formOrden.orden;
    this.ordenActivity = this.dataFlujoOrden.activityId;
    WebcamUtil.getAvailableVideoInputs()
    if (this.dataFlujoOrden.retomaOrden) {
      this.listRetoma();
    } else {
      this.dataFlujoCat = JSON.parse(localStorage.getItem('dataFlujoCat'));
      this.listFlujo();
    }
  }

  listFlujo() {
    this.seleccionPositiva = true;
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
        this.seleccionPositiva = true;
      }
      this.finflujo = this.flujoPaso.finaliza;
    });
  }
  listRetoma() {
    // debugger
    let url = this.URL + 'retoma/apolo/' + this.orden + '/' + this.dataFlujoOrden.formOrden.param;
    return this.atencionService.getData(url).toPromise().then(data => {
      let info = data;
      return info;
    }).then(data => {
      this.retoma = data;
      if(this.retoma.status == 201){
        this.router.navigate(['home/orden']);
        return 0
      }
      this.info = this.retoma.recordsets;
      this.info = this.info[0];
      this.info = this.info[0];
      let retomaPasoActual = this.retoma.rowsAtaencionPaso;
      this.idFlujo = this.info.Id_Flujo;
      this.nombreFlujo = this.info.NomFlujo;
      if (retomaPasoActual) {
        this.pasoActual = retomaPasoActual.CodPasoDestino;
      } else {
        this.pasoActual = this.info.CodPaso_Inicial;
      }
      this.atencionService.idAtencion = retomaPasoActual.CodAtencion;
      this.ListaPasos = this.info.Pasos;
      this.flujoPaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == this.pasoActual);
      if (!this.flujoPaso) {
        this.flujoPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == this.pasoActual);
      }
      this.codComponentePasos = this.ListaPasos.find(x => x.Id_Paso == this.pasoActual);
      if (this.info.Cuestionarios.find(x => x.Id_Paso == this.pasoActual)) {
        this.cuestionarioPaso = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual);
        this.CuestionarioActual = true;
        this.seleccionPositiva = true;
      } else if (this.info.Procesos.find(x => x.Id_Paso == this.pasoActual)) {
        this.procesoPaso = this.info.Procesos.filter(x => x.Id_Paso == this.pasoActual)[0];
        this.codComponentePasos = this.ListaPasos.find(x => x.Id_Paso == this.pasoActual);
        this.ActivarDesactivarCamara(this.codComponentePasos.Sigla);
        this.webcamImage = false;
        this.ProcesoActual = true;
        this.seleccionPositiva = true;
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
    this.seleccionInactiva = true;
   // let obtenerFoto = JSON.parse(localStorage.getItem('registroFotografico')); 
    //buscar el siguiente paso a visualizar
    const actualPaso = this.info.Pasos.find(x => x.Id_Paso == Id_Paso);
    
    this.response = false;
    this.loading = false;
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
      this.codComponentePasos = this.ListaPasos.find(x => x.Id_Paso == this.pasoActual);
      this.ActivarDesactivarCamara(this.codComponentePasos.Sigla);
      this.ProcesoActual = true;
      this.seleccionPositiva = true;
      this.fotoCargada = false;
    }
    if (this.finflujo) {
      this.seleccionPositiva = true;
    }
    this.decisionSeleccionada = '';
    this.decisionActual = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual)[0];
    localStorage.setItem('registroFotografico', ''); 
  }


  /**
   * Este metodo evalua si la funcion trae como sigla RGFG
   */
  ActivarDesactivarCamara(sigla: String) {
    if (sigla === 'RGFG') {
      this.webCamIntegracion = true;
      this.procesButton = false;
      this.seleccionInactiva = false;
    } else {
      this.webCamIntegracion = false;
      this.procesButton = true;
      this.seleccionInactiva = true;
    }
  }
  /**
   * Funcion que realiza la opcion atras del flujo presentando el paso anterior  
   *
   * @Param Id_Paso: id del paso actual
   * @returns pasoActual: id del paso anterior que sera visualizado 
   */
   Atras(Id_Paso: any) {
    this.seleccionInactiva = true;
    this.fotoCargada= false;
    let validarREgistrofotografico: Object|any = {
          nombreImgen: this.nombreFoto,
          paso: this.numpasoFoto,
          numOrdenFoto: this.orden
    }
    localStorage.setItem('registroFotografico', JSON.stringify(validarREgistrofotografico)); 
    this.limpiarVariables();
    this.response = false;
    // servicio para validar historial
    let url = this.URL + 'atencion/paso/atras/' + this.atencionService.idAtencion + '/' + Id_Paso;
   //let url = this.URL + 'atencion/lastStep/' + this.atencionService.idAtencion;
    this.atencionService.getData(url).toPromise().then((data: IRecordResponse) => {
      let pasoAtras:Object|any = data.recordset
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

      var CodPasOrigen = this.info.FlujoPasos.find((x) => {
        return parseInt(x.CodPaso_Destino) == parseInt(Id_Paso)
      });
     
      let RACodPaso:any = newArray.find((f) => {
        return parseInt(f.CodPaso) == parseInt(CodPasOrigen.CodPaso_Origen)
      });

      const anteriorPaso = this.info.FlujoPasos.find((x) => {
        return x.CodPaso_Destino == Id_Paso && x.CodPaso_Origen == newArray[0].CodPaso
      });

      this.pasoActual = anteriorPaso.CodPaso_Origen;
      this.actualPaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == newArray[0].CodPaso);
      this.seleccionPositiva = true;
      ////////////////////////////////////////////////////////
      //se evalua la existencia de cuestionario o de un proceso en el paso
      if (this.info.Cuestionarios.find(x => x.Id_Paso == this.pasoActual)) {
        this.cuestionarioPaso = this.info.Cuestionarios.filter((x) => { return x.Id_Paso == this.pasoActual });
        this.CuestionarioActual = true;
      } else if (this.info.Procesos.find(x => x.Id_Paso == this.pasoActual)) {
        this.procesoPaso = this.info.Procesos.filter(x => x.Id_Paso == this.pasoActual)[0];
        this.codComponentePasos = this.ListaPasos.find(x => x.Id_Paso == this.pasoActual);
        this.ActivarDesactivarCamara(this.codComponentePasos.Sigla);
        this.ProcesoActual = true;
        this.seleccionPositiva = true;
      }
      //se evalua si el anterior paso finaliza la atencion
      if (this.actualPaso.finaliza) {
        this.actualPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == this.pasoActual);
      }
      this.seleccionObligatoria = false;
      this.finflujo = this.actualPaso.finaliza;
      this.decisionActual = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual)[0];
      ///////////////////////////////////////////////////////
     
    this.loading=false;
    })
  }

  logArrayElements(element, index, array) {
    return index;
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
    this.procesButton = true;
    this.procesoMensage = true;
    this.seleccionObligatoria = false;
    this.webCamIntegracion = false;
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

    this.loading = true;

    this.pasoDestino(Id_Paso);
    // Armar JSON paso registro de Atencion Paso
    let atencionPaso = {
      CodAtencion: this.atencionService.idAtencion,
      CodPaso: Id_Paso,
      Secuencia: 1,
      Soluciona: this.atencionSoluciona,
      CodPasoDestino: this.flujoPaso.CodPaso_Destino
    };
    // informacion para determinar que contiene el paso a registrar
    const cuestionario = this.info.Cuestionarios.find(x => x.Id_Paso == Id_Paso);
    const proceso = this.info.Procesos.find(x => x.Id_Paso == Id_Paso);
    // Si el paso tiene un proceso
    if (proceso) {
      const respuestaProceso = this.respuestaProcesoActual.response;  
      atencionProceso = {
        CodProceso: proceso.Id_Proceso,
        TipoServicio: respuestaProceso.TipoServicio,
        Servicio: respuestaProceso.Servicio,
        Request: respuestaProceso.request,
        Response: respuestaProceso.response
      };
      atencionProcesoSalida = {
        CodProcesoSalida: proceso.Id_ProcesoSalida,
        Valor: respuestaProceso.statusOrden
      };
    } else {
      atencionProceso = {
        "CodAtencionPaso": "",
        "CodProceso": "",
        "TipoServicio": "",
        "Servicio": "",
        "Request": "",
        "Response": "",
        "NumOrden": ""
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
  async finalizarAtencion(Id_Paso: number) {
    this.ActivarDesactivarCamara('');
    this.pasoActual = 0;
    if (this.decisionSeleccionada != '') {
      this.atencionSoluciona = this.decisionSeleccionada;
      // Se realiza el registro del paso final
      this.paramFinaliza = {
        "XA_LINEAMIENTO_ACT": "1"
      }
      this.url = this.URL + 'integracion/toa/finaliza/rest/' + this.ordenActivity;

      return this.atencionService.pastchData(this.url, this.paramFinaliza)
        .toPromise().then(data => {
          let info = data;
          return info;
        }).then(data => {
          this.respuestaProcesoActual = data;
          if (this.respuestaProcesoActual.response.status == 200) {
            this.RegistrarAtencionPaso(Id_Paso);
            this.atencionComponente = false;
            localStorage.setItem('dataFlujoOrden', '');
            localStorage.setItem('dataFlujoCat', '');
            //Se redirije a la pagina de inicio 
            this.router.navigate(['home/orden']);
            this.global.mensajeOk = true;
            localStorage.setItem('dataFlujoMensajeOk', JSON.stringify(this.global.mensajeOk));
            return this.responseFinalliza;
          } else {
            this.mensajeCampoCuestionario = this.global.mensajeCampoDecision;
            this.seleccionObligatoria = true;
          }

        });
    }
  }
  pasoDestino(Id_Paso: number) {
    const actualPaso = this.info.Pasos.find(x => x.Id_Paso == Id_Paso);
    if (actualPaso.Id_TipoPaso == 2) {
      const opcionesSiguientePaso = this.info.FlujoPasos.filter(x => x.CodPaso_Origen == Id_Paso);
      for (let op of opcionesSiguientePaso) {
        let Cuestionario = this.info.Cuestionarios.filter(x => x.Id_Paso == op.CodPaso_Origen);
        let exp = '@' + Cuestionario[0].Id_Cuestionario + '.' + Cuestionario[0].Sigla + '==' + this.decisionSeleccionada;
        if (op.ExpresionEjecucion == exp) {
          const pasoSiguiente = this.info.FlujoPasos.filter(x => x.CodPaso_Origen == Id_Paso && x.CodPaso_Destino == op.CodPaso_Destino);
          this.flujoPaso = pasoSiguiente[0];
        }
      }
    } else {
      if (this.finflujo) {
        this.flujoPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == Id_Paso);
      } else {
        this.flujoPaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == Id_Paso);
      }
    }
  }
  /**
   * Funcion que realiza la ejecucion del proceso
   *
   * @Param event: variable que identifica el id del proceso a ejecutar
   * @return atencionService: respuesta del proceso ejecutado
   */
  async ejecutarProceso(event) {
    // debugger
    this.loading = true;
    this.codComponentePasos = this.ListaPasos.find(x => x.Id_Paso == this.pasoActual);
    this.integracionProceso = {
      "parametros": {
        "ordenAtivity": this.ordenActivity,
        "paramtros": {
          "value": this.parametrosPoceso || ''
        },
      },
      "sigla": this.codComponentePasos.Sigla || ''
    };
    this.respuestaProcesoActual = await this.integracionProces.proces(this.integracionProceso, this.URL);
    if (this.respuestaProcesoActual.llavePropiedad == 'undefine') {
      this.mensajeCampoCuestionario = this.respuestaProcesoActual.mensajeError;
      this.procesButton = true;
      this.procesoMensage = true;
      this.seleccionObligatoria = true;
      this.seleccionPositiva = false;
    } else if (this.respuestaProcesoActual.llavePropiedad == 'NOOK') {
      this.mensajeCampoCuestionario = this.respuestaProcesoActual.mensajeError;
      this.procesButton = true;
      this.procesoMensage = false;
      this.seleccionObligatoria = true;
    } else {
      this.procesButton = false;
      this.procesoMensage = false;
      this.seleccionObligatoria = false;
      this.seleccionPositiva = false;
    }
    this.loading = false;
  }

  /**
   * 
   * inicio implementacion de la camara
   */

  public triggerSnapshot(): void {
    this.seleccionPositiva = true;
    this.eliminaFoto = false;
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
    this.seleccionPositiva = true;
  }

  public handleInitError(error: WebcamInitError): void {
    this.seleccionPositiva = true;
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.seleccionPositiva = true;
    this.fotoCargada = false;
    this.nextWebcam.next(directionOrDeviceId);
    this.eliminarFoto();
  }

  /**
   * Recibe la imagen de la camara
   * Se asigna el nombre de la imagen
   * Se obtiene el paso y el numero de la orden
   * Se redimensiona la imagen
   */
  public async handleImage(webcamImage: WebcamImage): Promise <any> {
    this.seleccionPositiva = false;
    this.botonTomaFoto(webcamImage.imageAsBase64);
    this.webcamImage = true;
    this.codComponentePasos = this.ListaPasos.find(x => x.Id_Paso == this.pasoActual);
    let nombreImg = this.codComponentePasos.NomPaso;
    nombreImg = nombreImg.substr(0, 20);
    let otrosDatos = this.codComponentePasos;
    this.numpasoFoto = otrosDatos.Id_Paso;
    this.numOrdenFoto = this.orden;
    let fecAct = this.fechaActual();
    this.nombreFoto = nombreImg + '_' + this.numpasoFoto + '_' + this.numOrdenFoto;
    this.pictureTaken.emit(webcamImage);
    this.srcImg = webcamImage.imageAsDataUrl;
       this.dataRegistroFoto = {
        nombreImgen: this.nombreFoto,
        imagen: webcamImage.imageAsDataUrl
      };
  }
/**
 * Se envia la foto al servicio de registro fotografico
 */
  public guardarFoto(){
    this.seleccionPositiva = true;
    this.url =  `${this.URL}registro/fotografico/${this.numOrdenFoto}/${this.numpasoFoto}`;
    this.registroFotograficoService.postRegistroFotografico(this.url, this.dataRegistroFoto).toPromise().then((res: any) => {
      let response: Object|any = res;
      if (response.status == 200){
        this.seleccionPositiva = false;
        this.webcamImage = false;
        this.tomaFoto = true;
        this.eliminaFoto= false;
        this.seleccionInactiva = false;
        this.respProcesoActual();
      }else if(response.status == 201){
        this.fotoCargada = true;
        this.tomaFoto = true;
        this.eliminaFoto= false;
        this.seleccionPositiva = true;
        this.actualizarFoto();
        this.respProcesoActual();
      }else{
        this.fotoCargada = false;
        this.respProcesoActual();
        return 0;
      }
      this.cargarFoto = 205;
    });
  } 

  public respProcesoActual(){
    this.respuestaProcesoActual={
      "response":{
          "TipoServicio": '',
          "Servicio":'',
          "Request": '',
          "Response": '',
      },
      "llavePropiedad": 'OK'
  }
  }
  /**
   * Funcion que permite actualizar el registro fotografico (sobreescribe)
   */
  public actualizarFoto(){
    this.seleccionPositiva = true;
    this.fechaActual();
    this.url =  `${this.URL}registro/fotografico/${this.numOrdenFoto}/${this.numpasoFoto}`;
    this.registroFotograficoService.pastchRegistroFotografico(this.url, this.dataRegistroFoto).toPromise().then((res: any) => {
      let response: Object|any = res;
      if (response.status == 200){
        this.seleccionPositiva = false;
        this.seleccionInactiva = true;
        this.fotoCargada = true;
        this.webcamImage = false;
        this.tomaFoto = true;
        this.eliminaFoto= false;
        this.respProcesoActual();
      }else if(response.status == 201){
        this.fotoCargada = true;
        this.webcamImage = false;
        this.tomaFoto = true;
        this.seleccionPositiva = false;
        this.eliminaFoto= false;
      }else{
        this.fotoCargada = false;
        this.respProcesoActual();
        this.cargarFoto = 205;
        return 0;
      }
    });
 
 }
  
  /**
   * Funcion que activa el gif de carga en la web
   * @param cargarFoto
   * 
   */
  public gifCargandoDatos(){
    if(this.cargarFoto == 200 || this.cargarFoto == 201){
      this.loading = false;
    }else{
      this.loading = true;
    }
  }

  /**
   * 
   * Acciones que se ejecutan al boton de la camara tomar foto
   */
  public botonTomaFoto(imagen: String) {
    this.fotoCargada= false;
    this.seleccionPositiva = true;
    if (imagen != '') {
      this.tomaFoto = false;
      this.eliminaFoto = true;
      this.webcamImage = true;   
      
    } else {
      this.eliminaFoto = false;
     
    }
  }

  /**
   * Activa o desactiva boton eliminar foto
   */
  public eliminarFoto() {
    this.eliminaFoto = false;
    this.tomaFoto = true;
    this.webcamImage = false;
    this.codComponentePasos = null;
    this.webcamImage = null;
    this.seleccionInactiva = false;
  }

  /**
   * Se obtiene la fecha actual
   * 
   */
  public fechaActual() {
    let fechaact = new Date();
    let fecAct = fechaact.toString();
    let fecActmod = this.eliminaEspacios(fecAct);
    return fecActmod;
  }
  /**
   * 
   * Este metodo elimina espacios en String de 0 - 16 caracteres iniciales
   */
  public eliminaEspacios(cadena: any) {
    let inicio = 3;
    let fin = 16;
    let subCadena = cadena.substring(inicio, fin);
    let sub = subCadena.replace(/ /g, "");
    return sub;
  }

  public cameraWasSwitched(deviceId: string): void {
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }
  
  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }
}

