import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawalRoutingModule } from './withdrawal-routing.module';
import { WithdrawalListComponent } from './withdrawal-list/withdrawal-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { WithdrawalComponent } from './withdrawal.component';
import { MyDatePickerModule } from 'mydatepicker';
import { WithdrawalHistoryComponent } from './withdrawal-history/withdrawal-history.component';
import { WithdrawalTabsComponent } from './withdrawal-tabs/withdrawal-tabs.component';
import { RouteTabsetShowcaseComponent } from './tabset.component';
// import { DateUtil } from '../../@core/utils/date.util';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    WithdrawalRoutingModule,
    MyDatePickerModule,
    // DateUtil
  ],
  declarations: [
    WithdrawalComponent,
    WithdrawalListComponent,
    WithdrawalHistoryComponent,
    WithdrawalTabsComponent,
    RouteTabsetShowcaseComponent]
})
export class WithdrawalModule { }
