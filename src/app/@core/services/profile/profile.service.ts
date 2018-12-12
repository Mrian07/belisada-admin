import { Injectable } from '@angular/core';
import { Configuration } from '../../config/configuration';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Avatar, ChangePasswordRequest, Profile } from '../../models/profile/profile.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private configuration: Configuration, private http: HttpClient, private routes: Router) { }

  getProfile() {
    return this.http.get(this.configuration.apiURL + '/profile')
    .pipe(
      map(resp => resp as Profile)
    );
  }

  changePassword(data) {
    return this.http.put(this.configuration.apiURL + '/account/changepassword', data)
    .pipe(
      map(resp => resp as ChangePasswordRequest)
    );
  }

  uploadAvatar(data) {
    return this.http.put(this.configuration.apiURL + '/profile/avatar/update', data)
    .pipe(
      map(resp => resp as Avatar)
    );
  }
}
