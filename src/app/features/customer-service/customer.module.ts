import { ModalComponent } from './../manage-product/modal/modal.component';
import { customerSroutingmodule } from './customer-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { CustomerSComponent } from './customer-service.component';
import { OrderCsComponent } from './order-cs/order-cs.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    customerSroutingmodule
  ],
  declarations: [CustomerSComponent,OrderCsComponent,ModalComponent]
})
export class CsModule { }
