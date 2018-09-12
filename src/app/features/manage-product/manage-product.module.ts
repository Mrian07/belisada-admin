import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductRoutingModule } from './manage-product-routing.module';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductComponent } from './product.component';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '../../pages/forms/forms.module';
// import { ModalMPComponent } from './modal/modal-mp.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ManageProductRoutingModule
  ],
  declarations: [ListProductComponent, ProductComponent]
})
export class ManageProductModule { }
