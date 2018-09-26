import { ListingProductComponent } from './listing-product/listing-product.component';
import { listingProduct } from './../../@core/models/manage-product/manage-product';
import { MasterPComponent } from './master-p/master-p.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { masterPComponent } from './masterP-component';

const routes: Routes = [
  {
    path: '',
    component: masterPComponent,
    children: [
      {
        path: 'tambah',
        component: MasterPComponent,
      },
      {
        path: 'edit/:id',
        component: MasterPComponent,
      },
      {
        path: 'listing',
        component: ListingProductComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class masterProutingmodule { }
