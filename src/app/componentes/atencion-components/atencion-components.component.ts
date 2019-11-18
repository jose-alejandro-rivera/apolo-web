import { Component, OnInit } from '@angular/core';
import { PasoService } from '../../servicios/paso.service';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';

const URL = 'http://localhost:8080/api/';

@Component({
  selector: 'app-atencion-components',
  templateUrl: './atencion-components.component.html',
  styleUrls: ['./atencion-components.component.css']
})
export class AtencionComponentsComponent implements OnInit {

  flujo: any[] = []; // 
  seleccion: number;
  input: number;
  listFlujoPaso: any;
  definicionPaso: any; // 
  cuestionarioPasos: any;
  pasoCargue: any;
  atencionCom: Boolean;
  subsPasos: any[] = [];
  dataFlujoCat: any;
  idFlujo: any;
  nombreFlujo: any;



  constructor(private pasosFlujo: PasoService, private router: Router

  ) {
    this.atencionCom = true;
  }

  ngOnInit() {
    debugger;
    this.seleccion = 1;
    this.dataFlujoCat = JSON.parse(localStorage.getItem('dataFlujoCat'));
    this.idFlujo = this.dataFlujoCat.Id_Flujo;
    this.nombreFlujo = this.dataFlujoCat.NomFlujo;

    this.pasosFlujo.getPasos(this.idFlujo).subscribe((data) => {

      //validacion existencia de datos
      if (data) {
        this.listFlujoPaso = data;
        for (let listPasos of this.listFlujoPaso[0]) {
          for (let elemento of listPasos.pasos) {
            if (elemento.pasosProceso.Id_Paso == this.seleccion) {
              this.definicionPaso = elemento.pasosProceso.NomPaso;
              for (let cuestionarioPasos of elemento.cuestionario.CuestionarioCampo) {
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

  carguePasoSiguienteFlujo(element) {
    debugger;
    this.seleccion += 1;

  }


}
