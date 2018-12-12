import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ResetPassword, ForgotPassword, Login, Token } from '../../models/authentication/authentication.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  /*
  param:
  Used by: app.module.ts
  Description: Fungsi ini untuk melakukan pengecekan token dari local storage ke backend.
  */
  checkToken() {
    const authAppToken = localStorage.getItem('auth_app_token');
    const token = (authAppToken) ? JSON.parse(authAppToken).value : '';
    const objToken = {
      token : token
    };
    return this.http.post(this.configuration.apiURL + '/account/checktoken', objToken)
      .pipe(
        map(resp => resp as Token)
      );
  }

  /*
  param:
  Used by: app.module.ts
  Description: Fungsi ini mengambil token yang tersimpan pada local storage.
  */
  getToken() {
    const authAppToken = localStorage.getItem('auth_app_token');
    const token = (authAppToken) ? JSON.parse(authAppToken).value : '';
    if (token) {
      return token;
    }
  }

  getData() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }

  doLogin(data) {
    return this.http.post(this.configuration.apiURL + '/account/login', data)
      .pipe(
        map(resp => resp as Login)
      );
  }

  doForgotPassword(data) {
    return this.http.post(this.configuration.apiURL + '/account/sendemail', data)
      .pipe(
        map(resp => resp as ForgotPassword)
      );
  }

  doResetPassword(data) {
    return this.http.post(this.configuration.apiURL + '/account/resetpassword', data)
      .pipe(
        map(resp => resp as ResetPassword)
      );
  }
}
