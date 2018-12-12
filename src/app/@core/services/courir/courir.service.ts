import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {ListCourir, UpdateCourir} from '../../models/courir/courir.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourirService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getCourir(): Observable<ListCourir> {
    return this.http.get(this.configuration.apiURL + '/manage/courier')
      .pipe(
        map(resp => resp as ListCourir)
      );
  }

  updateCourier(data) {
    return this.http.post(this.configuration.apiURL + '/manage/courier/update', data)
      .pipe(
        map(resp => resp as UpdateCourir)
      );
  }

}
