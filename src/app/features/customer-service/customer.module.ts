// import { ModalMPComponent } from './../manage-product/modal/modal-mp.component';
import { customerSroutingmodule } from './customer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomerSComponent } from './customer-service.component';
import { OrderCsComponent } from './order-cs/order-cs.component';
import { CountdownTimerModule } from 'ngx-countdown-timer';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    customerSroutingmodule,
    CountdownTimerModule.forRoot()
  ],
  declarations: [CustomerSComponent, OrderCsComponent]
})
export class CsModule { }
