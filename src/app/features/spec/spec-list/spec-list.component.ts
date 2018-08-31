import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SpecService } from './../../../@core/services/spec/spec.service';
import { List } from '../../../@core/models/brand/brand.model';
import { ShareMessageService } from './../../../@core/services/share-message/share-message.service';

@Component({
  selector: 'spec-list',
  templateUrl: './spec-list.component.html',
  styleUrls: ['./spec-list.component.scss']
})
export class SpecListComponent implements OnInit {
  list: List = new List();

  currentPage: number;
  lastPage: number;
  pages: any = [];

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

  search: string;

  constructor(
    public shareMessageService: ShareMessageService,
    private specService: SpecService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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

  addList(){
    this.isAdd = true;
  }

  addListCancel(){
    this.isAdd = false;
  }

  loadData(){
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
        // ob: this.sortName,
        // ot: this.sortUrut
      }
      this.specService.getList(queryParams).subscribe(response => {
        console.log(response);
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
    this.router.navigate(['/spec/list'], { queryParams: {page: page, ob: this.sortName, ot: this.sortUrut}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  edit(item){
    this.idEdit = item.attributeId;
    this.name = item.name;
    this.isActive = item.isActive;
  }

  cancel(){
    this.idEdit= null;
    this.loadData();
  }

  save(id){

    if(this.name=='' || this.name==undefined)
    {
      console.log('asdasd')
      swal(
            'Alert',
            'Nama tidak boleh kosong',
            'error',
          );
    }else{
      this.idEdit= null;
      const data = {
        "name": this.name,
        "attributeId": id,
        "isMandatory":false,
        "isInstanceAttribute":false
      }
      this.specService.edit(data).subscribe(response => {
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
        const data = {
          "attributeId": id,
          "isActive":this.status
        }
        this.specService.changeStatus(data).subscribe(response => {
          this.loadData();
        });
      }
    });
  }

  sortStatus() {}
}
