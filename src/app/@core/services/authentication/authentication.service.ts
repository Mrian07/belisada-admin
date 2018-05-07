import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import { ResetPassword, ForgotPassword, Login, Token } from '../../models/authentication/authentication.model';

import 'rxjs/add/operator/map';
import { List, updateToko, detailToko, ListingItem } from '../../models/manage-store/manage-store.model';
@Injectable()
export class AuthenticationService {
    constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

    /*
    param:
    Used by: app.module.ts
    Description: Fungsi ini untuk melakukan pengecekan token dari local storage ke backend.
    */
    checkToken() {
        const token = localStorage.getItem('token');
        const objToken = {
          token : token
        };
        return this.http.post(this.configuration.apiURL + '/account/checktoken', objToken)
        .map(resp => resp as Token);
    }

    /*
    param:
    Used by: app.module.ts
    Description: Fungsi ini mengambil token yang tersimpan pada local storage.
    */
    getToken() {
        const token = localStorage.getItem('token');
        if (token) {
            return token;
        }
    }

    getData() {
        return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
    }

    doLogin(data){
        return this.http.post(this.configuration.apiURL + '/account/login', data)
        .map(resp => resp as Login);
    }

    doForgotPassword(data){
        return this.http.post(this.configuration.apiURL + '/account/sendemail', data)
        .map(resp => resp as ForgotPassword);
    }

    doResetPassword(data){
        return this.http.post(this.configuration.apiURL + '/account/resetpassword', data)
        .map(resp => resp as ResetPassword);
    }
}