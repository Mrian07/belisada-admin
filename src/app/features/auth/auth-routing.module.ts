import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NbAuthComponent } from '@nebular/auth';

const routes: Routes = [
  {
    path: 'auth',
    // component: NbAuthComponent,
    children: [
      // {
      //   path: '',
      //   component: NbLoginComponent,
      // },
      {
        path: 'login',
        component: LoginComponent,
      },
      // {
      //   path: 'register',
      //   component: NbRegisterComponent,
      // },
      // {
      //   path: 'logout',
      //   component: NbLogoutComponent,
      // },
      // {
      //   path: 'request-password',
      //   component: NbRequestPasswordComponent,
      // },
      // {
      //   path: 'reset-password',
      //   component: NbResetPasswordComponent,
      // },
    ],
  },
  // {
  //   path: '',
  //   component: NbAuthComponent,
  //   children: [{
  //     path: 'login',
  //     component: LoginComponent,
  //   },
  //   {
  //     path: 'reset-password',
  //     component: ResetPasswordComponent,
  //     // canActivate: [NoAuthGuard]
  //   }]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
