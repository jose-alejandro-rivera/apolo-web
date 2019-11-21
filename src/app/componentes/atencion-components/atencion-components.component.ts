import { Component, OnInit } from '@angular/core';
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

    this.atencionService.getData(url).subscribe((data: any) => {
      //validacion existencia de datos
      if (data) {
        this.listFlujoPaso = data;
        for (let listPasos of this.listFlujoPaso[0]) {
          for (let listaPaso of listPasos.pasos) {
            if (listaPaso.pasosProceso.Id_Paso == this.seleccion) {
              this.tipoPaso = listaPaso.pasosProceso.NomPaso;
              this.definicionPaso = listaPaso.pasosProceso.describcion;
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
    });

    console.log("Informacion nuevo arreglo");
    this.info = this.pasoMockService.FlujoData[0];
    //inicializacion del paso actual o primer paso
    this.pasoActual = this.info.Flujo[0].CodPaso_Inicial;
    this.decisionActual = this.info.paso_cuestionario[2];
  }

  DecisionSeleccionada(value) {
    this.decisionSeleccionada = value;
  }

  Siguiente(Id_Paso: number) {
    //regitrar en bd y validar paso anterior

    //buscar el siguiente paso
    const siguientePaso = this.info.FlujoPasos.find(x => x.CodPaso_Origen == Id_Paso);
    //buscar el siguiente paso
    const actualPaso = this.info.Pasos.find(x => x.Id_Paso == Id_Paso);

    //caso de paso tipo decision
    if (this.info.Pasos.find(x => x.Id_Paso == Id_Paso).CodTipoPaso == 2) {
      const opcionesSiguientePaso = this.info.FlujoPasos.filter(x => x.CodPaso_Origen == Id_Paso); //lista de posibles pasos siguientes
      console.log(opcionesSiguientePaso);
      //evaluar expresion de ejecucion para saber que paso sigue 
      for(let op of opcionesSiguientePaso){
        let exp = '@' + actualPaso.CodCuestionario + '.' + this.decisionActual.pasoCuestionarioCampo.Sigla + '==' + this.decisionSeleccionada;
        if(op.ExpresionEjecucion == exp){
          this.pasoActual = op.CodPaso_Destino;
        }
      }
      //this.decisionActual = this.info.paso_cuestionario.find(x => x.paso_cuestionario.Id_Paso == Id_Paso);

    } else {
      //paso tipo actividad
      this.pasoActual = siguientePaso.CodPaso_Destino;
    }

  }

  Atras(Id_Paso: number) {
    console.log(Id_Paso);
    const anteriorPaso = this.info.FlujoPasos.find(x => x.CodPaso_Destino == Id_Paso).CodPaso_Origen;
    this.pasoActual = anteriorPaso;
  }

  RegistrarAtencion() {
    //limpiar variables 
    this.pasoActual = 0;
    this.decisionSeleccionada = 0;
  }

  cargeuPasoFlujo() {

    this.seleccion = 1;
    this.pasosFlujo.getPasos(1).subscribe((data) => {

      //validacion existencia de datos
      if (data) {
        this.listFlujoPaso = data;

      }

    });
  }



}
