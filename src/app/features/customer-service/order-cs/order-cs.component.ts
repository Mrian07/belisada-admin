import { Params, ActivatedRoute, Router } from '@angular/router';
import { Content, Transaction } from './../../../@core/models/customer-service-m/customer-model';
import { Component, OnInit } from '@angular/core';
import { OrderSeService } from '../../../@core/services/order-service/order-se.service';

@Component({
  selector: 'order-cs',
  templateUrl: './order-cs.component.html',
  styleUrls: ['./order-cs.component.scss']
})
export class OrderCsComponent implements OnInit {
  listOrder: Content[];
  imagenich;
  pages: any = [];
  currentPage: any;
  lastPage: number;

  constructor(
    private orderSe: OrderSeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.imagenich = 'http://image.belisada.id:8888/unsafe/100x100/center/filters:fill(fff)/'
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10
      }
      this.getData(queryParams);
    });


  }


  private getData(queryParams: { page: any; itemperpage: number; }) {
    this.orderSe.getList(queryParams).subscribe(respon => {
      this.listOrder = respon.content;
      this.lastPage = respon.totalPages;
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.lastPage) {
          this.pages.push(r);
        }
      }
      console.log('queryParams', queryParams);
      console.log('asdasdasd', respon);
    });

  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPage) { return false; }
    this.router.navigate(['/order/list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }
}
