import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthenticationService, Example } from '../../../@core/services/authentication/authentication.service';
import { FormBuilder, FormGroup, Validators , ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
@Component({
  selector: 'store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.scss'],
})

export class StoreListComponent {
  collapsed1: boolean = false;
  Approval: boolean;
  cCharacters: string = 'wahyu';
  approved: string = 'Approved';
  needApproved: string = 'Need Approval';
  cha = ['asdadadasdsad', 'adadadasd1', 'adasdad3'];
  exa: Example;
  characters = [];
  private rowSelected: number
  constructor(private auth: AuthenticationService) {
    this.rowSelected = -1;
  }
  getCharacter(id) {
    this.cCharacters = id;
    console.log(this.cCharacters);
  }

  ngOnInit() {
    this.collapsed1;
    this.loadData();
  }
  loadData() {
    this.auth.getData().subscribe(data => {
      this.exa = data;
      console.log('data : ', data);
    });
  }
  onApprove() {
    this.Approval = true;
    console.log('Untuk mengganti approval', this.Approval);
  }
  public openCloseRow(idReserva: number): void {

    if (this.rowSelected === -1) {
      this.rowSelected = idReserva
    } else {
      if (this.rowSelected == idReserva) {
        this.rowSelected = -1
      } else {
        this.rowSelected = idReserva
      }

    }
  }

}