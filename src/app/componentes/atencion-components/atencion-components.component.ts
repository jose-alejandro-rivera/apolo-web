import { Component, OnInit } from '@angular/core';
import { ICategoria } from '../../interfaces/categoria'
import { PasoService } from '../../servicios/paso.service';
import { Ipasos } from '../../interfaces/pasos'


@Component({
  selector: 'app-atencion-components',
  templateUrl: './atencion-components.component.html',
  styleUrls: ['./atencion-components.component.css']
})
export class AtencionComponentsComponent implements OnInit {
  // private hcate:ICategoria = [];

  flujo: any[] = []; // 
  seleccion: number;
  input:number;
  listFlujoPaso: any;
  definicionPaso: any; // 
  cuestionarioPasos: any;
  pasoCargue: any;
  subsPasos: any[] = [];
  pasos: Ipasos[] = [];
  // pasoCargue:Ipasos;



  constructor(private pasosFlujo: PasoService,
    //  private pasos: Ipasos 
  ) { }

  ngOnInit() {
    debugger;
    this.seleccion = 1;
    this.pasosFlujo.getPasos(1).subscribe((data) => {
      
        //validacion existencia de datos
      if (data) {
        this.listFlujoPaso = data;
        for (let listPasos of this.listFlujoPaso[0]) {
          for (let elemento of listPasos.pasos) {
            this.pasos = elemento;
            if (elemento.pasosProceso.Id_Paso == this.seleccion) {
              this.definicionPaso = elemento.pasosProceso;
              for (let cuestionarioPasos of elemento.cuestionario.CuestionarioCampo) {
                this.pasoCargue = {
                  "descripcionActividad": cuestionarioPasos.campos.Descripcion,
                  "tipoCampo": cuestionarioPasos.campos.tipo,
                  "Longitud": cuestionarioPasos.campos.Longitud,
                  "Obligatorio": cuestionarioPasos.CuestionarioCampo.Obligatorio
                };
                
                this.subsPasos.push(this.pasoCargue);
                
                console.log(this.subsPasos);
              }
            }
          }
        }
      } else {

        console.log("proceso seleccionado sin pasos");
      }
    });

  }

  // cargeuPasoFlujo(){

  //   debugger;
  //   this.seleccion = 1;
  //   this.pasosFlujo.getPasos(1).subscribe((data) => {
      
  //       //validacion existencia de datos
  //     if (data) {
  //       this.listFlujoPaso = data;

  //     }

  //   });
  // }

  carguePasoSiguienteFlujo(element) {
    debugger;
    this.seleccion+=1;

    for (let paso of element) {
      if (paso.id_paso == this.seleccion) {

        let leftpaso = {
          "select": true,
          "key": paso.id_paso,
          "value": paso.NomPaso,
          "description": paso.Descripcion
        };
        this.seleccion += 1;

      }

    }
  }

  changeSuit(e) {
    // this.ngOnInit.toString('name').setValue(e.target.value, {
    //    onlySelf: true
    // })
  }

}
