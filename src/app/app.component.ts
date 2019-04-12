import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from './@core/utils/analytics.service';
import { MessagingService } from "./shared/messaging.service";
import { Globals } from './@core/services/globals/globals';
import { ChatService } from './@core/services/globals/chat.service';

@Component({
  selector: 'bs-app',
  template:`<router-outlet></router-outlet>
            <div class="chat-wrapper" *ngIf="globals.showChat === true">
              <app-chat></app-chat>
            <div>`,
})
export class AppComponent implements OnInit {
  message;
  constructor(
    private analytics: AnalyticsService, 
    private messagingService: MessagingService,
    public globals: Globals,
    _chatService: ChatService
    ) {
    globals.socket = _chatService.connectSocket();
  
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
