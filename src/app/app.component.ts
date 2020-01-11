import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  authScreen: boolean = false;
  
  constructor(
    private _router: Router
  ) {
    this._router.events.pipe(filter((event: RouterEvent) => event instanceof NavigationEnd)).subscribe((res) => {
      this.authScreen = !!this._router.url.match('auth');
    })
  }

}
