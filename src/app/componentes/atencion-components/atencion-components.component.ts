import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnDestroy, ɵConsole } from '@angular/core';
import { PasoService } from '../../servicios/paso.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { PasoMockService } from '../../mocks/paso.service.mock.service';
import { Subject, Subscription } from 'rxjs';

const URL = 'http://localhost:8080/api/';

@Component({
  selector: 'app-atencion-components',
  templateUrl: './atencion-components.component.html',
  styleUrls: ['./atencion-components.component.css']
})
export class AtencionComponentsComponent implements OnInit {
  flujo: any[] = []; // 
  seleccion: number;
  tipoPaso: any;
  listFlujoPaso: any;
  definicionPaso: any; // 
  cuestionarioPasos: any;
  pasoCargue: any;
  atencionComponente: boolean;
  botonAtras: boolean;
  subsPasos: any[] = [];
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
  consumirProceso: any;

  pruebaproceso: any;
  ListaPasos = [];
  CuestionarioActual: boolean;
  ProcesoActual: boolean;
  actualPaso: any;


  constructor(private pasosFlujo: PasoService,
    private atencionService: EjecucionAtencionService,
    private pasoMockService: PasoMockService,
    private router: Router

  ) {
    this.atencionComponente = true;
    this.botonAtras = false;
  }
  //metodo que valida el listado de los campos 
  ngOnInit() {
    this.seleccion = 1;
    this.dataFlujoCat = JSON.parse(localStorage.getItem('dataFlujoCat'));
    this.idFlujo = this.dataFlujoCat.Id_Flujo;
    this.nombreFlujo = this.dataFlujoCat.NomFlujo;
    let url = URL + 'flujo/list/' + this.idFlujo;

    return this.atencionService.getData(url).toPromise().then(data => {
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

  resultadoCuestionario(event, IdCuestionarioCampo: number) {

    //resultado de la seleccion del cuestionario
    const selectCuestionarioCampo = {
      CodCuestionarioCampo: IdCuestionarioCampo,
      ValorCampo: event.target.value
    };
    //validacion de la existencia del campoCuestionario guardado
    if (this.atencionCuestionario.find(x=> x.CodCuestionarioCampo==IdCuestionarioCampo)){
      for(let i=0;i<this.atencionCuestionario.length;i++){
        if(this.atencionCuestionario.find(x=> x.CodCuestionarioCampo==IdCuestionarioCampo)){
          this.atencionCuestionario[i]=selectCuestionarioCampo;
        }
      }
    }else{
      this.atencionCuestionario.push(selectCuestionarioCampo);
    }
  }

  DecisionSeleccionada(value) {
    this.decisionSeleccionada = value;
  }

  Siguiente(Id_Paso: number) {
    this.limpiarVariables();
    //buscar el siguiente paso
    const siguientePaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == Id_Paso);
    //buscar el siguiente paso
    const actualPaso = this.info.Pasos.find(x => x.Id_Paso == Id_Paso);
    this.response = false;

    //caso de paso tipo decision
    if (actualPaso.Id_TipoPaso == 2) {
      const opcionesSiguientePaso = this.info.FlujoPasos.filter(x => x.CodPaso_Origen == Id_Paso); //lista de posibles pasos siguientes
      //evaluar expresion de ejecucion para saber que paso sigue 
      for (let op of opcionesSiguientePaso) {
        let Cuestionario = this.info.Cuestionarios.filter(x => x.Id_Paso == op.CodPaso_Origen);
        let exp = '@' + Cuestionario[0].Id_Cuestionario + '.' + Cuestionario[0].Sigla + '==' + this.decisionSeleccionada;
        if (op.ExpresionEjecucion == exp) {
          this.pasoActual = op.CodPaso_Destino;
        }
      }
    } else {
      //paso tipo actividad
      this.pasoActual = siguientePaso.CodPaso_Destino;
    }

    //se evalua la existencia de cuestionario o de un proceso en el paso
    if (this.info.Cuestionarios.find(x => x.Id_Paso == this.pasoActual)) {
      this.cuestionarioPaso = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual);
      this.CuestionarioActual = true;
    } else if (this.info.Procesos.find(x => x.Id_Paso == this.pasoActual)) {
      this.procesoPaso = this.info.Procesos.filter(x => x.Id_Paso == this.pasoActual)[0];
      this.ProcesoActual = true;
    }
    this.finflujo = siguientePaso.finaliza;
    this.decisionActual = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual)[0];
  }

  Atras(Id_Paso: number) {
    this.limpiarVariables();
    this.response = false;
    const anteriorPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == Id_Paso);
    this.pasoActual = anteriorPaso.CodPaso_Origen;
    this.actualPaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == this.pasoActual);
    //se evalua la existencia de cuestionario o de un proceso en el paso
    if (this.info.Cuestionarios.find(x => x.Id_Paso == this.pasoActual)) {
      this.cuestionarioPaso = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual);
      this.CuestionarioActual = true;
    } else if (this.info.Procesos.find(x => x.Id_Paso == this.pasoActual)) {
      this.procesoPaso = this.info.Procesos.filter(x => x.Id_Paso == this.pasoActual)[0];
      this.ProcesoActual = true;
    }
    //se evalua si el anterior paso finaliza la atencion
    if (this.actualPaso.finaliza == true) {
      this.actualPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == this.pasoActual);
    }
    this.finflujo = this.actualPaso.finaliza;
    this.decisionActual = this.info.Cuestionarios.filter(x => x.Id_Paso == this.pasoActual)[0];
  }


  limpiarVariables() {
    this.CuestionarioActual = false;
    this.ProcesoActual = false;
    this.cuestionarioPaso = [];
    this.procesoPaso = [];
  }

  ejecutarProceso(event) {
    // this.decisionSeleccionada = value;
    this.consumirProceso = {
      "Id_Proceso": this.procesoPaso.Id_Proceso,
      "TipoServicio": this.procesoPaso.Servicio,
      "Servicio": "http://localhost:3000/api/proceso/fake/ok"
    };
    this.response = true;
    let url = URL + 'proceso/fake/';
    this.atencionService.postData(url, this.consumirProceso).subscribe(data => {
      this.pruebaproceso = data;
      return this.pruebaproceso;
    })


  }


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
      Soluciona: 0
    };
    // informacion para determinar que contiene el paso a registrar
    const paso = this.info.Pasos.find(x => x.Id_Paso == Id_Paso);

    // Si el paso tiene un proceso
    if (paso.CodProceso) {
      const proceso = this.info.Procesos.find(x => x.Id_Proceso == paso.CodProceso);
      atencionProceso = {
        CodProceso: paso.CodProceso,
        TipoServicio: proceso.TipoServicio,
        Servicio: proceso.Servicio,
        Request: "",
        Response: ""
      };
      const procesoSalida = this.info.ProcesosSalida.find(x => x.CodProceso == paso.CodProceso);
      atencionProcesoSalida = {
        CodProcesoSalida: procesoSalida.Id_ProcesoSalida,
        Valor: ""
      };

    }

    // Si el paso tiene cuestionario
    if (paso.CodCuestionario) {
      
      atencionCampo = [
        this.atencionCuestionario
      ];

    }

    // Arma Obj para registro del paso
    // Variable para envio del la informacion
    let data = [{
      atencionPaso: [atencionPaso],
      atencionProceso: [atencionProceso],
      atencionProcesoSalida: [atencionProcesoSalida],
      atencionCampo: [atencionCampo]
    }];
    console.log(data);

    // Limpiar variables 
    //this.pasoActual = 0;
    //this.decisionSeleccionada = 0;

    //Registro de atencion paso y retorno del ID ATENCION PASO creado
    //llamar al siguiente paso
    this.Siguiente(Id_Paso);
  }


  finalizarAtencion(event) {

    this.pasoActual = 0;
    this.decisionSeleccionada = 0;

  }

}
