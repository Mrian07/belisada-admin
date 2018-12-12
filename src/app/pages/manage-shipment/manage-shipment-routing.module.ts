import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageShipmentComponent } from './manage-shipment.component';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';

const routes: Routes = [
  {
    path: '',
    component: ManageShipmentComponent,
    children: [{
      path: '',
      component: ShipmentListComponent,
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageShipmentRoutingModule { }
