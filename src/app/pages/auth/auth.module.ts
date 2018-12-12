import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ThemeModule } from '../../@theme/theme.module';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    AuthRoutingModule
  ],
  declarations: [AuthComponent, LoginComponent, ResetPasswordComponent, ForgotPasswordComponent]
})
export class AuthModule { }
