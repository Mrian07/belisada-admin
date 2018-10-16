import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithdrawalComponent } from './withdrawal.component';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';

const routes: Routes = [
  {
    path: '',
    component: WithdrawalComponent,
    children: [{
      path: 'list',
      component: WithdrawalListComponent,
    }],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawalRoutingModule { }
