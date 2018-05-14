import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { ThemeModule } from '../@theme/theme.module';
import { SearchPipe } from '../@theme/pipes';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DashboardModule,
    FeaturesRoutingModule,
  ],
  declarations: [FeaturesComponent]
})
export class FeaturesModule { }
