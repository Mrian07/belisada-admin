import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { List, updateToko, detailToko, ListingItem } from '../../models/manage-store/manage-store.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ManageStoreService {

  constructor(private configuration: Configuration, private http: HttpClient) { }

  getData() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
  }
  getList(): Observable<ListingItem>  {
    return this.http.get(this.configuration.apiURL + '/manage/reference?code=SSA&isactive=true')
      .pipe(
        map(resp => resp as ListingItem)
      );
  }

  getListToko(queryParams): Observable<List> {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/manage/store/approval',   {params: params})
      .pipe(
        map(resp => resp as List)
      );
  }

  getDetailToko(key: string): Observable<detailToko> {
    return this.http.get(this.configuration.apiURL + '/manage/store/approval/detail/' + key)
      .pipe(
        map(response => response as detailToko)
      );
  }

  postToko(data): Observable<updateToko> {
    return this.http.put(this.configuration.apiURL + '/manage/store/approval/update', data)
      .pipe(
        map(response => response as updateToko)
      );
  }
}
