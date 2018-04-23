import { MENU_ITEMS } from './features-menu';
import { Component } from '@angular/core';


@Component({
  selector: 'ngx-features',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class FeaturesComponent {

  menu = MENU_ITEMS;
}
