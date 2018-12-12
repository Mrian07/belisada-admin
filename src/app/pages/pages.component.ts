import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'bs-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <bs-main-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </bs-main-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
