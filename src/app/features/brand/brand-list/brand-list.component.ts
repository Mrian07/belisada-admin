import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrandService } from './../../../@core/services/brand/brand.service';
import { List } from '../../../@core/models/brand/brand.model';

@Component({
  selector: 'brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit {
  // list: Brand[];
  list: List = new List();

  currentPage: number;
  lastPage: number;
  pages: any = [];

  status: boolean;
  idEdit: any;
  name: any = {};
  isActive: any = {};

  constructor(
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idEdit= null;
    this.loadData();
  }

  loadData(){    
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10
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
    this.router.navigate(['/brand/list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  edit(item){
    this.idEdit = item.brandId;
    this.name = item.name;
    this.isActive = item.isActive;
  }

  save(id){
    console.log(this.name, this.isActive);
    this.idEdit= null;

    const data = {
      "name": this.name,
			"brandId": id,
			"isActive": this.isActive,
			"imageUrl":"",
    }

    this.brandService.edit(data).subscribe(response => {
      console.log(response);
      this.loadData();
    });

  }

  changeStatus(id,status){
    if(status==false){
      this.status = true;
    }else{
      this.status = false;
    }
    const data = { "brandId": id, "isActive":this.status }

    this.brandService.changeStatus(data).subscribe(response => {
      this.loadData();
    });
  }

  cancel(){
    this.idEdit= null;
    this.loadData();
  }
}
