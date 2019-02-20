import { Component, OnInit } from '@angular/core';
import { OrderSeService } from 'app/@core/services/order-service/order-se.service';
import { Content } from 'app/@core/models/customer-service-m/customer-model';
import { countdown } from 'madrick-countdown-timer';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  users = [
    { id: 1001, label: 'Roma', lat: 42, lng: 12 },
    { id: 1002, label: 'Copenaghen', lat: 56, lng: 14},
    { id: 1003, label: 'Gibuti', lat: 11, lng: 44}
  ];

  public listOrder: Content[];

  public thumborUrl: String;

  public currentStatus: string;

  public pages: any[] = [];
  public lastPage: number;
  public currentPage: number;

  public countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,

    status: 0,
    message: ''
  };

  constructor(
    private _orderService: OrderSeService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.thumborUrl = 'https://image.belisada.id/unsafe/100x100/center/filters:fill(fff)/';
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe((queryParam) => {
      this.currentPage = (queryParam.page) ? queryParam.page : 1;
      this.currentStatus = (queryParam.status) ? queryParam.status : 'ALL';
      this.getOrderList(this.currentPage, 10, this.currentStatus);
    });
  }

  getOrderList(page, itemperpage, status) {
    this.currentPage = page;

    const queryParams = {
      page: page,
      itemperpage: itemperpage,
      status_order: status,
    };
    this._orderService.getList(queryParams).subscribe(respon => {
      const expiredDates =  respon.content.filter(x => x.expiredConfirmationPaymentAdminDate !== '');

      this.listOrder = respon.content;
      expiredDates.forEach((x) => {
        console.log('x: ', x);
        countdown(x.expiredConfirmationPaymentAdminDate, (countdown) => {
        // this.listOrder.find(i => i.paymentNumber === x.paymentNumber).countdown = countdown;
          this.countdown = countdown;
        });
      });

      console.log('this.listOrder: ', this.listOrder);
      this.lastPage = respon.totalPages;

      this.pages = [];
      for (let r = (page - 3); r < (page - (-4)); r++) {
        if (r > 0 && r <= this.lastPage) {
          this.pages.push(r);
        }
      }
    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPage) { return false; }

    this._router.navigate(['/order'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }
}
