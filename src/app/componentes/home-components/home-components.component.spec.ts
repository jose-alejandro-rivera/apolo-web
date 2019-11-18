import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { HomeComponent } from './home-components.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


describe('HomeComponentsComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],

      imports: [HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule],

      providers: [HomeComponent, EjecucionAtencionService]
    })
      .compileComponents();
  }));

  describe(':', () => {

    function setup() {
      const ejecucionAtencion = TestBed.get(EjecucionAtencionService);
      const httpTestingController = TestBed.get(HttpTestingController);
      return { ejecucionAtencion, httpTestingController };
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    //validacion de respuesta del servicio 
    it(' validacion de categoria should create', () => {
      /* Esta funcion permite cargar el servicio para alimentar el select de todas las categorias activas*/
      const { ejecucionAtencion, httpTestingController } = setup();
      ejecucionAtencion.getData(URL + 'flujo/categorias')
        .subscribe((res: any) => {
          if (res) {
            expect(res).toBeTruthy();
          }
        })
    });

  });

});
