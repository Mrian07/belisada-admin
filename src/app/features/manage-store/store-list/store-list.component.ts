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
  array: any[];
  constSudahTeracak: any[];
  arrayRight: any[];
  checkSort: boolean = false;
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
    this.okeOceFunc();
    this.wow();
  }
  loadData() {
    this.auth.getData().subscribe(data => {
      this.exa = data;
      console.log('data : ', data);
      this.array = [];
      this.arrayRight = [];
      data.forEach(x => {
        this.array.push(x.name);
        this.arrayRight.push(x.name);
      });
    });
  }

  functionArrayBenar() {
    this.checkSort = false;
    this.arrayRight;
    console.log(this.arrayRight);
  }

  funcSortArray() {
    this.checkSort = true;
    this.constSudahTeracak = this.sortData(this.array);
    console.log('Aray yang sudah Urut', this.constSudahTeracak);
  }

   sortData(array: Array<number | string>): Array<number | string> {
    return array.sort((a, b) => a < b ?  -1: 1);
  }
   sortIt(arr){
    return arr.sort((a,b) => a.replace(/[a-z]+/) - b.replace(/[a-z]+/));
  }
  wow() {

console.log(this.sortIt(['Item3', 'Item1', 'Item2']));
console.log(this.sortIt(['Item12', 'Item3', 'Item1', 'Item2', 'Item4']));
console.log(this.sortIt(['Item1', 'Item1', 'Item2']));
  }
  okeOceFunc() {
    const sorted = this.sortData(['4(a)', 4, 3, '2(b) #NameWithN', '2(b) #AsimpleName']); 
    console.log(sorted);
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