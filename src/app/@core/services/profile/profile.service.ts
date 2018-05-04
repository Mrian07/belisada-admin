import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http/src/headers';
import { Router } from '@angular/router';
import { Avatar, ChangePasswordRequest, ChangePassword, Profile } from '../../models/profile/profile.model';

import 'rxjs/add/operator/map';
@Injectable()
export class ProfileService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getProfile(){
    return this.http.get(this.configuration.apiURL + '/profile')
    .map(resp => resp as Profile);
  }

  changePassword(data){
    return this.http.put(this.configuration.apiURL + '/account/changepassword', data)
    .map(resp => resp as ChangePasswordRequest);
  }

  uploadAvatar(data){
    return this.http.put(this.configuration.apiURL + '/profile/avatar/update', data)
    .map(resp => resp as Avatar);
  }

}
