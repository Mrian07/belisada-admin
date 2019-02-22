import { Transaction, GetDataTransacition, Messa, Count } from './../../models/customer-service-m/customer-model';
import { Configuration } from './../../config/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderSeService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getList(queryParams): Observable<Transaction>  {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/order/v2', {params: params})
      .pipe(
        map(resp => resp as Transaction)
      );
  }
  getTransaction(queryParams): Observable<GetDataTransacition>  {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/order/order/confirmation/banktransfer' , {params: params})
      .pipe(
        map(resp => resp as GetDataTransacition)
      );
  }
  getStatusReasson() {
    return this.http.get(this.configuration.apiURL + '/status/reason');
  }
  paymentSucceful(data):  Observable<Messa> {
    return this.http.post(this.configuration.apiURL + '/order/order/confirmation/paymentissuccessful' , data)
      .pipe(
        map(res => res as Messa)
      );
  }
  paymentFailed(data): Observable<Messa> {
    return this.http.post(this.configuration.apiURL + '/order/order/confirmation/paymentisfailed' , data)
      .pipe(
        map(res => res as Messa)
      );
  }
  getCount(): Observable<Count>  {
    return this.http.get(this.configuration.apiURL + '/order/count')
      .pipe(
        map(resp => resp as Count)
      );
  }
  // getCount() {
  //   return this.http.get(this.configuration.apiURL + '/status/reason');
  // }
}
