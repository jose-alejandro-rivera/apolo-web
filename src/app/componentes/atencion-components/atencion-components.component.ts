import { Component, OnInit } from '@angular/core';
import { PasoService } from '../../servicios/paso.service';
import { Ipasos } from '../../interfaces/pasos'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';


@Component({
  selector: 'app-atencion-components',
  templateUrl: './atencion-components.component.html',
  styleUrls: ['./atencion-components.component.css']
})
export class AtencionComponentsComponent implements OnInit {

  flujo: any[] = []; // 
  seleccion: number;
  input:number;
  listFlujoPaso: any;
  definicionPaso: any; // 
  cuestionarioPasos: any;
  pasoCargue: any;
  atencionCom: Boolean;
  subsPasos: any[] = [];
  pasos: Ipasos[] = [];
  dataFlujoCat:any;



  constructor(private pasosFlujo: PasoService, private router: Router
    //  private pasos: Ipasos 
  ) {
    this.atencionCom = true;
   }

  ngOnInit() {
    debugger;
    this.seleccion = 1;
    this.dataFlujoCat = JSON.parse(localStorage.getItem('dataFlujoCat'));
    this.pasosFlujo.getPasos(this.dataFlujoCat.Id_Flujo).subscribe((data) => {
      
        //validacion existencia de datos
      if (data) {
        this.listFlujoPaso = data;
        for (let listPasos of this.listFlujoPaso[0]) {
          for (let elemento of listPasos.pasos) {
            this.pasos = elemento;
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
        localStorage.setItem('dataFlujoCat','');
      } else {
        console.log("proceso seleccionado sin pasos");
      }
    });

  }

  public pageHome() {
    debugger;
    this.atencionCom=false;
    setTimeout(()=>{
      this.router.navigate(['home']);
        return false;
    },500);
  }

  carguePasoSiguienteFlujo(element) {
    debugger;
    this.seleccion+=1;

  }


}
