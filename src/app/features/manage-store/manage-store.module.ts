import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStoreRoutingModule } from './manage-store-routing.module';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreContohComponent } from './store-contoh/store-contoh.component';

@NgModule({
  imports: [
    CommonModule,
    ManageStoreRoutingModule
  ],
  declarations: [StoreListComponent, StoreContohComponent]
})
export class ManageStoreModule { }
