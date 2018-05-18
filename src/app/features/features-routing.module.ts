import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
      path: 'buyer',
      loadChildren: './manage-buyer/manage-buyer.module#ManageBuyerModule',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
