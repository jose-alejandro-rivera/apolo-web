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
  title = 'apolo-web';
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
    });
}
}
