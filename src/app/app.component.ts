import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {  Event, Router } from '@angular/router';
import { AppGlobals } from 'src/app/app.global';

/**
 * componente inicial
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppGlobals]
})
/**
 * clase que relaciona los componentes creados para la aplicacion web
 */
export class AppComponent {
  /**
   * variable que itera el componente atencion
   */
  componentFlujo: boolean;
  /**
   * variable que itera el componente de categorias
   */
  componentCategoria: boolean;
  /**
   * titulo de la aplicacion
   */
  title = 'apolo-web';
  /**
   * variable que obtiene el item del home-component
   */
  homeAtencion: any;
  /**
   * variable que obtiene el item del atencion-component
   */
  atencionComponet: any;
  /**
   * 
   */
  ordenComponente: any;

  userview:any;
  admin:Boolean;
  name: any;
  
  /**
   * variables de secion
   * @param router 
   */
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private global: AppGlobals) {
    this.componentFlujo = false;
    this.componentCategoria = false;
    this.userview=this.global.usuarioView;
    this.admin=(this.userview != '')?true: false;
    this.router.events.subscribe((event: Event) => {
    });
  }
  /**
   * funcion que itera los componentes
   */
  ngOnInit() {
    localStorage.setItem('home_component', '');
    localStorage.setItem('atencion_component', '');
    localStorage.setItem('orden_componet', '');

    this.homeAtencion = localStorage.getItem('home_component');
    this.atencionComponet = localStorage.getItem('atencion_component');
    this.ordenComponente = localStorage.getItem('orden_componet');

    this.enrutamiento();
  }

  enrutamiento() {
    this.router.navigate(['home/orden']);
    return false;

  }
}





