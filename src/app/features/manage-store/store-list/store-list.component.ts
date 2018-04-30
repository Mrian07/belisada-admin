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
  car:Car = new Car();
  colours: Array<Colour>;
  collapsed1: boolean = false;
  Approval: boolean;
  cCharacters: string = 'wahyu';
  approved: string = 'Approved';
  needApproved: string = 'Need Approval';
  cha = ['asdadadasdsad', 'adadadasd1', 'adasdad3'];
  exa: Example[];
  characters = [];
  array: any[];
  exali:exapmling = new exapmling();
  constSudahTeracak: any;
  arrayRight: any[];
  checkSort: boolean = false;
  arrayBenar: any;
  aaaa;
  city: FormControl;
  checkIfButtonWasPressed: boolean = false;
  descripReject: FormControl;
  private rowSelected: number
  constructor(private auth: AuthenticationService) {
    this.rowSelected = -1;

  }
  getCharacter(id) {
    this.cCharacters = id;
    console.log(this.cCharacters);
  }

  ngOnInit() {
    this.colours = Array<Colour>();
    this.colours.push(new Colour(0, 'Need Approval'));
    this.colours.push(new Colour(1, 'Approved'));
    this.colours.push(new Colour(2, 'Rejected'));
    this.colours.push(new Colour(2, 'Revise'));
    this.city = new FormControl('');
    this.descripReject = new FormControl();
    // this.city = new FormControl('');
    this.collapsed1;
    this.loadData();
  }
  loadData() {
    this.city.reset();
    this.auth.getData().subscribe(data => {
      this.exa = data;
      this.arrayBenar = data;
      this.arrayBenar = this.exa;
      this.array = [];
      this.arrayRight = [];
      data.forEach(x => {
        this.array.push(x.name);
        this.arrayRight.push(x.name);
        // this.exa.push(x);
      });
    });
  }
  getValueFromSelect() {
    const b = this.exali.descript = this.descripReject.value;
    this.descripReject.reset();
    this.city.reset();
    this.checkIfButtonWasPressed = false;
    alert(this.aaaa);
    
    console.log(b);
    localStorage.setItem('Testing', this.aaaa);
    localStorage.setItem('description', b);
    this.newMethod();
  }
  private newMethod() {
    this.aaaa = '2: Approved';
  }

  Selected(value: any) {
    this.checkIfButtonWasPressed = true;
  this.aaaa = value;

       }

  functionArrayBenar() {
    this.checkSort = false;
    this.constSudahTeracak = this.balikin(this.exa);
  }

  funcSortArray() {
    this.checkSort = true;
    this.constSudahTeracak = this.byName(this.exa);
  }
  sortIt(arr) {
    return arr.sort((a, b) => a.replace(/[a-z]+/) - b.replace(/[a-z]+/));
  }
  balikin(tes) {
    this.exa.sort((a, b) => {
      if (a.name < b.name) return 1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }
  byName(tes) {
    this.exa.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }
  onApprove() {
    this.Approval = true;
    console.log('Untuk mengganti approval', this.Approval);
  }
  okelu(x) {
    console.log('asd', x);
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

/*
  dibawah adalah model example untuk proses develop ( belum memakai real api dari backend belisada)

*/
export class Car
{
    color:Colour;
}
export class exapmling {
  descript: string;
}
export class Colour
{
    constructor(id:number, name:string) {
        this.id=id;
        this.name=name;
    }

    id:number;
    name:string;
}