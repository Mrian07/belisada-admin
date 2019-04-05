import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { ChatService } from 'app/@core/services/globals/chat.service';

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
    <div style="float: right; position:fixed; bottom:0; right:8rem;">
        <button data-notifications="10" style="font-size: 1.2rem; font-weight: bold; width: 10rem; border-radius:0; background: #5ECDDE; box-shadow: 0 15px 30px 0 #b6b6b6,0 5px 15px 0 #b6b6b6; cursor: pointer;" class="btn">Chat</button>
        <!-- <span style="position: absolute; top: -16px; right: -12px; padding: 2.5px 7px; border-radius: 50%; background: red; color: white;">10</span> -->
    </div>
  `,
})
export class MainLayoutComponent implements OnDestroy {

  constructor(
    protected themeService: NbThemeService,
    private _chatService: ChatService
    ) {
  }

  ngOnDestroy() {
  }

  alertChat() {
    // console.log('storeID:', this.userData.storeId);
    // this.storeId = this.userData.storeId;
    console.log('show:', this._chatService.show());
    this._chatService.show();
  }
}
