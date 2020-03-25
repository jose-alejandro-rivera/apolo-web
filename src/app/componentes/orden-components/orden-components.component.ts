import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { AppComponent } from 'src/app/app.component';
import { HeaderComponentComponent } from 'src/app/componentes/header-component/header-component.component';
import {WebcamImage} from 'ngx-webcam';
import { AccesoRutasSingleton } from '../../singleton/AccesoRutasSingleton';


/**
 * 
 */
@Component({
  selector: 'app-orden-components',
  templateUrl: './orden-components.component.html',
  styleUrls: ['./orden-components.component.css'],
  providers: [AppGlobals,HeaderComponentComponent]
})
/**
 * 
 */
export class OrdenComponentsComponent implements OnInit {

  @ViewChild('video', { static: true }) videoElement: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;

  componentFlujo: boolean;
  componentCategoria: boolean;
  public orden: any;
  public param: any;
  public URL: any;
  public formOrden: FormGroup;
  public submitted = false;
  public ordenInexistente: boolean;
  public mensajeOrden: any;
  public ordenResponse: any;
  public webcamImage: WebcamImage = null;
  public webCamIntegracion = false;
  private acceso : boolean = false;

  retomaOrden: Boolean;
  tipoEjecucion: any;
  loading: Boolean;
  mesnajeConfirmacionActividad: any;
  ejecucionExitosa: Boolean;

  // videoWidth = 0;
  // videoHeight = 0;
  // constraints = {
  //   video: {
  //     facingMode: "environment",
  //     width: { ideal: 4096 },
  //     height: { ideal: 2160 }
  //   }
  // };


  /**
   * 
   * @param router 
   * @param ejecucionAtencionService 
   * @param formBuilder 
   * @param global 
   */
  constructor(private router: Router,
    //private accesoRutasSingleton: AccesoRutasSingleton,
    private ejecucionAtencionService: EjecucionAtencionService,
    private formBuilder: FormBuilder,
    private global: AppGlobals,
    private appComponent: AppComponent,
     private headerComponentComponent: HeaderComponentComponent,
    private renderer: Renderer2) {
    this.componentFlujo = false;
    this.componentCategoria = false;
    this.ejecucionExitosa = false;
    this.URL = this.global.url;
    localStorage.setItem('dataFlujoOrden', '');
    this.router.events.subscribe((event: Event) => {
    });
    this.formOrden = this.formBuilder.group({
      param: ['', Validators.required],
      orden: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.validarAcceso();
    this.ordenInexistente = false;
    this.loading = false;
    this.mesnajeConfirmacionActividad = this.global.mesnajeConfirmacionActividad;
    this.ejecucionExitosa = JSON.parse(localStorage.getItem('dataFlujoMensajeOk'));
    localStorage.setItem('dataFlujoMensajeOk', JSON.stringify(false));
    // this.startCamera();
  }

    /**
   * Funcion que nos permite validar el acceso a las url, 
   * si el parametro enviado es valido
   **/
  async validarAcceso(){
    //let parametro = AccesoRutasSingleton.getInstance();
    //let valor = await parametro.instanciaResultado();
    let ACCESO = JSON.parse(localStorage.getItem('recursos'));
    if(!ACCESO){
      this.router.navigate(['autorizado/denegado']);
    }
    if(ACCESO.caracter_valido == 'caracter_invalido'){
      this.router.navigate(['autorizado/denegado']);
    }
  }

  get f() {
    return this.formOrden.controls;
  }

  parametroSeleccion($event) {
    this.param = this.formOrden.value.param;
    this.ordenInexistente = false;
  }


  ingresoOrden($event) {
    if (this.formOrden.invalid) {
      this.submitted = true;
      return;
    } else {
      this.orden = this.formOrden.value.orden;
      this.tipoEjecucion = 'orden';
      let url = this.URL + 'integracion/apolo/toa/' + this.param + '/' + this.orden + '/' + this.tipoEjecucion;
      this.loading = true;
      return this.ejecucionAtencionService.getData(url).toPromise().then(data => {
        let info: any = data;
        info = info.response;
      
        return info;
      }).then(data => {
        this.ordenResponse = data;
        this.ordenResponse.formOrden = this.formOrden.value;
        if (this.ordenResponse.status == 'retoma' && !this.retomaOrden) {
          this.mensajeOrden = this.global.mensajeRetomaFound;
          this.ordenInexistente = true;
          this.loading = false;
        } else {
          if (this.retomaOrden) {
            this.ordenResponse.retomaOrden = this.retomaOrden;
            localStorage.setItem('dataFlujoOrden', JSON.stringify(this.ordenResponse));
            console.log('his.ordenResponse.name ----->> ', this.ordenResponse);
             //   this.appComponent.usuarioView = this.ordenResponse.name;
                this.appComponent.admin = (this.appComponent.userview != '') ? true : false;
            this.enrutamientoFlujo();
          } else {
            if (this.ordenResponse.status) {
              if (this.ordenResponse.status === 'started') {
                localStorage.setItem('dataFlujoOrden', JSON.stringify(this.ordenResponse));
                console.log('his.ordenResponse.name ----->> ', this.ordenResponse);
                this.appComponent.userview = this.ordenResponse.name;
                this.appComponent.admin = (this.appComponent.userview != '') ? true : false;
                
                 this.headerComponentComponent.userview = this.ordenResponse.name;
                 this.headerComponentComponent.admin = (this.headerComponentComponent.userview != '') ? true : false;
                this.enrutamientoHome();
              } else {
                this.mensajeOrden = this.global.mensajeOrdenNoIniciada;
                this.ordenInexistente = true;
                this.loading = false;
              }
            } else {
              this.mensajeOrden = this.global.mensajeOrdenNoExiste;
              this.ordenInexistente = true;
              this.loading = false;
            }
          }
        }

      });


    }
  }


  updateRol($event) {
    const event = $event.target.checked;
    this.retomaOrden = event;
    this.ordenInexistente = false;

  }

  enrutamientoHome() {
    this.loading = false;
    this.router.navigate(['home/componet']);
    return false;
  }

  enrutamientoFlujo() {
    this.loading = false;
    this.router.navigate(['flujo/list']);
    return false;
  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }


  /////prueva camara
  //   startCamera() {
  //     if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
  //         navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
  //     } else {
  //         alert('Sorry, camera not available.');
  //     }
  // }

  // attachVideo(stream) {
  //     this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
  //     this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
  //         this.videoHeight = this.videoElement.nativeElement.videoHeight;
  //         this.videoWidth = this.videoElement.nativeElement.videoWidth;
  //     });
  // }

  // capture() {
  //     this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
  //     this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
  //     this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
  // }

  // handleError(error) {
  //     console.log('Error: ', error);
  // }


}
