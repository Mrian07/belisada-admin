import { ManageBrand } from './../../models/brand/brand.model';
import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import {List, ChangeStatus, Edit, Add} from '../../models/brand/brand.model';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private configuration: Configuration, private http: HttpClient) { }


  getList(queryParams: Object): Observable<List> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/manage/brand', {params: params})
      .pipe(
        map(resp => resp as List)
      );
  }

  changeStatus(data) {
    return this.http.put(this.configuration.apiURL + '/manage/brand/active', data)
      .pipe(
        map(resp => resp as ChangeStatus)
      );
  }

  edit(data) {
    return this.http.put(this.configuration.apiURL + '/manage/brand/update', data)
      .pipe(
        map(resp => resp as Edit)
      );
  }

  add(data) {
    return this.http.post(this.configuration.apiURL + '/manage/brand/create', data)
      .pipe(
        map(resp => resp as Add)
      );
  }

  getDataManageBrand(queryParams): Observable<ManageBrand> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/manage/brand', {params: params})
      .pipe(
        map(resp => resp as ManageBrand)
      );
  }

  getRejectOrApprove(data) {
    return this.http.put(this.configuration.apiURL + '/manage/brand/approval/update', data);
  }

}
