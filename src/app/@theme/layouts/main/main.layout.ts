import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'bs-main-layout',
  styleUrls: ['./main.layout.scss'],
  template: `
    <nb-layout>
      <nb-layout-header fixed>
        <bs-header></bs-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column>
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>

      </nb-layout-footer>
    </nb-layout>
  `,
})
export class MainLayoutComponent implements OnDestroy {

  constructor(protected themeService: NbThemeService) {
  }

  ngOnDestroy() {
  }
}
