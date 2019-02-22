import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from './@core/utils/analytics.service';
import { MessagingService } from "./shared/messaging.service";

@Component({
  selector: 'bs-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  message;
  constructor(private analytics: AnalyticsService, private messagingService: MessagingService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
