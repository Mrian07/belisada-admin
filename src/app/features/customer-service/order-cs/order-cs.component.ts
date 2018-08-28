import swal from 'sweetalert2';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Content, Transaction, GetDataTranscationList } from './../../../@core/models/customer-service-m/customer-model';
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
  openDetail: boolean;
  transactionId: number;
  showDialog: boolean;
  getDataTranscation: GetDataTranscationList = new GetDataTranscationList();
  tabOrder: string;
  getListing: any;
  codeNum: number;

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
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
        status_order: 'ALL',
      }
      this.getData(queryParams);
    });
    this.orderSe.getStatusReasson().subscribe(ress => {
      this.getListing = ress;
      console.log(ress);
    })


  }



  private getData(queryParams: { page: any; itemperpage: number; }) {
    this.orderSe.getList(queryParams).subscribe(respon => {
      this.listOrder = respon.content;
      this.lastPage = respon.totalPages;
      console.log('asdasdasd', respon.content);
      for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
        if (r > 0 && r <= this.lastPage) {
          this.pages.push(r);
        }
      }
      console.log('queryParams', queryParams);

    });

  }
  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.lastPage) { return false; }
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

  tab(id) {
    this.tabOrder = id;
    if (id === '228') {
      const a = {
        page: this.currentPage,
        itemperpage: 10,
        status_order: 228,
      }
      this.orderSe.getList(a).subscribe(respon => {
        this.listOrder = respon.content;

      });
    }
    if (id === 'ALL') {
      const a = {
        page: this.currentPage,
        itemperpage: 10,
        status_order: 'ALL',
      }
      this.orderSe.getList(a).subscribe(respon => {
        this.listOrder = respon.content;
      });
    }
    if (id === '233') {
      const a = {
        page: this.currentPage,
        itemperpage: 10,
        status_order: '233',
      }
      this.orderSe.getList(a).subscribe(respon => {
        this.listOrder = respon.content;
      });
    }
    if (id === '229') {
      const a = {
        page: this.currentPage,
        itemperpage: 10,
        status_order: '229',
      }
      this.orderSe.getList(a).subscribe(respon => {
        this.listOrder = respon.content;
        this.lastPage = respon.totalPages;
      });
    }
    if (id === '230') {
      const a = {
        page: this.currentPage,
        itemperpage: 10,
        status_order: '230',
      }
      this.orderSe.getList(a).subscribe(respon => {
        this.listOrder = respon.content;
        this.lastPage = respon.totalPages;
      });
    }
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
