import { Component, OnInit,ViewChild, Injectable, ElementRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ManageProductService } from '../../../@core/services/manage-product/manage-product.service';
import { ManageProduct, revise, ListBrand, listingCategory, listingProduct, detailListingProduct, deetailProd, dataListingCategory } from '../../../@core/models/manage-product/manage-product';
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
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
selector: 'list-product',
templateUrl: './list-product.component.html',
styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  @Input() name;
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
  txtSearch: any;
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
  
  /* method post
  */
  brandId : number;
  cat3Value: number;
  prodId: number;
  statusCode: string;
  version: number;
  /* akhir dari method post
  */
  
 start = 0;
 end = 0;
 total = 0;
 limits = 12;
 cat1Ni : number;
 const2 : number;


  public getC1: FormGroup;
  c1: listingCategory = new listingCategory();
  c1Data: detailListingProduct[];

  selectedCategory: any;


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
     private activatedRoute: ActivatedRoute,
     private router: Router) {
      this.brandList.data = [];
     }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10
      }
      this.dataTes(queryParams);
    });
    this.brandInit();
    this.loadData();
    this.newMethod();
    this.form_All();
    
    this.isChecked = true;
    this.getDataC1();
  
    this.getC1.get('c1').valueChanges.subscribe(val => {
      // this.getDataC2(val)
      this.cat1Ni = val;
      console.log('get c1',this.cat1Ni);
  });

  this.getC1.get('c2').valueChanges.subscribe(val => {
    // this.getDataC3(this.const2)


});
this.getC1.get('c2').valueChanges.subscribe(val => {});
 
  
  }

  private loadData() {
    this.prodService.getDataListRevie().subscribe(asd => {
      this.a = asd;
    });
    // this.brandInit();
  }

  private newMethod_2() {
    return {
      page: this.currentPage,
      itemperpage: 10
    };
  
  }

  setC2(set) {
    const postalId: number = this.c1.data.find(x => x.categoryId === set).categoryId;
    this.getC1.patchValue({
      c2: postalId
    });
    console.log(postalId);
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.listProduct.pageCount) { return false; }
    this.router.navigate(['/product/list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }


  // private getProduct(queryParams: { page: any; itemperpage: number; }) {
  //   this.prodService.getDataListing(queryParams).subscribe(response => {
  //     this.listProduct = response;
  //     // this.lastPage = this.listProduct.pageCount;
  //     this.lastPage = this.listProduct.pageCount;
  //     this.start = (this.currentPage - 1) * this.limits;
  //     this.end = this.start + this.limits;
  //     this.pages = [];
  //     if (this.end > this.total) {
  //       this.end = this.total;
  //     }
  //     this.lastPage = this.listProduct.pageCount;
  //     for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
  //       if (r > 0 && r <= this.lastPage) {
  //         this.pages.push(r);
  //       }
  //     }
      
  //   });
  // }
  getProduct(param) {

    const paramm = {
      page: param
    }
    this.prodService.getDataListing(paramm).subscribe(dataToko => {
      this.listProduct = dataToko;
      this.lastPage = dataToko.pageCount;
      this.start = (this.currentPage - 1) * this.limit;
      this.end = this.start + this.limit;
      this.pages = [];
      if (this.end > this.total) {
        this.end = this.total;
      }
      this.lastPage = dataToko.pageCount;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.lastPage) {
          this.pages.push(r);
        }
      }
    });
  }
  private dataTes(queryParams: { page: number; }) {
    this.prodService.getDataListing(queryParams).subscribe(response => {
      this.listProduct = response;
      this.lastPage = this.listProduct.pageCount;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.listProduct.pageCount) {
          this.pages.push(r);
        }
      }
    });
  }

  private form_All() {
    this.getC1 = this.fb.group({
      c1: new FormControl(null, Validators.required),
      c2: new FormControl(null),
      c3: new FormControl(null)
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
    });
  }
  
  getDataC2(id, cb) {
    const queryParams = {
      parentid: id,
      all:'true'
    }
    this.categoryService.getCategory(queryParams).subscribe(data =>{
      this.c2 = data;
      cb();
    });
  }

  getDataC3(id, callback) {
    const queryParams = {
      parentid: id,
      all:'true',
      type: "C3"
    }
    console.log('ini id nya si parent id getdata c3', id)
    this.categoryService.getCategory(queryParams).subscribe(data =>{
      this.c3 = data;
      console.log(this.c3);
      callback();
      this.isC2=true;
      this.isC3=true;
      this.typeCat3 = "c3";
      this.parentC2 = id;
    });
  }

 
  onFocusOut() {
    setTimeout(() => { this.onTextFocus = false }, 200)
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
  }

  

  selectBrand(brand) {
    this.brandId = brand.brandId;
    this.txtSearch = brand.name;
    this.productBrandId = brand.m_productbrand_id;
  }
  
  open(content, e, bId, cat1, cat2, cat3) {
    let options: NgbModalOptions = {
      backdrop: false,
      size: 'lg'
    }
    this.modalService.open(content, options);
    this.prodId = e;
    this.prodService.getDetailProduct(e).subscribe(detail => {
      this.listDetailProd = detail.data;
    })
    this.brandId = bId;
    console.log('cat2',cat2);
    this.cat3Value = cat3;
    // const cat1Ni: number = this.c1.data.find(x => x.categoryId === cat1 && cat2 && cat3).categoryId;
     this.cat1Ni = this.c1.data.find(x => x.categoryId === cat1).categoryId;
    // const const2: number = this.c2.data.find(x => x.categoryId === cat2).categoryId;
    console.log('c2: ', this.c2);
    console.log('cat1Ni: ', cat1);
    console.log('cat3', cat3);
    console.log('ini catni1',this.cat1Ni)

    this.getDataC2(this.cat1Ni, () => {
       this.const2 = this.c2.data.find(x => x.categoryId === cat2).categoryId;
      console.log('const2: ', this.const2);
      this.getC1.patchValue({
        c1: this.cat1Ni,
        c2: this.const2
      });
    })

    this.getDataC3(cat2, () => {
      const const3: number = this.c3.data.find(x => x.categoryId === cat3).categoryId;
      console.log('const3: ', const3);
      this.getC1.patchValue({
        c1: this.cat1Ni,
        c3: const3
      });
    })
    // const cat2Ni: number = this
    console.log('asdasdsadas',this.cat1Ni);
    this.brandInit();
    this.txtSearch = this.brandList.data.find(x => x.brandId === bId).name;
    this.sel = e;

  }


  brandInit() {
    const a = {
      page: this.current = 1,
      itemperpage: this.limit,
      name: this.querySearch === undefined ? '' : this.querySearch,
      all: true
    };
    this.brandService.getList(a).subscribe(response => {
      this.brandList = response;
    });


  }

  changeValue() {
    this.isSubscribe = new FormControl(!this.isSubscribe.value);

  }
  
  onScrollDown () {
    const scr = window.document.querySelector('#drick-scroll-container');
   
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
  }
  

  


  
  Selected(value: any, ver: any) {
    this.select = value;
    this.version = ver;

    const a = {
      brandId : this.brandId,
      categoryThreeId : this.cat3Value,
      productId : this.prodId,
      statusCode: this.select,
      version: this.version
    };
    if (value == 'AP') {  
        {
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
              const newLocal = this.prodService.postToko(a).subscribe(postDa => {
                this.getProduct(this.currentPage);
              });
            } else if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
            ) {
              alert('bb')
            }
          });
      
      
        }
    }
    if (value === 'RJ') {
        {
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
              const newLocal = this.prodService.postToko(a).subscribe(postDa => {
                this.getProduct(this.currentPage);
              });
            } else if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
            ) {
              alert('aaaa')
            }
          });
      
      
        }
    }



  }

  // openSm(content) {
  //   this.modalService.open(content, {
  //     size: 'sm'
  //   });
  // }

 

  onChange(email: any, isChecked: boolean) {
    const emailFormArray = < FormArray > this.myForm.controls.useremail;
    
    if (isChecked) {
      emailFormArray.push(new FormControl(email));
      this.ss = email;

    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
      email = isChecked;
      this.ll = isChecked;

    }
  }


  
  oke(verc) {
     const p =  {
      approvalProductIssue: this.myForm.value.useremail,
      version: verc,
      brandId : this.brandId,
      categoryThreeId : this.cat3Value,
      productId : this.prodId,
      statusCode: this.select,
      note: this.myForm.value.tulisan
     }
     {
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
          const newLocal = this.prodService.postToko(p).subscribe(postDa => {
            this.getProduct(this.currentPage);
          });
        } else if (
          // Read more about handling dismissals
          result.dismiss === swal.DismissReason.cancel
        ) {
          alert('bb')
        }
      });
  
  
    }
    this.myForm.setControl('useremail', new FormArray([]));
     this.myForm.reset();
     this.check = false;
  }
  
  private newMethod_1() {
    this.check = true;
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