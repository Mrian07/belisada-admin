import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ThemeModule } from '../../@theme/theme.module';
import { DashboardModule } from '../../pages/dashboard/dashboard.module';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    DashboardModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, ResetPasswordComponent]
})
export class AuthModule { }
