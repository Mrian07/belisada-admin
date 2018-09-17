import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Configuration } from '../../config/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import {ListCourir, UpdateCourir} from '../../models/courir/courir.model';

@Injectable()
export class CourirService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getCourir(): Observable<ListCourir>{
    return this.http.get(this.configuration.apiURL + '/manage/courier')
      .map(resp => resp as ListCourir);
  }

  updateCourier(data){
    return this.http.post(this.configuration.apiURL + '/manage/courier/update', data)
    .map(resp => resp as UpdateCourir);
  }

}
