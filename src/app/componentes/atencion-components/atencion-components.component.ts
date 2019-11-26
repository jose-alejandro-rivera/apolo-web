import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { PasoService } from '../../servicios/paso.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { PasoMockService } from '../../mocks/paso.service.mock.service';

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
  atencionComponente: Boolean;
  botonAtras: Boolean;
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
  atencionCuestionario: any;
  response: any;
  finflujo: Boolean;
  consumirProceso: any;

  pruebaproceso:any;

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
    //let url = URL + 'flujo/list/' + this.idFlujo;

    /*this.atencionService.getData(url).subscribe((data: any) => {
        //validacion existencia de datos
        if (data) {
          this.listFlujoPaso = data;
          for (let listPasos of this.listFlujoPaso[0]) {
            for (let listaPaso of listPasos.pasos) {
              if (listaPaso.pasosProceso.Id_Paso == this.seleccion) {
                this.tipoPaso = listaPaso.pasosProceso.NomPaso;
                this.definicionPaso = listaPaso.pasosProceso.Descripcion;
                for (let cuestionarioPasos of listaPaso.cuestionario.CuestionarioCampo) {
                  this.pasoCargue = {
                    "descripcionActividad": cuestionarioPasos.campos.Descripcion,
                    "tipoCampo": cuestionarioPasos.campos.tipo,
                    "Longitud": cuestionarioPasos.campos.Longitud,
                    "Obligatorio": cuestionarioPasos.CuestionarioCampo.Obligatorio
                  };
                  this.subsPasos.push(this.pasoCargue);
                }
              }
            }
          }
          localStorage.setItem('dataFlujoCat', '');
        } else {
          console.log("proceso seleccionado sin pasos");
        }
      });*/
    this.primerPaso();
  }

  primerPaso() {
    this.info = this.pasoMockService.FlujoData[0];
    //inicializacion del paso actual o primer paso
    this.pasoActual = this.info.Flujo[0].CodPaso_Inicial;
    this.flujoPaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == this.pasoActual);
    //se evalua la existencia de cuestionario o proceso en el paso
    this.codComponentePasos = this.info.Pasos.find(x => x.Id_Paso == this.pasoActual);
    //se verifica la relacion de los pasos 
    if (this.codComponentePasos.CodCuestionario) {
      this.cuestionarioPaso = this.info.paso_cuestionario.filter(x => x.pasoCuestionario.Id_Cuestionario == this.codComponentePasos.CodCuestionario);
    } else if (this.codComponentePasos.CodProceso) {
      this.procesoPaso = this.info.Procesos.find(x => x.Id_Proceso == this.codComponentePasos.CodProceso);
    }
    this.finflujo = this.flujoPaso.Finaliza;
    this.decisionActual = this.info.paso_cuestionario[2];
  }



  resultadoCuestionario(event) {
    // this.decisionSeleccionada = value;
    for (let campoCuestionario of this.cuestionarioPaso) {
      if (campoCuestionario.pasoCuestionarioCampo.Id_CuestionarioCampo == event.getItem) {
        const pasoCuestionarioCampo = {
          "CodAtencionCampo": campoCuestionario,
          "CodCuestionarioCampo": campoCuestionario,
          "ValoCampo": event.target.value,
        };
        this.atencionCuestionario.push(pasoCuestionarioCampo);
      }
    }
  }

  DecisionSeleccionada(value) {
    this.decisionSeleccionada = value;
  }

  Siguiente(Id_Paso: number) {
    //buscar el siguiente paso
    const siguientePaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == Id_Paso);
    //buscar el siguiente paso
    const actualPaso = this.info.Pasos.find(x => x.Id_Paso == Id_Paso);
    this.response = false;
    //caso de paso tipo decision
    if (this.info.Pasos.find(x => x.Id_Paso == Id_Paso).CodTipoPaso == 2) {
      const opcionesSiguientePaso = this.info.FlujoPasos.filter(x => x.CodPaso_Origen == Id_Paso); //lista de posibles pasos siguientes
      //evaluar expresion de ejecucion para saber que paso sigue 
      for (let op of opcionesSiguientePaso) {
        let exp = '@' + actualPaso.CodCuestionario + '.' + this.decisionActual.pasoCuestionarioCampo.Sigla + '==' + this.decisionSeleccionada;
        if (op.ExpresionEjecucion == exp) {
          this.pasoActual = op.CodPaso_Destino;

          //se evalua la existencia de cuestionario en el paso
          this.codComponentePasos = this.info.Pasos.find(x => x.Id_Paso == this.pasoActual);
          if (this.codComponentePasos.CodCuestionario) {
            this.cuestionarioPaso = this.info.paso_cuestionario.filter(x => x.pasoCuestionario.Id_Cuestionario == this.codComponentePasos.CodCuestionario);
          } else if (this.codComponentePasos.CodProceso) {
            this.procesoPaso = this.info.Procesos.find(x => x.Id_Proceso == this.codComponentePasos.CodProceso);
          }
          this.finflujo = siguientePaso.Finaliza;
        }
      }
    } else {
      //paso tipo actividad
      this.pasoActual = siguientePaso.CodPaso_Destino;
      //se evalua la existencia de cuestionario en el paso
      this.codComponentePasos = this.info.Pasos.find(x => x.Id_Paso == this.pasoActual);
      if (this.codComponentePasos.CodCuestionario) {
        this.cuestionarioPaso = this.info.paso_cuestionario.filter(x => x.pasoCuestionario.Id_Cuestionario == this.codComponentePasos.CodCuestionario);
      } else if (this.codComponentePasos.CodProceso) {
        this.procesoPaso = this.info.Procesos.find(x => x.Id_Proceso == this.codComponentePasos.CodProceso);
      }
      this.finflujo = siguientePaso.Finaliza;

      this.decisionActual = this.info.paso_cuestionario[2];
    }

  }

  ejecutarProceso(event) {
    // this.decisionSeleccionada = value;
    this.consumirProceso = {
      "Id_Proceso":this.procesoPaso.Id_Proceso,
      "TipoServicio":this.procesoPaso.Servicio,
      "Servicio": "http://localhost:3000/api/proceso/fake/ok"
     };
    this.response = true;
    let url = URL + 'proceso/fake/';
    this.atencionService.postData(url, this.consumirProceso).subscribe(data => {
      this.pruebaproceso=data;

      return this.pruebaproceso;
    })


  }

  Atras(Id_Paso: number) {
    this.response = false;
    const anteriorPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == Id_Paso);
    this.pasoActual = anteriorPaso.CodPaso_Origen;
    const actualPaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == this.pasoActual);
    this.codComponentePasos = this.info.Pasos.find(x => x.Id_Paso == this.pasoActual);
    this.finflujo = actualPaso.Finaliza;
    if (this.codComponentePasos.CodCuestionario) {
      this.cuestionarioPaso = this.info.paso_cuestionario.filter(x => x.pasoCuestionario.Id_Cuestionario == this.codComponentePasos.CodCuestionario);
      const actualPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == this.pasoActual);
      this.finflujo = actualPaso.Finaliza;
    } else if (this.codComponentePasos.CodProceso) {
      this.procesoPaso = this.info.Procesos.find(x => x.Id_Proceso == this.codComponentePasos.CodProceso);
      this.finflujo = actualPaso.Finaliza;
    }
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
      const procesoSalida  =  this.info.ProcesosSalida.find(x => x.CodProceso == paso.CodProceso);
      atencionProcesoSalida = {
        CodProcesoSalida: procesoSalida.Id_ProcesoSalida,
        Valor: ""
      };

    }

    // Si el paso tiene cuestionario
    if (paso.CodCuestionario) {
      //recorre todos los campos del cuestionario asociado
      const listaPreguntas = this.info.paso_cuestionario.filter(x => x.paso_cuestionario.Id_Paso == Id_Paso);
      atencionCampo = {
        CodAtencionPaso: "1",
        CodCuestionarioCampo: "1",
        ValorCampo: "1"
      };

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


  finalizarAtencion(event){

    this.pasoActual = 0;
    this.decisionSeleccionada = 0;

  }

}
