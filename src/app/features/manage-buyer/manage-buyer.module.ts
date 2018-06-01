import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { ManageBuyerRoutingModule } from './manage-buyer-routing.module';
import { ManageBuyerComponent } from './manage-buyer.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { filterOne,SearchPipe } from '../../@theme/pipes';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    Ng2SmartTableModule,
    ManageBuyerRoutingModule
  ],
  declarations: [ManageBuyerComponent, BuyerListComponent]
})
export class ManageBuyerModule { }
