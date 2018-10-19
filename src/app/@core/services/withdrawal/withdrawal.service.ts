import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import { Withdrawal, Bank } from '../../models/withdrawal/withdrawal.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';

import 'rxjs/add/operator/map';
@Injectable()
export class WithdrawalService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }


getWithdrawal(queryParams): Observable<Withdrawal>  {
    let params = new HttpParams();
    Object.keys(queryParams).forEach(function(k){
      params = params.append(k, queryParams[k]);
    });
    return this.http.get(this.configuration.apiURL + '/withdrawal', {params: params})
    .map(resp => resp as Withdrawal);
}


getBank(): Observable<Bank[]>  {
  return this.http.get(this.configuration.apiURL + '/bank/account/belisada')
  .map(resp => resp as Bank[]);
}

//   changePassword(data){
//     return this.http.put(this.configuration.apiURL + '/account/changepassword', data)
//     .map(resp => resp as ChangePasswordRequest);
//   }

//   uploadAvatar(data){
//     return this.http.put(this.configuration.apiURL + '/profile/avatar/update', data)
//     .map(resp => resp as Avatar);
//   }

}
