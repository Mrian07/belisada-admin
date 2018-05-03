import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageBuyerComponent } from './manage-buyer.component';
import { BuyerListComponent } from './buyer-list/buyer-list.component';

const routes: Routes = [
  {
    path: '',
    component: ManageBuyerComponent,
    children: [{
      path: 'list',
      component: BuyerListComponent,
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageBuyerRoutingModule { }
