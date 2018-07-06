import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableService } from '../../../@core/data/smart-table.service';
import { ManageBuyerService } from '../../../@core/services/manage-buyer/manage-buyer.service';
import { Buyer, BuyerPaging } from '../../../@core/models/manage-buyer/manage-buyer.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'buyer-list',
  templateUrl: './buyer-list.component.html',
  styleUrls: ['./buyer-list.component.scss']
})
export class BuyerListComponent implements OnInit {

  buyerPaging: BuyerPaging = new BuyerPaging();
  buyer: Buyer = new Buyer();
  currentPage: number;
  lastPage: number;
  pages: any = [];

  status: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private manageBuyerService: ManageBuyerService
  ) {
    
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10
      }
      this.manageBuyerService.getBuyerList(queryParams).subscribe(response => {
        this.buyerPaging = response;
        this.lastPage = this.buyerPaging.pageCount;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.buyerPaging.pageCount) {
            this.pages.push(r);
          }
        }
      });
    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.buyerPaging.pageCount) { return false; }
    this.router.navigate(['/buyer/list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  action(id,status){
    const data = {
      isSuspended: status,
      userId: id
    }

    this.manageBuyerService.suspendBuyer(data).subscribe(response => {
      this.ngOnInit();
    });

  }
}
