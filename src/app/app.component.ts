import { Component } from '@angular/core';

import { 
	NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router 
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  componentFlujo:Boolean; 
  componentCategoria: Boolean;
  title = 'apolo-web';
  homeAtencion: any;
  atencionComponet: any;
  constructor(private router: Router) {
    this.componentFlujo = false;
    this.componentCategoria = true;
    this.router.events.subscribe((event: Event) => {
    });
}
ngOnInit() {
  localStorage.setItem('home_component','');
  localStorage.setItem('atencion_component','');
 
  this.homeAtencion =  localStorage.getItem('home_component');
  this.atencionComponet = localStorage.getItem('atencion_component');

  console.log(this.homeAtencion, this.atencionComponet);
}
}
