import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Event, Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';
import { EjecucionAtencionService } from '../../servicios/ejecucionAtencion.service';
import { AppComponent } from 'src/app/app.component';
import {WebcamImage} from 'ngx-webcam';


/**
 * 
 */
@Component({
  selector: 'app-orden-components',
  templateUrl: './orden-components.component.html',
  styleUrls: ['./orden-components.component.css'],
  providers: [AppGlobals]
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
    private ejecucionAtencionService: EjecucionAtencionService,
    private formBuilder: FormBuilder,
    private global: AppGlobals,
    private appComponent: AppComponent,
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

  ngOnInit() {
    this.ordenInexistente = false;
    this.loading = false;
    this.mesnajeConfirmacionActividad = this.global.mesnajeConfirmacionActividad;
    this.ejecucionExitosa = JSON.parse(localStorage.getItem('dataFlujoMensajeOk'));;
    localStorage.setItem('dataFlujoMensajeOk', JSON.stringify(false));
    // this.startCamera();
  }

  get f() {
    return this.formOrden.controls;
  }

  parametroSeleccion($event) {
    // debugger
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
      console.log('url ----------------- ', url);
      this.loading = true;
      return this.ejecucionAtencionService.getData(url).toPromise().then(data => {
        console.log(data + ' imprecion data')
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
            this.enrutamientoFlujo();
          } else {
            if (this.ordenResponse.status) {
              if (this.ordenResponse.status === 'started') {
                localStorage.setItem('dataFlujoOrden', JSON.stringify(this.ordenResponse));
                this.appComponent.userview = this.ordenResponse.name;
                this.appComponent.admin = (this.appComponent.userview != '') ? true : false;
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
