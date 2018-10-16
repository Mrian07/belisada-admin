import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawalRoutingModule } from './withdrawal-routing.module';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { WithdrawalComponent } from './withdrawal.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    WithdrawalRoutingModule
  ],
  declarations: [
    WithdrawalComponent,
    WithdrawalListComponent]
})
export class WithdrawalModule { }
