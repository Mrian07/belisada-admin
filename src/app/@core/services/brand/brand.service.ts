import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import {List } from '../../models/brand/brand.model';

import 'rxjs/add/operator/map';
@Injectable()
export class BrandService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  // getList(){
  //   return this.http.get(this.configuration.apiURL + '/manage/brand?page=1&itemperpage=10&ob=name&ot=ASC')
  //   .map(resp => resp as List);
  // }

  getList(queryParams: Object): Observable<List> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/manage/brand', {params: params})
      .map(resp => resp as List);
  }

  // changePassword(data){
  //   return this.http.put(this.configuration.apiURL + '/account/changepassword', data)
  //   .map(resp => resp as ChangePasswordRequest);
  // }

  // uploadAvatar(data){
  //   return this.http.put(this.configuration.apiURL + '/profile/avatar/update', data)
  //   .map(resp => resp as Avatar);
  // }

}
