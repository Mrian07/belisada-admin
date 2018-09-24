import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpecAddComponent } from './spec-add/spec-add.component';
import { SpecListComponent } from './spec-list/spec-list.component';
import { SpecComponent } from './spec.component';
import { SpecValueComponent } from './spec-value/spec-value.component';

const routes: Routes = [
  {
    path: '',
    component: SpecComponent,
    children: [
      {
        path: 'list',
        component: SpecListComponent,
      },
      {
        path: 'value',
        component: SpecValueComponent,
      },
      {
        path: 'spec-add',
        component: SpecAddComponent,
      }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecRoutingModule { }
