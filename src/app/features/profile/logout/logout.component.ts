import { LocalStorageEnum } from './../../../@core/enum/local-storage.enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  logout() {
      localStorage.removeItem(LocalStorageEnum.TOKEN_KEY);
      this.router.navigateByUrl('/auth/login');
  }

}
