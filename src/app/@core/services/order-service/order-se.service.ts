import { Transaction } from './../../models/customer-service-m/customer-model';
import { Observable } from 'rxjs/Observable';
import { Configuration } from './../../config/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class OrderSeService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getList(queryParams): Observable<Transaction>  {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/order/v2', {params: params})
    .map(resp => resp as Transaction);
    }
}
