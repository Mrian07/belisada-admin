import swal from 'sweetalert2';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Content, GetDataTranscationList } from './../../../@core/models/customer-service-m/customer-model';
import { Component, OnInit, Input } from '@angular/core';
import { OrderSeService } from '../../../@core/services/order-service/order-se.service';
import { countdown } from 'madrick-countdown-timer';
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
  bLength: any;

countdown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,

    status: 0,
    message: ''
};


  openDetail: boolean;
  transactionId: number;
  showDialog: boolean;
  getDataTranscation: GetDataTranscationList = new GetDataTranscationList();
  tabOrder: string;
  today: number = Date.now();
  getListing: any;
  codeNum: number;
  private _status = 'ALL';
  date = '09/22/2018 16:29:39';
  @Input()
  set status(status: string) {
    this._status = (status && status.trim()) || '<no status set>';
  }

  get status(): string { return this._status; }
  constructor(
    private orderSe: OrderSeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.imagenich = 'https://image.belisada.id/unsafe/100x100/center/filters:fill(fff)/';
    this.tabOrder = 'ALL';
    this.codeNum = 1211;
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((queryParam) => {
      this.currentPage = (queryParam.page) ? queryParam.page : 1;
    });
    console.log('this tab orader',this.tabOrder)
    this.tab(this._status);
    this.orderSe.getStatusReasson().subscribe(ress => {
      this.getListing = ress;
      console.log('datanya:', ress);
    })


  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPage) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/order'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }
  openOS(status, transactionId) {
    if (status === true) {
      this.transactionId = transactionId;
      this.openDetail = false;
    } else {
      this.transactionId = transactionId;
      this.openDetail = true;
    }
  }

  tab(statusOrder?: string) {
    this.tabOrder = statusOrder;
    console.log('asdasdasd', statusOrder)
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        itemperpage: 10,
        page: this.currentPage,
        status_order:  this.tabOrder,
      };
      this.orderSe.getList(queryParams).subscribe(respon => {
        const b =  respon.content.filter(x => x.expiredConfirmationPaymentAdminDate !== '');

        this.bLength = b.length;
        this.listOrder = respon.content;
          b.forEach((x) => {
            console.log('x: ', x);
            countdown(x.expiredConfirmationPaymentAdminDate, (countdown) => {
            // this.listOrder.find(i => i.paymentNumber === x.paymentNumber).countdown = countdown;
              this.countdown = countdown;
            });
          });
        console.log('asdasd', this.listOrder)
        this.lastPage = respon.totalPages;

        this.pages = [];
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.lastPage) {
            this.pages.push(r);
          }
        }
      });
      });
  }
  ok(e) {
    const queryParams = {
      payment_number: e,
    }
    this.orderSe.getTransaction(queryParams).subscribe( aa => {
      this.getDataTranscation = aa.data;
      console.log( this.getDataTranscation);
    })
    // const data = this.listOrder.find(x => x.paymentNumber === e);
    // this.aaaaaaaaa = data;
    // console.log(this.aaaaaaaaa);
  }
  gakmasu(e) {
    this.showDialog = false;
    const iniKirim = {
      paymentNumber: e,
      reasonType: this.codeNum,
    }
    this.orderSe.paymentFailed(iniKirim).subscribe( bb => {
      console.log(bb.message);
      swal(
        bb.message,
      )
    })

    console.log(iniKirim);
  }
  confrimButton(e) {
    this.showDialog = false;
    const a = {
      paymentNumber: e,
    }
    this.orderSe.paymentSucceful(a).subscribe( bb => {
      swal(
        bb.message,
      )
      this.tab(this._status);
    })
  }
}
