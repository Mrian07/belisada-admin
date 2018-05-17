import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { ThemeModule } from '../@theme/theme.module';
import { SearchPipe } from '../@theme/pipes';
import { ModalComponent } from '../pages/ui-features/modals/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FeaturesRoutingModule,
  ],
  declarations: [FeaturesComponent, ModalComponent],
  entryComponents: [
    ModalComponent
  ],
})
export class FeaturesModule { }
