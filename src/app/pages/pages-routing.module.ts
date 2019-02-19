import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: ECommerceComponent,
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
    },
    // {
    //   path: 'order',
    //   loadChildren: './customer-service/customer.module#CsModule',
    // },
    {
      path: 'order',
      loadChildren: './orders/orders.module#OrdersModule',
    },
    {
      path: 'master-product',
      loadChildren: './master-product/masterP.module#MasterPModule',
    },
    {
      path: 'courier',
      loadChildren: './manage-shipment/manage-shipment.module#ManageShipmentModule',
    },
    {
      path: 'withdrawal',
      loadChildren: './withdrawal/withdrawal.module#WithdrawalModule',
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {

}
