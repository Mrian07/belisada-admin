import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';

const routes: Routes = [{
  path: '',
  component: FeaturesComponent,
  children: [
    {
      path: 'store',
      loadChildren: './manage-store/manage-store.module#ManageStoreModule',
    },
    {
      path: 'profile',
      loadChildren: './profile/profile.module#ProfileModule',

    },
    {
      path: 'buyer',
      loadChildren: './manage-buyer/manage-buyer.module#ManageBuyerModule',
    },
    {
      path: 'product',
      loadChildren: './manage-product/manage-product.module#ManageProductModule',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
