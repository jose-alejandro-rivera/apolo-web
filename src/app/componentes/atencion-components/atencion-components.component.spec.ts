import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AtencionComponentsComponent } from './atencion-components.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';


describe('AtencionComponentsComponent', () => {
  let component: AtencionComponentsComponent;
  let fixture: ComponentFixture<AtencionComponentsComponent>;
  let listFlujoPaso: any;
  let definicionPaso: any; //

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AtencionComponentsComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AtencionComponentsComponent]
    })
      .compileComponents();
  }));
  describe(':', () => {

    function setup() {
      // const pasoService = TestBed.get();
      const httpTestingController = TestBed.get(HttpTestingController);
      return {  httpTestingController };
    }

    // validar la obtencion de primer paso a visualizar
    it('validar la obtencion del paso 1', () => {
      const seleccione = 1;
      const {  httpTestingController } = setup();
      // pasoService.getPasos(1).subscribe(data => {

        this.listFlujoPaso = '';
        for (let listPasos of this.listFlujoPaso[0]) {
          for (let elemento of listPasos.pasos) {
            this.pasos = elemento;
            if (elemento.pasosProceso.Id_Paso == this.seleccion) {
              this.definicionPaso = elemento.pasosProceso;
            }
          }
        }
        expect(definicionPaso.NomPaso).toEqual('paso 1');
      });
    


    // validacion el consumo del servicio
    // it('validar el consumo del servicio', () => {
    //   const { pasoService, httpTestingController } = setup();
    //   pasoService.getPasos(1).subscribe(data => {
    //     if (data) {
    //       expect(data).toBeTruthy();
    //     }
    //   });
    // });

    
    // validacion de envio de parametros nulos al servicio 
    // it('validar el envio de paramettros nulos al servicio ', () => {
    //   const { pasoService, httpTestingController } = setup();
    //   pasoService.getPasos('').subscribe(data => {
    //     if (!data) {
    //       expect(data).toBeFalsy();
    //     }
    //   });
    // });



    beforeEach(() => {
      fixture = TestBed.createComponent(AtencionComponentsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

  });


});