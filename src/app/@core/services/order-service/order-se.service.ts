import { Transaction } from './../../models/customer-service-m/customer-model';
import { Observable } from 'rxjs/Observable';
import { Configuration } from './../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class OrderSeService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getList(): Observable<Transaction>  {
    return this.http.get(this.configuration.apiURL + '/order?itemperpage=10&page=1')
    .map(resp => resp as Transaction);
    }
}
