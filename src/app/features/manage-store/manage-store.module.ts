import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStoreRoutingModule } from './manage-store-routing.module';
import { StoreListComponent } from './store-list/store-list.component';
import { StoreContohComponent } from './store-contoh/store-contoh.component';
import { ManageStoreComponent } from './manage-store.component';
import { SearchPipe, filterOne } from '../../@theme/pipes';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownButtonsComponent } from '../../pages/ui-features/buttons/dropdown-buttons/dropdown-button.component';
import { ThemeModule } from '../../@theme/theme.module';
@NgModule({
  imports: [
    CommonModule,
    ManageStoreRoutingModule,
    FormsModule,
    ThemeModule,
    ReactiveFormsModule,
    // DropdownButtonsComponent
  ],
  declarations: [ManageStoreComponent, StoreListComponent, StoreContohComponent,SearchPipe,filterOne]
})
export class ManageStoreModule { }
