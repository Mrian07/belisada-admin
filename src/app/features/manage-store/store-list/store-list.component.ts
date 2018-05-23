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
  exali: exapmling = new exapmling();
  constSudahTeracak: any;
  arrayRight: any[];
  checkSort: boolean = false;
  arrayBenar: any;
  select;
  city;
  checkIfButtonWasPressed: boolean = false;
  descripReject: FormControl;
  list: ListingItem = new ListingItem();
  postToko: updateToko[];
  statusCode: string;
  note: string;
  storeId: number;
  pager: any = {};
  listing: any;
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
  registerDat: any;
  search: any;
  namaOwner: any;
  status: any;
  verifiedByName: any;
  title: any;
  listOfItems: any;
  loading = true;
  currentPage: any;
  lastPage: number;
  registerDateSorting: boolean = false;
  namaPemilikSorting: boolean = false;
  // listToko: IsiData[];
  listToko: List = new List();
  listDetailToko: detailToko = new detailToko();
  private rowSelected: number
  constructor(private manage: ManageStoreService, public fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {
    this.rowSelected = -1;

  }
  getCharacter(id) {
    this.cCharacters = id;
    this.manage.getDetailToko(id).subscribe(detail => {
      this.listDetailToko = detail;
    })
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10
      }
      this.newMethod_1(queryParams);
    });
    // this.getDataToko(this.param);
    this.descripReject = new FormControl();
    this.city = 'Silahkan Pilih Action';
    this.collapsed1;
    this.loadData();
  }

  private newMethod_1(queryParams: { page: number; }) {
    this.manage.getListToko(queryParams).subscribe(response => {
      this.listToko = response;
      this.lastPage = this.listToko.pageCount;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.listToko.pageCount) {
          this.pages.push(r);
        }
      }
    });
  }

  loadData() {
    this.getList();
  }

  rubah(e){
    const r = 
    e.replace(new RegExp('/', 'g'), '-');
    return r;
  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.listToko.pageCount) { return false; }
    this.router.navigate(['/store/list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  // setPage(page: number, increment ? : number) {
  //   if (increment) {
  //     page = +page + increment;
  //   }
  //   if (page < 1 || page > this.lastPages) {
  //     return false;
  //   }
  //   this.router.navigate(['/store/list'], {
  //     queryParams: {
  //       page: page
  //     }
  //   });
  //   window.scrollTo(0, 0);

  // }
  private getList() {
    this.manage.getList().subscribe(x => {
      this.list = x;
    });
  }

  getDataToko(param) {

    const paramm = {
      page: param
    }
    this.manage.getListToko(paramm).subscribe(dataToko => {
      this.listToko = dataToko;
      this.lastPages = dataToko.pageCount;
      this.start = (this.currentPage - 1) * this.limit;
      this.end = this.start + this.limit;
      this.pages = [];
      if (this.end > this.total) {
        this.end = this.total;
      }
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
      statusCode: this.select,
      note: b,
      storeId: this.cCharacters
    }
    this.postingPut(postData);
  }
  private postingPut(postData: {
    statusCode: string;note: string;storeId: string;
  }) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const newLocal = this.manage.postToko(postData).subscribe(postDa => {
          this.getDataToko(this.currentPage);
          // this.newMethod_1(this.currentPage);
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === swal.DismissReason.cancel
      ) {
        console.log('');
      }
    });
    this.city = 'Silahkan Pilih Action';


  }

  private newMethod() {
    this.select = '2: Approved';
  }

  Selected(value: any) {
    this.checkIfButtonWasPressed = true;
    this.select = value;

  }

  functionArrayBenar() {
    this.checkSort = false;
    this.constSudahTeracak = this.reArray(this.listToko.data);
  }

  funcSortArray() {
    this.checkSort = true;
    this.constSudahTeracak = this.byName(this.listToko);
  }

  funcSortDateArray() {
    this.registerDateSorting = true;
    this.constSudahTeracak = this.registerDateSort(this.listToko);
  }
  funcSortDateArrayBenar() {
    this.registerDateSorting = false;
    this.constSudahTeracak = this.registerDateArrayBenar(this.listToko);
  }

  funcNamaPemilikArray() {
    this.namaPemilikSorting = true;
    this.constSudahTeracak = this.namaPemilikDataArray(this.listToko);
  }

  funcSortNamaPemilikBenar() {
    this.namaPemilikSorting = false;
    this.constSudahTeracak = this.namaPemilikDataArrayBenar(this.listToko);
  }

  sortIt(arr) {
    return arr.sort((a, b) => a.replace(/[a-z]+/) - b.replace(/[a-z]+/));
  }
  reArray(tes) {
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

  approvedBy(tes) {
    this.listToko.data.sort((a, b) => {
      if (a.verifiedByName < b.verifiedByName) return -1;
      else if (a.verifiedByName > b.verifiedByName) return 1;
      else return 0;
    });
  }

  registerDateSort(tes) {
    this.listToko.data.sort((a, b) => {
      if (a.registeredDate < b.registeredDate) return -1;
      else if (a.registeredDate > b.registeredDate) return 1;
      else return 0;
    });
  }

  registerDateArrayBenar(tes) {
    this.listToko.data.sort((a, b) => {
      if (a.registeredDate < b.registeredDate) return 1;
      else if (a.registeredDate > b.registeredDate) return -1;
      else return 0;
    });
  }

  namaPemilikDataArray(tes) {
    this.listToko.data.sort((a, b) => {
      if (a.ownerStore < b.ownerStore) return +1;
      else if (a.ownerStore > b.ownerStore) return 1;
      else return 0;
    });
  }

  namaPemilikDataArrayBenar(tes) {
    this.listToko.data.sort((a, b) => {
      if (a.ownerStore < b.ownerStore) return 1;
      else if (a.ownerStore > b.ownerStore) return -1;
      else return 0;
    });
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