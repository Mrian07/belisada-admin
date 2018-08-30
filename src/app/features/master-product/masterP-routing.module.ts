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
        path: 'list',
        component: MasterPComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class masterProutingmodule { }
