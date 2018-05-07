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
return this.http.get(this.configuration.apiURL + '/status/store/approval')
.map(resp => resp as ListingItem);
}

getListToko(queryParams): Observable<List> {
    let params = new HttpParams();
Object.keys(queryParams).forEach(function(k){
  params = params.append(k, queryParams[k]);
});
    return this.http.get(this.configuration.apiURL + '/manage/store/approval',   {params: params})
    .map(resp => resp as List);
}

getDetailToko(key: string): Observable<detailToko> {
    return this.http.get(this.configuration.apiURL +'/manage/store/approval/detail/'+ key)
    .map(response => response as detailToko);
}

postToko(data): Observable<updateToko> {
    return this.http.put(this.configuration.apiURL + '/manage/store/approval/update', data)
    .map(response => response as updateToko);
}

}
