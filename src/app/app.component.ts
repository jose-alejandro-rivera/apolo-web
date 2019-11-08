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
  constructor(private router: Router) {
    this.componentFlujo = false;
    this.componentCategoria = true;
    this.router.events.subscribe((event: Event) => {
    });
}
}
