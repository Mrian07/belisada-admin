import { Component, OnInit,ViewChild, Injectable, ElementRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ManageProductService } from '../../../@core/services/manage-product/manage-product.service';
import { ManageProduct, revise, ListBrand, listingCategory, listingProduct, detailListingProduct, deetailProd } from '../../../@core/models/manage-product/manage-product';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, filter, merge} from 'rxjs/operators';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { ManageStoreService } from '../../../@core/services/manage-store/manage-store.service';
import { ListingItem } from '../../../@core/models/manage-store/manage-store.model';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import swal from 'sweetalert2';
import { ModalComponent } from '../../../pages/ui-features/modals/modal/modal.component';
import { BrandService } from '../../../@core/services/brand/brand.service';
import { List, Brand } from '../../../@core/models/brand/brand.model';
import { interval } from 'rxjs/observable/interval';
import { of } from 'rxjs/observable/of';
import { CategoryService } from '../../../@core/services/category/category.service';
import { ListCategory } from '../../../@core/models/category/category.model';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
selector: 'list-product',
templateUrl: './list-product.component.html',
styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  @Input() name;
  public posts: Post[];
  modalHeader: string;
  myForm: FormGroup;
  form: FormGroup;
  
  closeResult: string;
  data: ManageProduct[];
  model: any;
  value: boolean = false;
  selected: string;
  current: number = 1;
  list3: List = new List();

  brandList: List = new List();
  brands: Brand[] = [];


  searching = false;
  searchFailed = false;
  list: ListingItem;
  txtSearch: string;
  productBrandId: number;
  isChecked: boolean;
  sel: any;
  test: boolean = true;
  isSubscribe = new FormControl(false);
  select: any;
  a: revise[];
  ll: boolean = false;

  ss: any[];
  ticks =0;


  public getC1: FormGroup;
  c1: listingCategory = new listingCategory();

  public getc2: FormGroup;
  c2: listingCategory = new listingCategory();

  public getc3: FormGroup;
  c3: listingCategory = new listingCategory();


  limit: number = 100;
  querySearch: string;
  onTextFocus: Boolean = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  @ViewChild('instance') instance: NgbTypeahead;
  public rowSelected: number;

  check: boolean;

  typeCat: string;
  typeCat2: string;
  typeCat3: string;
  titlePopUp: string;
  
  parentC1: number;
  parentC2: number;
  listCat1: ListCategory = new ListCategory();
  listCat2: ListCategory = new ListCategory();
  listCat3: ListCategory = new ListCategory();
  isAdd: boolean;

  isC2: boolean;
  isC3: boolean;


  isDataC1: boolean;
  isDataC2: boolean;

  pages: any = [];
  currentPage: any;
  lastPage: number;

  listProduct: listingProduct = new listingProduct();

  listDetailProd: detailListingProduct[] = [];

  constructor(private modalService: NgbModal,
     private prodService: ManageProductService, 
     private el: ElementRef, 
     private manage: 
     ManageStoreService,  
    private categoryService: CategoryService,
     private brandService: BrandService, 
     private fb: FormBuilder,
     private activatedRoute: ActivatedRoute) {
      this.brandList.data = [];
     }

  ngOnInit() {
    this.loadData();
    this.newMethod();
    this.form_All();
    
    this.isChecked = true;
  
    this.getC1.get('c1').valueChanges.subscribe(val => {
      this.getDataC2(val)
  });

  this.getc2.get('c2').valueChanges.subscribe(val => {
    this.getDataC3(val)
});

   
  this.getDataC1();
  
  }

  private loadData() {
    this.prodService.getDataListRevie().subscribe(asd => {
      this.a = asd;
      console.log(asd);
    });

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10
      };
      this.prodService.getDataListing(queryParams).subscribe(response => {
        this.listProduct = response;
        console.log(this.listProduct);
        this.lastPage = this.listProduct.pageCount;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.listProduct.pageCount) {
            this.pages.push(r);
          }
        }
      });
    });
  }

  private form_All() {
    this.getC1 = this.fb.group({
      c1: new FormControl(null, Validators.required),
    });
    this.getc2 = this.fb.group({
      c2: new FormControl(null)
    });
    this.getc3 = this.fb.group({
      c3: new FormControl(null)
    });
    this.myForm = this.fb.group({
      useremail: this.fb.array([]),
      tulisan: new FormControl
    });
  }

  getDataC1() {
       const queryParams = {
      type: 'C1',
      all:'true'
    }
    this.categoryService.getCategory(queryParams).subscribe(data => {
        this.c1 = data;
        console.log(data);
    });
  }
  
  getDataC2(id) {
    const queryParams = {
      parentid: id,
      all:'true'
    }
    this.categoryService.getCategory(queryParams).subscribe(data =>{
      this.c2 = data;
      console.log(this.c2);
    });
  }

  getDataC3(id) {
    const queryParams = {
      parentid: id,
      all:'true'
    }
    this.categoryService.getCategory(queryParams).subscribe(data =>{
      this.c3 = data;
      // console.log(this.c2);
    });
  }
  
  open(content, e) {
    let options: NgbModalOptions = {
      backdrop: false,
      size: 'lg'
    }
    this.modalService.open(content, options);
    console.log(e);
    this.prodService.getDetailProduct(e).subscribe(detail => {
      this.listDetailProd = detail.data;
      console.log(detail);
    })
    this.sel = e;

  }




  checkClicked(val) {
    if (val) {
      this.test = false;
    } else {
      this.test = true;
    }
    console.log(val);
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  

  onFocusOut() {
    setTimeout(() => {
      this.onTextFocus = false
    }, 200)
  }

  checkValue(event: any) {
    console.log(event);
  }

  Existing() {
    // this.value = true;
    this.value = !this.value;
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, {
      size: 'sm'
    });
  }

  changeValue() {
    console.log(this.isSubscribe.value);
    this.isSubscribe = new FormControl(!this.isSubscribe.value);
    // console.log(this.isSubscribe);

  }
  
  onScrollDown () {
    const scr = window.document.querySelector('#drick-scroll-container');
    console.log('scr.scrollHeight: ', scr.scrollHeight);
    console.log('scr.clientHeight: ', scr.clientHeight);
    console.log('scr.scrollTop: ', scr.scrollTop);
    if (scr.scrollHeight - scr.clientHeight === Math.round(scr.scrollTop)) {
      const queryParams = {
        page: this.current += 1,
        itemperpage: this.limit,
        name: this.querySearch === undefined ? '' : this.querySearch
      };
      this.brandService.getList(queryParams).subscribe(response => {
        this.brandList.data = this.brandList.data.concat(response.data);
      });
    }
    // const scr =  window.document.querySelector('#drick-scroll-container')
    // console.log(scr)
    // console.log('scr.scrollHeight: ', scr.scrollHeight);
    // console.log('scr.style.height: ', scr.clientHeight);
    // console.log('scr.scrollTop: ', scr.scrollTop);
    // if (scr.scrollHeight - scr.clientHeight === Math.round(scr.scrollTop)) {
    //   const queryParams = {
    //     page: this.current += 1,
    //     itemperpage: this.limit,
    //     name: this.querySearch === undefined ? '' : this.querySearch
    //   }
    //   this.brandService.getList(queryParams).subscribe(response => {
    //     this.brands = this.brands.concat(response.data)
    //     console.log('asd',response.data);
    //   });
    // };
  }
  

  searchBrand() {
    this.querySearch = this.txtSearch;
    const queryParams = {
      page: this.current = 1,
      itemperpage: this.limit,
      name: this.querySearch === undefined ? '' : this.querySearch
    };
    this.brandService.getList(queryParams).subscribe(response => {
      this.brandList = response;
    });
    // this.querySearch = this.txtSearch;
    // const queryParams = {
    //   page: this.current = 1,
    //   itemperpage: this.limit,
    //   name: this.querySearch === undefined ? '' : this.querySearch
    // }

    // this.brandService.getList(queryParams).subscribe(response => {
    //   this.brands = response.data;
    // });
  }

  
  Selected(value: any) {
    // this.checkIfButtonWasPressed = true;
    this.select = value;
    console.log(value);

    if (value == 7) {  
       console.log('12312321')
    }



  }
  openSm(content) {
    this.modalService.open(content, {
      size: 'sm'
    });
  }

  selectBrand(brand) {
    console.log(brand.body);
    this.txtSearch = brand.name;
    this.productBrandId = brand.m_productbrand_id;
  }

  onChange(email: any, isChecked: boolean) {
    const emailFormArray = < FormArray > this.myForm.controls.useremail;

    if (isChecked) {
      emailFormArray.push(new FormControl(email));
      this.ss = email;
      //  this.ll = isChecked;
      console.log('is', isChecked)

    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
      email = isChecked;
      this.ll = isChecked;
      console.log('asdasdsadsad',this.ll)

    }
  }


  

  oke() {
    
    // this.ss = this.ll;
    localStorage.setItem('aaaa', JSON.stringify(this.myForm.value));
   
    // window.location.reload();s
    console.log(this.myForm.value)
    this.myForm.setControl('useremail', new FormArray([]));
     this.myForm.reset();
     this.check = false;
    
     console.log('this check',this.check);
    //  this.check = true;
  
    console.log('a')
    console.log('b')
    console.log('c')
    // this.newMethod_1();
  }
  private newMethod_1() {
    this.check = true;
    console.log(this.check);
  }

  private newMethod() {
    // this.listService.getList().subscribe(res=>this.list=res);
    this.manage.getList().subscribe(x => {
      this.list = x;
    });
  }

  closeModal() {
    // this.activeModal.close();
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
export class Post {
  constructor(
    public id: number,
    public date: string,
    public subject: string,
    public numComents: number,
    public comments: string[]
  ) {}
}
export interface type {
  id: number;
  text: string;
}