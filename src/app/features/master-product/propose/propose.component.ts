import { Component, OnInit } from '@angular/core';
import { ManageProductService } from './../../../@core/services/manage-product/manage-product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ListPropose } from './../../../@core/models/manage-product/manage-product';

@Component({
  selector: 'propose',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.scss']
})
export class ProposeComponent implements OnInit {

  pages: any = [];
  currentPage: any;
  lastPage: number;
  keyName: any;
  list: ListPropose[];
  constructor(
    private mageProd: ManageProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
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
        itemperpage: 20,
        ob : 'custom',
        name:  this.keyName,
      }
    
      this.mageProd.getListPropose(queryParams).subscribe(Response => {
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

}
