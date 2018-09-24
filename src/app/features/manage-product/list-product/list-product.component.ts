import { ProductDetailData, SpecificationList } from './../../../@core/models/category/category.model';
import { CategoryAttribute } from './../../../@core/models/manage-product/manage-product';
import { Component, OnInit, ViewChild, Injectable, ElementRef, Input, OnDestroy } from '@angular/core';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ManageProductService } from '../../../@core/services/manage-product/manage-product.service';
import { ManageProduct, revise, listingCategory,
listingProduct, detailListingProduct } from '../../../@core/models/manage-product/manage-product';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { ManageStoreService } from '../../../@core/services/manage-store/manage-store.service';
import { ListingItem } from '../../../@core/models/manage-store/manage-store.model';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import swal from 'sweetalert2';
import { BrandService } from '../../../@core/services/brand/brand.service';
import { List, Brand } from '../../../@core/models/brand/brand.model';
import { of } from 'rxjs/observable/of';
import { CategoryService } from '../../../@core/services/category/category.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
selector: 'list-product',
templateUrl: './list-product.component.html',
styleUrls: ['./list-product.component.scss'],
})
export class ListProductComponent implements OnInit, OnDestroy {
  @Input() name;
  modalHeader: string;
  myForm: FormGroup;
  form: FormGroup;
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
  txtSearchMaster: any;
  querySearchMaster: any;


  productBrandId: number;
  isChecked: boolean;
  sel: any;
  test: boolean = true;
  isSubscribe = new FormControl(false);
  select: any;
  a: revise[];
  ll: boolean = false;

  ss: any[];
  ticks= 0;



  /* method post
  */
  brandId: number;
  masterId: any;
  cat3Value: number;
  prodId: number;
  statusCode: string;
  version: number;
  /* akhir dari method post
  */

  /* category
  */
 categoryName = {
  C1: '',
  C2: '',
  C3: '',
};
onCategoryFocus = {
  C1: false,
  C2: false,
  C3: false,
};
categoryId = {
  C1: '',
  C2: '',
  C3: '',
};
categoryList = {
  C1: new listingCategory(),
  C2: new listingCategory(),
  C3: new listingCategory(),
};
categoryAttributes: CategoryAttribute[];
spec: any[] = [];

  /* akhir dari category
  */

  /* form grup */
  addProductForm: FormGroup;

  /* akhir dari form grup */

  start = 0;
  end = 0;
  total = 0;
  limits = 12;
  cat1Ni: number;
  ok;
  const2: number;
  const3: number;
  let;
  public isCollapsed = false;

  limit: number = 100;
  querySearch: any;
  onTextFocus: Boolean = false;
  onTextFocusMaster: Boolean = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  @ViewChild('instance') instance: NgbTypeahead;
  public rowSelected: number;

  check: boolean;
  results = [];
  titlePopUp: string;

  isAdd: boolean;
  brandName;
  modalRef: NgbModalRef;

  pages: any = [];
  currentPage: any;
  lastPage: number;
  toBackend: any = [];

  listProduct: listingProduct = new listingProduct();

  listDetailProd: detailListingProduct[] = [];
  getDetailMaster: detailListingProduct[] = [];

  createdDate: string;
  storeName: string;
  keyName: any;

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
    this.categoryList.C1.data = [];
    this.categoryList.C2.data = [];
    this.categoryList.C3.data = [];
    this.categoryAttributes = [];
    }

  ngOnInit() {

    /* category c1 c2 c3 init */
    this.getCategoryInit('C1');

    /* akhir dari category c1 c2 c3 init */

    this.brandInit();
    this.masterDetail();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      if (this.keyName === undefined ){
        this.keyName = '';
      }
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
        ob : 'custom',
        name:  this.keyName,
      }
      this.dataTes(queryParams);
    });

    this.loadData();
    this.newMethod();
    this.form_All();

    this.isChecked = true;


  }

  searchK(event) {
    const key = event.target.value;
    this.keyName = key;
    const queryParams = {
      page: 1,
      itemperpage: 10,
      name: key,
      ob : 'custom',
    }
    if (key === '' || event.key === 'Enter') {
      this.prodService.getDataListing(queryParams).subscribe(response => {
        this.listProduct = response;
      });
    } else {
      this.prodService.getDataListing(queryParams).subscribe(data => {
        this.listProduct = data;
      });
    }
  }

  private loadData() {
    this.prodService.getDataListRevie().subscribe(asd => {
      this.a = asd;
    });
  }


  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.listProduct.pageCount) { return false; }
    this.router.navigate(['/product/list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }
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

  rubah(e) {
    const r =
    e.replace(new RegExp('/', 'g'), ' - ');
    return r;
  }

  getProduct(param) {

    const paramm = {
      page: param,
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
    this.myForm = this.fb.group({
      useremail: this.fb.array([]),
      tulisan: new FormControl,
    });

    this.addProductForm = this.fb.group({
      categoryThreeId: ['', [Validators.required]],
      classification: ['', [Validators.required]],
      description: ['', [Validators.required]],
      guaranteeTime: ['', [Validators.required]],
      specification: [[]],
    });
  }

  formSend() {
    this.toBackend = {
      brandId : this.brandId,
      categoryThreeId : this.addProductForm.get('categoryThreeId').value,
      productId : this.prodId,
      statusCode: this.select,
      version: this.version,
    };
  }

  /* category
  */
 onCategoryBlur(categoryType) {
  setTimeout(() => { this.onCategoryFocus[categoryType] = false; }, 200);
}

searchCategory(categoryType, parentid?) {
  const queryParams = {
    name: this.categoryName[categoryType] === undefined ? '' : this.categoryName[categoryType],
    type: categoryType,
  };
  if (parentid) {
    queryParams['parentid'] = parentid;
  }
  this.categoryService.getCategory(queryParams).subscribe(response => {
    this.categoryList[categoryType] = response;
  });
}
selectCategory(category) {
  this.addProductForm.patchValue({
    categoryThreeId: (category.type !== 'C1') ? category.categoryId : 0,
  });
  this.categoryName[category.type] = category.name;
  this.categoryId[category.type] = category.categoryId;
  const queryParams = {
    categoryid: category.categoryId,
  };
  this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
    this.categoryAttributes = response;
    let categoryType;
    if (category.type === 'C1') {
      categoryType = 'C2';
      this.categoryName.C2 = '';
      this.categoryName.C3 = '';
    } else if (category.type === 'C2') {
      categoryType = 'C3';
      this.categoryName.C3 = '';
    } else {
      categoryType = false;
    }
    if (categoryType) {
      this.getCategoryInit(categoryType, category.categoryId);
    }
  });
}
getCategoryInit(categoryType, parentid?) {
  const queryParams = {
    type: categoryType,
    all: true,
    isactive: true,
  };
  if (parentid) {
    queryParams['parentid'] = parentid;
  }
  this.categoryService.getCategory(queryParams).subscribe(response => {
    this.categoryList[categoryType] = response;
  });
}
 /*
  ahkir  dari category  */

  fillFormSpecification(specifications: SpecificationList[]) {
    specifications.forEach((specification) => {
      this.spec[specification.attributeId] = specification.attributeValueId;
    });
  }


  onFocusOut() {

    setTimeout(() => { this.onTextFocus = false }, 200)
  }

  onFocusOutMaster() {

    setTimeout(() => { this.onTextFocusMaster = false }, 200)
  }


  masterDetail() {
    const queryParams = {
      page: this.current = 1,
      itemperpage: 10,
    };
    this.prodService.getListingProductMaster(queryParams).subscribe(response => {
      this.getDetailMaster = response.content
    });
  }
  searchMaster(e) {
    console.log(e);
    //  this.txtSearch = this.brandList.data.find(x => x.brandId === e).name;
    this.querySearchMaster = this.txtSearchMaster;
    const queryParams = {
      page: this.current = 1,
      itemperpage: this.limit,
      name: this.querySearchMaster === undefined ? '' : this.querySearchMaster,

    };
    this.prodService.getListingProductMaster(queryParams).subscribe(response => {
      this.getDetailMaster = response.content;
    });
  }
  searchBrand(e) {
    //  this.txtSearch = this.brandList.data.find(x => x.brandId === e).name;
    this.querySearch = this.txtSearch;
    const queryParams = {
      page: this.current = 1,
      itemperpage: this.limit,
      name: this.querySearch === undefined ? '' : this.querySearch,
      isactive: true

    };
    this.brandService.getList(queryParams).subscribe(response => {
      this.brandList = response;
    });
  }

  selectMaster(master) {
    this.masterId = master.productId;
    this.txtSearchMaster = master.name;

    console.log(master.productId);

  }

  selectBrand(brand) {

    this.brandId = brand.brandId;
    this.txtSearch = brand.name;
    this.productBrandId = brand.m_productbrand_id;
  }

  fillFormPatchValue(data: ProductDetailData) {
    this.addProductForm.patchValue({
      brandId: data.brandId,
      brandName: data.brandName,
      categoryThreeId: (data.categoryThreeId !== 0) ? data.categoryThreeId : data.categoryTwoId,
      classification: data.classification,
      description: data.description,
      specification: data.specification,
    });
    this.categoryName = {
      C1: data.categoryOneName,
      C2: data.categoryTwoName,
      C3: data.categoryThreeName,
    };

    this.getCategoryInit('C2', data.categoryOneId);
    this.getCategoryInit('C3', data.categoryTwoId);
    const queryParams = {
      categoryid: (data.categoryThreeId === 0) ? data.categoryTwoId : data.categoryThreeId
    };
    this.categoryService.getListCategoryAttribute(queryParams).subscribe(response => {
      this.categoryAttributes = response;
      console.log(data.specification)
      this.fillFormSpecification(data.specification);
    });
  }


  open(content, e, bId, BN, MsId) {
    this.brandName = BN;
    this.txtSearch = BN;
    this.prodService.getDetailById(e).subscribe(response => {
      const data = response.data;
      this.version = data.version;
      console.log('data', data.version);
      this.fillFormPatchValue(data);
    });

    this.brandInit();
    let options: NgbModalOptions = {
      backdrop: false,
      size: 'lg'
    }
    this.modalRef = this.modalService.open(content, { size: 'lg' });
    this.prodId = e;
    this.prodService.getDetailProduct(e).subscribe(detail => {
      this.listDetailProd = detail.data;
      console.log('detail', this.listDetailProd);
    })
    this.brandId = bId;


  }

  brandInit() {
    const a = {
      page: this.current = 1,
      itemperpage: this.limit,
      name: this.querySearch === undefined ? '' : this.querySearch,
      isactive:true

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
        name: this.querySearch === undefined ? '' : this.querySearch,
        isactive: true,
      };
      this.brandService.getList(queryParams).subscribe(response => {
        this.brandList.data = this.brandList.data.concat(response.data);
      });
    }
  }






  Selected(value: any, ver: any) {
    this.select = value;
    this.version = ver;
    console.log('txt searchmaster',this.masterId)

    const a = {
      brandId : this.brandId,
      categoryThreeId : this.addProductForm.get('categoryThreeId').value,
      productId : this.prodId,
      statusCode: this.select,
      version: this.version,
      masterId: this.masterId,
    };
    if ( this.txtSearchMaster === undefined || this.txtSearchMaster === '') {
     swal (
       'Silahkan Pilih Master Product Kamu',
     )
     window.scrollTo(0, 0);
    } else {
      if (value === 'AP') {
        {
          swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this!',
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

                swal(
                  postDa.message
                )
          this.txtSearchMaster = '';
          this.masterId = '';
          this.modalRef.close();



              });
            } else if (
              // Read more about handling dismissals
              result.dismiss === swal.DismissReason.cancel
            ) {
            }
          });


        }
    }
    }
    if (value === 'RJ') {
      {
        swal({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
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
              swal(
                postDa.message
              )
              this.modalRef.close();
            });
          } else if (
            // Read more about handling dismissals
            result.dismiss === swal.DismissReason.cancel
          ) {
          }
        });


      }
  }
  this.brandList;

  }


  oke(verc, besc) {
     const p =  {
      approvalProductIssue: this.myForm.value.useremail,
      masterId:this.masterId,
      version: verc,
      brandId : this.brandId,
      categoryThreeId : this.addProductForm.get('categoryThreeId').value,
      productId : this.prodId,
      statusCode: this.select,
      note: this.myForm.value.tulisan
     }
     {
      swal({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
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
            this.check = false;
            swal(
              postDa.message
            )
            this.modalRef.close();
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
     this.check = true;
     this.txtSearch = '';

  }
  private newMethod() {
    // this.listService.getList().subscribe(res=>this.list=res);
    this.manage.getList().subscribe(x => {
      this.list = x;
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

  ngOnDestroy() {
    this.brandInit();
    this.loadData();
    this.newMethod()
    this.form_All();
  }

}
