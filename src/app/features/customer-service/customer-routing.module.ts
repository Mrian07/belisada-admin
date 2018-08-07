import { OrderCsComponent } from './order-cs/order-cs.component';
import { CustomerSComponent } from './customer-service.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CustomerSComponent,
    children: [
      {
        path: 'list',
        component: OrderCsComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class customerSroutingmodule { }
