import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { ThemeModule } from '../@theme/theme.module';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { NbDatepickerModule } from '@nebular/theme/components/datepicker/datepicker.module';


const PAGES_COMPONENT = [
  PagesComponent
];
@NgModule({
  declarations: [...PAGES_COMPONENT],
  imports: [
    RouterModule,
    ThemeModule,
    PagesRoutingModule,
    ECommerceModule,
    
  ]
})
export class PagesModule { }
