import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderListComponent } from './order-list/order-list.component';
import { OrdersComponent } from './orders.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeModule } from 'app/@theme/theme.module';
import { NbBadgeModule } from '@nebular/theme/components/badge/badge.module';

@NgModule({
  declarations: [OrdersComponent, OrderListComponent],
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    NbBadgeModule
  ]
})
export class OrdersModule { }
