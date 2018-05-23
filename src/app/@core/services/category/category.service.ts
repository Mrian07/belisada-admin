import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import {EditCategory, AddCategory, ListCategory, ActiveCategory, ListSpec} from '../../models/category/category.model';

import 'rxjs/add/operator/map';
@Injectable()
export class CategoryService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getCategory(queryParams: Object): Observable<ListCategory> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/manage/category', {params: params})
      .map(resp => resp as ListCategory);
  }

  addCategory(data){
    return this.http.post(this.configuration.apiURL + '/manage/category/create', data)
    .map(resp => resp as AddCategory);
  }

  updateCategory(data){
    return this.http.put(this.configuration.apiURL + '/manage/category/update', data)
    .map(resp => resp as EditCategory);
  }

  activeCategory(data){
    return this.http.post(this.configuration.apiURL + '/manage/category/active', data)
    .map(resp => resp as ActiveCategory);
  }

  getSpec(queryParams: Object): Observable<ListSpec> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });

    return this.http.get(this.configuration.apiURL + '/manage/category/attribute', {params: params})
      .map(resp => resp as ListSpec);
  }

  addSpec(data){
    return this.http.post(this.configuration.apiURL + '/attribute/create', data)
    .map(resp => resp as ListSpec);
  }

}
