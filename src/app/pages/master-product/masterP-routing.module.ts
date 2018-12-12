import { ListingProductComponent } from './listing-product/listing-product.component';
import { MasterPComponent } from './master-p/master-p.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { masterPComponent } from './masterP-component';
import { ProposeComponent } from './propose/propose.component';

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
        path: '',
        component: ListingProductComponent,
      },
      {
        path: 'propose',
        component: ProposeComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterProutingmodule { }
