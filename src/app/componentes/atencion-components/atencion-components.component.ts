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



  constructor(private pasosFlujo: PasoService, private atencionService: EjecucionAtencionService, private router: Router

  ) {
    this.atencionComponente = true;
    this.botonAtras = false;
  }
  //metodo que valida el listado de los campos 
  ngOnInit() {
    debugger;
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
