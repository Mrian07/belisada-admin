import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageProductModule } from './manage-product.module';
import { ListProductComponent } from './list-product/list-product.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [{
      path: '',
      component: ListProductComponent,
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductRoutingModule { }

export const routedComponents = {
  ProductComponent,
  ListProductComponent
};
