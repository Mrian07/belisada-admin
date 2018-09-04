import { ManageBrandList } from './../../../@core/models/brand/brand.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BrandService } from './../../../@core/services/brand/brand.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'manage-brand',
  templateUrl: './manage-brand.component.html',
  styleUrls: ['./manage-brand.component.scss']
})
export class ManageBrandComponent implements OnInit {
  list: ManageBrandList[] = [];

  currentPage: number;
  lastPage: number;
  pages: any = [];
  nameSearch: string;
  xx;
  constructor(
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
        fromsaller: true,
      }
      this.brandService.getDataManageBrand(queryParams).subscribe(response => {
        this.list = response.data;
        console.log(response.data)
        for (this.xx of this.list) {
          console.log(this.xx.brandId)
        }
        // this.lastPage = this.list.pageCount;
        // for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        //   if (r > 0 && r <= this.list.pageCount) {
        //     this.pages.push(r);
        //   }
        // }
      });
    });
  }
  rubah(e){
    const r =
    e.replace(new RegExp('/', 'g'), ' - ');
    return r;
  }
  okzApprove(e) {
    const b = {
      brandId : e,
      statusCode : 'AP',
    }
    const queryParams = {
      page: this.currentPage,
      itemperpage: 10,
      fromsaller: true,
    }
    this.brandService.getRejectOrApprove(b).subscribe(x => {
      console.log(x);
      this.brandService.getDataManageBrand(queryParams).subscribe(response => {
        this.list = response.data;
      });
    })
  }
  okzReject(e) {
    const b = {
      brandId : e,
      statusCode : 'RJ',
    }
    const queryParams = {
      page: this.currentPage,
      itemperpage: 10,
      fromsaller: true,
    }
    this.brandService.getRejectOrApprove(b).subscribe(x => {
      console.log(x);
      this.brandService.getDataManageBrand(queryParams).subscribe(response => {
        this.list = response.data;
      });
    })
  }

}
