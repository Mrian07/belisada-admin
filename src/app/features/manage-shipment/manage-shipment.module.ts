import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ManageShipmentRoutingModule } from './manage-shipment-routing.module';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ManageShipmentComponent } from './manage-shipment.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ManageShipmentRoutingModule
  ],
  declarations: [ManageShipmentComponent,  ShipmentListComponent]
})
export class ManageShipmentModule { }
