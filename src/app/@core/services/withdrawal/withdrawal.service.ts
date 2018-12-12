import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { Router } from '@angular/router';
import { Withdrawal, Bank, MainDetail, Transfer } from '../../models/withdrawal/withdrawal.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }


  getWithdrawal(queryParams): Observable<Withdrawal>  {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k) {
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/withdrawal', {params: params})
      .pipe(
        map(resp => resp as Withdrawal)
      );
  }


  getBank(): Observable<Bank[]>  {
    return this.http.get(this.configuration.apiURL + '/bank/account/belisada')
    .pipe(
        map(resp => resp as Bank[])
    );
  }

  getDetail(id): Observable<MainDetail>  {
    return this.http.get(this.configuration.apiURL + '/withdrawal/detail/' + id)
    .pipe(
        map(resp => resp as MainDetail)
    );
  }

  transfer(data): Observable<Transfer> {
    return this.http.post(this.configuration.apiURL + '//withdrawal/confirmation/transfer', data)
    .pipe(
        map(resp => resp as Transfer)
    );
  }
}
