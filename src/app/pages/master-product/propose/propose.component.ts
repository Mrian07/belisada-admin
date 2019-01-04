import { Component, OnInit } from '@angular/core';
import { ManageProductService } from './../../../@core/services/manage-product/manage-product.service';
import { BrandService } from './../../../@core/services/brand/brand.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListPropose, SearchV2 } from './../../../@core/models/manage-product/manage-product';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { List } from './../../../@core/models/brand/brand.model';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Identifiers } from '@angular/compiler';
import swal from 'sweetalert2';

@Component({
  selector: 'propose',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.scss']
})
export class ProposeComponent implements OnInit {
  FormPropose: FormGroup;
  pages: any = [];
  currentPage: any;
  lastPage: number;
  keyName: any;
  list: ListPropose[];
  listBrand: List = new List();
  listProduct: SearchV2[];
  modalRef: NgbModalRef;

  onBrandFocus: Boolean = false;
  onProductFocus: Boolean = false;

  productName;
  brand;
  description;

  constructor(
    private mageProd: ManageProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private brandService: BrandService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadBrand();
    this.formData();
    this.loadData();
    
  }

  private formData() {
    this.FormPropose = this.fb.group({
      prodRequestId: ['', [Validators.required]],
      brandName: ['', [Validators.required]],
      brandId: ['', [Validators.required]],
      productName:  ['', [Validators.required]],
      productId:  ['', [Validators.required]],
    });
  }

  searchBrand(): void {
    this.FormPropose.patchValue({
      brandId: '',
    });
    const qsBrand = this.FormPropose.get('brandName').value;
    const queryParams = {
      name: qsBrand === undefined ? '' : qsBrand,
      isactive: true,
      all: true,
    };
    this.brandService.getList(queryParams).subscribe(response => {
      this.listBrand = response;
    });
  }

  selectBrand(brand) {
    this.FormPropose.patchValue({
      brandId: brand.brandId,
      brandName: brand.name,
      productId: null,
      productName: null,
    });

    const queryParams = {
      brandid: brand.brandId
    }

    this.mageProd.getSrcBrandV2(queryParams).subscribe(response => {
      this.listProduct = response;
    });

  }

  onBrandBlur(): void {
    setTimeout(() => { this.onBrandFocus = false; }, 200);
  }
  
  onBrandScrollDown () {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const queryParams = {
        all: true,
        isactive:  true,
      }

      this.brandService.getList(queryParams).subscribe(Response => {
        this.listBrand = Response;
        console.log('apa', Response);
      });

    });
  }

  loadBrand(){
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const queryParams = {
        isactive:  true,
      }

      this.brandService.getList(queryParams).subscribe(Response => {
        this.listBrand = Response;
      });

    });
  }



  searchProduct(): void {
    const id = this.FormPropose.get('brandId').value;
    const productName = this.FormPropose.get('productName').value;
    this.FormPropose.patchValue({
      productId: '',
    });

    const queryParams = {
      brandid: id,
      q: productName
    }

    this.mageProd.getSrcBrandV2(queryParams).subscribe(response => {
      this.listProduct = response;
      console.log('produk', this.listProduct);
    });

  }

  selectProduct(data) {
    this.FormPropose.patchValue({
      productId: data.productId,
      productName: data.name,
    });
  }

  onProductBlur(): void {
    setTimeout(() => { this.onProductFocus = false; }, 200);
  }
  
  onProductScrollDown () {

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      const queryParams = {
        all: true,
        isactive:  true,
      }

      this.brandService.getList(queryParams).subscribe(Response => {
        this.listBrand = Response;
        console.log('apa', Response);
      });

    });
  }



  loadData(){

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
    
      this.mageProd.getListPropose(queryParams).subscribe(Response => {
        console.log('list', Response);

        this.list = Response.content;
        this.pages = [];
        this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];

        this.lastPage = Response.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.lastPage) {
            this.pages.push(r);
          }
        }

      });

    });
    
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPage) { return false; }
    this.router.navigate(['/master-product/propose'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  selectReqYes(content,id) {
    this.FormPropose.patchValue({
      prodRequestId: id,
    });
    this.modalService.open(content);
  }

  selectReqNo(id){

    const data = {
      "approved": false,
      "brandId": null,
      "prodRequestId": id,
      "productId": null
    }

    swal({
      title: 'Alert',
      text: 'Apakah request produk ini akan ditolak',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.mageProd.prosesPropose(data).subscribe(Response => {
          
          if(Response.status === 1){
            this.loadData();
          }else{
            swal(
              'Alert',
              'Penolakan request produk gagal silakan dicoba kembali',
              'error',
            );
          }
        });

      }
    });
  }

  save(){
    if (this.FormPropose.valid) {

      const data = {
        "approved": true,
        "brandId": this.FormPropose.value.brandId,
        "prodRequestId": this.FormPropose.value.prodRequestId,
        "productId": this.FormPropose.value.productId
      }

      this.mageProd.prosesPropose(data).subscribe(Response => {
        console.log('hasil save', Response);
        if(Response.status === 1){
          swal(
            'Alert',
            'Request produk berhasil diproses',
            'success',
          );
          this.loadData();
        }else{
          swal(
            'Alert',
            'Request produk gagal diproses',
            'error',
          );
        }
        
      });

      
    }
  }

}
