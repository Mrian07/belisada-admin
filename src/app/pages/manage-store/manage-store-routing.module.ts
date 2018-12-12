import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageStoreComponent } from './manage-store.component';
import { StoreListComponent } from './store-list/store-list.component';

const routes: Routes = [
  {
    path: '',
    component: ManageStoreComponent,
    children: [{
      path: '',
      component: StoreListComponent,
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageStoreRoutingModule { }

export const routedComponents = {
  ManageStoreComponent,
  StoreListComponent
};
