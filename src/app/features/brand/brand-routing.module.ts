import { BrandAddComponent } from './brand-add/brand-add.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { BrandComponent } from './brand.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BrandComponent,
    children: [
      {
        path: 'list',
        component: BrandListComponent,
      },
      {
        path: 'brand-add',
        component: BrandAddComponent,
      },
      // {
      //   path: 'reset-password',
      //   component: ResetPasswordComponent,
      // }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
