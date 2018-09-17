import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrandService } from './../../../@core/services/brand/brand.service';
import { List } from '../../../@core/models/brand/brand.model';
import { ShareMessageService } from './../../../@core/services/share-message/share-message.service';

@Component({
  selector: 'brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  list: List = new List();

  currentPage: number;
  lastPage: number;
  pages: any = [];
  nameSearch: string;

  status: boolean;
  idEdit: any;
  name: any = {};
  isActive: any = {};

  updateImg: Boolean = false;
  base64Img: string;

  imageUrl: string;
  message: string;
  sortUrut: string;
  sortName: string;

  isAdd: boolean;
  flag: string;

  constructor(
    public shareMessageService: ShareMessageService,
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.idEdit= null;
    this.loadData();
    this.isAdd = false;
    this.flagAddShipping();
  }

  flagAddShipping() {
    this.shareMessageService.currentMessage.subscribe(respon => {
      this.flag = respon;
      if (this.flag === 'add-brand') {
        this.isAdd = false;
        this.loadData();
      }
    });
  }

  addBrand(){
    this.isAdd = true;
  }

  addBrandCancel(){
    this.isAdd = false;
  }

  sortBrand(){
    if(this.sortUrut=='DESC'){
      this.sortUrut='ASC';
    }else{
      this.sortUrut='DESC';
    }
    this.sortName='name';
    this.router.navigate(['/brand/list'], { queryParams: {page: this.currentPage, ob: this.sortName, ot: this.sortUrut}, queryParamsHandling: 'merge' });
  }

  sortStatus(){
    if(this.sortUrut=='DESC'){
      this.sortUrut='ASC';
    }else{
      this.sortUrut='DESC';
    }
    this.sortName='isActive';
    this.router.navigate(['/brand/list'], { queryParams: {page: this.currentPage, ob: this.sortName, ot: this.sortUrut}, queryParamsHandling: 'merge' });
  }


  loadData(){
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
        ob: this.sortName,
        ot: this.sortUrut,
        all: true,
      }
      this.brandService.getList(queryParams).subscribe(response => {
        this.list = response;
        this.lastPage = this.list.pageCount;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.list.pageCount) {
            this.pages.push(r);
          }
        }
      });
    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.list.pageCount) { return false; }
    this.router.navigate(['/brand/list'], { queryParams: {page: page, ob: this.sortName, ot: this.sortUrut}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  edit(item){
    this.idEdit = item.brandId;
    this.name = item.name;
    this.isActive = item.isActive;
  }

  save(id){

    if(this.name=='' || this.name==undefined)
    {
      swal(
            'Alert',
            'Nama tidak boleh kosong',
            'error',
          );
    }else{
      this.idEdit= null;
      const data = {
        "name": this.name,
        "brandId": id,
        "isActive": this.isActive,
        "imageUrl": this.base64Img,
      }
      this.brandService.edit(data).subscribe(response => {
        if(response.status==1){
          swal(
            'Alert',
            response.message,
            'success',
          );
        }else{
          swal(
            'Alert',
            response.message,
            'error',
          );
        }
        this.loadData();
      });
    }

  }

  changeStatus(id,status){

    if(status==false){
      this.status = true;
      this.message = "Apakah anda yakin? Karena semua produk dengan brand ini akan ditampilkan."
    }else{
      this.status = false;
      this.message = "Apakah anda yakin? Karena semua produk dengan brand ini akan disembunyikan."
    }

    swal({
      title: 'Alert',
      type: 'warning',
      text: this.message,
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        const data = { "brandId": id, "isActive":this.status }
        this.brandService.changeStatus(data).subscribe(response => {
          this.loadData();
        });
      }
    });
  }

  cancel(){
    this.idEdit= null;
    this.loadData();
  }

  searchK(event) {
    const key = event.target.value;
    const queryParams = {
      page: this.currentPage,
      itemperpage: 10,
      ob: this.sortName,
      ot: this.sortUrut,
      name: key,
      all: true,
    }
    console.log(event);
    if (key === '' || event.key === 'Enter') {
      this.brandService.getList(queryParams).subscribe(response => {
        this.list = response;
      });
    } else {
      this.brandService.getList(queryParams).subscribe(data => {
        this.list = data;
      });
    }
  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;
    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      that.base64Img = fr.result;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

}
