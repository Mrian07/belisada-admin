import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivateChild } from '@angular/router/src/interfaces';
import { Router } from '@angular/router';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivateChild {
  constructor( private router: Router) {
  }

  /*
  param:
  Used by: app.module.ts
  Description: Fungsi ini untuk melakukan pengecekan apakah token ada pada local storage,
  jika tidak ada maka user akan dialihkan ke halaman sign in.
  */
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = localStorage.getItem('token');
    if (!user) {
      this.router.navigateByUrl('/account/sign-in');
      return false;
    } else {
      return true;
    }
  }
}
