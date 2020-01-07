import { Component } from '@angular/core';

import { 
	NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router 
} from '@angular/router';
/**
 * componente inicial
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * clase que relaciona los componentes creados para la aplicacion web
 */
export class AppComponent {
  /**
   * variable que itera el componente atencion
   */
  componentFlujo:boolean; 
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
   * variables de secion
   * @param router 
   */
  constructor(private router: Router) {
    this.componentFlujo = false;
    this.componentCategoria = true;
    this.router.events.subscribe((event: Event) => {
    });
}
/**
 * funcion que itera los componentes
 */
ngOnInit() {
  localStorage.setItem('home_component','');
  localStorage.setItem('atencion_component','');
 
  this.homeAtencion =  localStorage.getItem('home_component');
  this.atencionComponet = localStorage.getItem('atencion_component');
  this.enrutamiento();
}

enrutamiento() {
  this.router.navigate(['home/componet']);
  return false;

}
}





