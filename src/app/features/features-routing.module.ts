import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchPipe } from '../@theme/pipes';

const routes: Routes = [{
  path: '',
  component: FeaturesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'store',
      loadChildren: './manage-store/manage-store.module#ManageStoreModule',
    },
    {
      path: 'profile',
      loadChildren: './profile/profile.module#ProfileModule',

    },
    {
      path: 'brand',
      loadChildren: './brand/brand.module#BrandModule',
    },
    {
      path: 'category',
      loadChildren: './category/category.module#CategoryModule',
    },
    {
      path: 'spec',
      loadChildren: './spec/spec.module#SpecModule',
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
