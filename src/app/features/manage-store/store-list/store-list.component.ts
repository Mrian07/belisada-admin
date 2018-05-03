import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { FormBuilder, FormGroup, Validators , ValidatorFn, AbstractControl, FormControl} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { exapmling, List, updateToko, detailToko, ListingItem } from '../../../@core/models/manage-store/manage-store.model';
import { ManageStoreService } from '../../../@core/services/manage-store/manage-store.service';

import swal from 'sweetalert2';

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
  characters = [];
  array: any[];
  exali:exapmling = new exapmling();
  constSudahTeracak: any;
  arrayRight: any[];
  checkSort: boolean = false;
  arrayBenar: any;
  aaaa;
  city;
  checkIfButtonWasPressed: boolean = false;
  descripReject: FormControl;
  list: ListingItem = new ListingItem();
  postToko: updateToko[];
  statusCode: string;
  note:string;
  storeId: number;
  pager: any = {};
  listing: any;
  currentPage = 1;
  lastPages: number;
  start = 0;
  end = 0;
  total = 0;
  limit = 12;
  pages: any = [];
  public registrationForm;
  param: any;
  param1: string;
param2: string;

  // listToko: IsiData[];
  listToko: List = new List();
  listDetailToko: detailToko = new detailToko();
  private rowSelected: number
  constructor(private manage: ManageStoreService, public fb: FormBuilder,  private router: Router, private activatedRoute: ActivatedRoute) {
    this.rowSelected = -1;

  }
  getCharacter(id) {
    this.cCharacters = id;
    console.log(this.cCharacters);
    this.manage.getDetailToko(id).subscribe(detail => {
      this.listDetailToko = detail;
      console.log('aaaa',detail);
    })
  }

  ngOnInit() {
    console.log('Called Constructor');
    this.activatedRoute.queryParams.subscribe(params => {
        this.param1 = params['page'];
    });
    console.log(this.param1);
    this.param = this.activatedRoute.snapshot.queryParams["page"];
    console.log('a', this.param);
    this.getDataToko(this.param);
    console.log('pages',this.param);
    this.descripReject = new FormControl();
    // this.city = new FormControl();
    // this.city = new FormControl('');
    this.city = 'Silahkan Pilih Action';
    this.collapsed1;
    this.loadData();
  }
 
  loadData() {
    this.getList();
  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPages) { return false; }
    this.router.navigate(['/store/list'], { queryParams: { page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);window.location.reload();
  }
  private getList() {
    this.manage.getList().subscribe(x => {
      this.list = x;
      console.log(x);
    });
  }

     getDataToko(param) {
    
    const paramm = {
      page: param
    }
    console.log('pages', paramm);
    this.manage.getListToko(paramm).subscribe(dataToko => {
      this.listToko = dataToko;
      this.lastPages = dataToko.pageCount;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.lastPages) {
          this.pages.push(r);
        }
      }
    });
  }

  getValueFromSelect(data) {
    const b = this.exali.descript = this.descripReject.value;
    this.descripReject.reset();
    this.checkIfButtonWasPressed = false;
    const postData = {
      statusCode: this.aaaa,
      note: b,
      storeId: this.cCharacters
    }
    this.postingPut(postData);
  }
  private postingPut(postData: { statusCode: string; note: string; storeId: string; }) {
    this.manage.postToko(postData).subscribe(postDa => {
      swal({
        title: 'Are you sure?',
        text: 'You wont be able to revert this!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        console.log('tidak berhasil')
        });
      this.city = 'Silahkan Pilih Action';
      
    });
  }

  private newMethod() {
    this.aaaa = '2: Approved';
  }

  Selected(value: any) {
    this.checkIfButtonWasPressed = true;
      this.aaaa = value;
      console.log(value);

       }

  functionArrayBenar() {
    this.checkSort = false;
    this.constSudahTeracak = this.balikin(this.listToko.data);
  }

  funcSortArray() {
    this.checkSort = true;
    this.constSudahTeracak = this.byName(this.listToko);
    // console.log('ini seharusnya acak',this.byName(this.listToko.data))
  }
  sortIt(arr) {
    return arr.sort((a, b) => a.replace(/[a-z]+/) - b.replace(/[a-z]+/));
  }
  balikin(tes) {
    this.listToko.data.sort((a, b) => {
      if (a.name < b.name) return 1;
      else if (a.name > b.name) return -1;
      else return 0;
    });
  }
  byName(tes) {
    this.listToko.data.sort((a, b) => {
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