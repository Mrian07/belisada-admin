import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {List, ChangeStatus, Edit, Add} from '../../models/brand/brand.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SpecService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  // getList(){
  //   return this.http.get(this.configuration.apiURL + '/manage/brand?page=1&itemperpage=10&ob=name&ot=ASC')
  //   .map(resp => resp as List);
  // }

  getList(queryParams: Object): Observable<List> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/manage/attribute', {params: params})
      .pipe(
        map(resp => resp as List)
      );
  }

  getAttributeValue(queryParams: Object) {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/manage/attributevalue', {params: params})
      .pipe(
        map(resp => resp as any)
      );
  }

  changeStatus(data) {
    return this.http.put(this.configuration.apiURL + '/manage/attribute/active', data)
    .pipe(
      map(resp => resp as ChangeStatus)
    );
  }

  edit(data) {
    return this.http.put(this.configuration.apiURL + '/manage/attribute/update', data)
    .pipe(
      map(resp => resp as Edit)
    );
  }

  add(data) {
    return this.http.post(this.configuration.apiURL + '/manage/attribute/create', data)
    .pipe(
      map(resp => resp as Add)
    );
  }

  addAttributeValue(data) {
    return this.http.post(this.configuration.apiURL + '/manage/attributevalue/create', data)
    .pipe(
      map(resp => resp)
    );
  }

  editAttributeValue(data) {
    return this.http.put(this.configuration.apiURL + '/manage/attributevalue/update', data)
    .pipe(
      map(resp => resp)
    );
  }

}
