import swal from 'sweetalert2';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Content, Transaction, GetDataTranscationList } from './../../../@core/models/customer-service-m/customer-model';
import { Component, OnInit, Input } from '@angular/core';
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

  pagesOnBB: any = [];
  currentPageOnBB: number;
  lastPageOnBB: number;

  pagesOnHB: number;
  currentPageHB: number;
  lastPageOnHB: number;

  pagesOnPB: number;
  curentPageOnPB: number;
  lastPageOnPB: number;

  pagesOnNC: number;
  currentPageNC: number;
  lastPageOnNC: number;

  openDetail: boolean;
  transactionId: number;
  showDialog: boolean;
  getDataTranscation: GetDataTranscationList = new GetDataTranscationList();
  tabOrder: string;
  today: number = Date.now();
  getListing: any;
  codeNum: number;
  private _status = 'ALL';
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
    this.imagenich = 'http://image.belisada.id:8888/unsafe/100x100/center/filters:fill(fff)/';
    this.tabOrder = 'ALL';
    this.codeNum = 1211;
  }

  ngOnInit() {
    console.log('this tab orader',this.tabOrder)
    this.tab(this._status);
    this.orderSe.getStatusReasson().subscribe(ress => {
      this.getListing = ress;
      console.log(ress);
    })


  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPage) { return false; }
    // tslint:disable-next-line:max-line-length
    this.router.navigate(['/order/list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
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
        this.listOrder = respon.content;
        this.lastPage = respon.totalPages;
        console.log('this.a', this.lastPage)
        this.pages = [];
        console.log('asdasd', respon)
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
    const a = {
      paymentNumber: e,
    }
    this.orderSe.paymentSucceful(a).subscribe( bb => {
      swal(
        bb.message,
      )
    })
  }
}
