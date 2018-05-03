import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient,HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
// import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import { Token } from '../../models/authentication/authentication.model';

import 'rxjs/add/operator/map';
import { List, updateToko, detailToko, ListingItem } from '../../models/manage-store/manage-store.model';
@Injectable()
export class ManageStoreService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getData() {
    return this.http.get<any>('https://jsonplaceholder.typicode.com/users');
}
getList(): Observable<ListingItem>  {
    const headers = new HttpHeaders({'token': 'eyJhbGciOiJIUzUxMiJ9.eyJVc2VyRGF0YSI6eyJyb2xlIjo3LCJuYW1lIjoid2FoeXUiLCJhdmF0YXIiOiIiLCJlbWFpbCI6IndhaHl1QGdtYWlsLmNvbSJ9LCJzdWIiOiJ3YWh5dUBnbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1MjUzMTU0MzQsImV4cCI6MTUyNTQ1OTQzNH0.REDaNoquEPWyeYn-5FaoqE3d5A-GzErvL2Dfue2pb-nVqPQYoqFJdJK0JOaQTJXlB19hXPg8AAZTyMJVAa8g_w'});
return this.http.get('http://43.243.141.117:8080/belisada-admin/status/store/approval', {headers: headers})
.map(resp => resp as ListingItem);
}

getListToko(queryParams): Observable<List> {
    let params = new HttpParams();
Object.keys(queryParams).forEach(function(k){
  params = params.append(k, queryParams[k]);
});
    const headers = new HttpHeaders({'token': 'eyJhbGciOiJIUzUxMiJ9.eyJVc2VyRGF0YSI6eyJyb2xlIjo3LCJuYW1lIjoid2FoeXUiLCJhdmF0YXIiOiIiLCJlbWFpbCI6IndhaHl1QGdtYWlsLmNvbSJ9LCJzdWIiOiJ3YWh5dUBnbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1MjUzMTU0MzQsImV4cCI6MTUyNTQ1OTQzNH0.REDaNoquEPWyeYn-5FaoqE3d5A-GzErvL2Dfue2pb-nVqPQYoqFJdJK0JOaQTJXlB19hXPg8AAZTyMJVAa8g_w'});
    // return this.http.get('http://43.243.141.117:8080/belisada-admin/manage/store/approval?page=1&itemperpage=22', {headers: headers});
    return this.http.get('http://43.243.141.117:8080/belisada-admin/manage/store/approval',   {params: params, headers})
    .map(resp => resp as List);
}

getDetailToko(key: string): Observable<detailToko> {
    const headers = new HttpHeaders({'token': 'eyJhbGciOiJIUzUxMiJ9.eyJVc2VyRGF0YSI6eyJyb2xlIjo3LCJuYW1lIjoid2FoeXUiLCJhdmF0YXIiOiIiLCJlbWFpbCI6IndhaHl1QGdtYWlsLmNvbSJ9LCJzdWIiOiJ3YWh5dUBnbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1MjUzMTU0MzQsImV4cCI6MTUyNTQ1OTQzNH0.REDaNoquEPWyeYn-5FaoqE3d5A-GzErvL2Dfue2pb-nVqPQYoqFJdJK0JOaQTJXlB19hXPg8AAZTyMJVAa8g_w'});
    return this.http.get('http://43.243.141.117:8080/belisada-admin/manage/store/approval/detail/'+ key , { headers })
    .map(response => response as detailToko);
}

postToko(data): Observable<updateToko> {
    const headers = new HttpHeaders({'token': 'eyJhbGciOiJIUzUxMiJ9.eyJVc2VyRGF0YSI6eyJyb2xlIjo3LCJuYW1lIjoid2FoeXUiLCJhdmF0YXIiOiIiLCJlbWFpbCI6IndhaHl1QGdtYWlsLmNvbSJ9LCJzdWIiOiJ3YWh5dUBnbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1MjUzMTU0MzQsImV4cCI6MTUyNTQ1OTQzNH0.REDaNoquEPWyeYn-5FaoqE3d5A-GzErvL2Dfue2pb-nVqPQYoqFJdJK0JOaQTJXlB19hXPg8AAZTyMJVAa8g_w'});
    return this.http.put('http://43.243.141.117:8080/belisada-admin/manage/store/approval/update', data, { headers })
    .map(response => response as updateToko);
}

}
