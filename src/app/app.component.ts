import { Component, OnInit } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from './@core/utils/analytics.service';

@Component({
  selector: 'bs-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private analytics: AnalyticsService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
