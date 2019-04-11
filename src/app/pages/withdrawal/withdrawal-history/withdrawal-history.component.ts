import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Withdrawal, Content, Bank, Transfer } from '../../../@core/models/withdrawal/withdrawal.model';
import { WithdrawalService } from '../../../@core/services/withdrawal/withdrawal.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'withdrawal-history',
  templateUrl: './withdrawal-history.component.html',
  styleUrls: ['./withdrawal-history.component.scss']
})
export class WithdrawalHistoryComponent implements OnInit {
  public loading = false;
  list: Content[];

  pages: any = [];
  currentPage: any;
  lastPage: number;
  keyName: any;
  listItems: Withdrawal = new Withdrawal();
  transfer: Transfer = new Transfer();
  modalRef: NgbModalRef;
  listInvoice: any[];
  accountName: string;
  accountNumberDetail: string;
  grandTotal: number;
  news: string;
  nominal: number;
  transferDate: string;

  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private withdrawalService: WithdrawalService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.loading = true;
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.pages = [];
      if (this.keyName === undefined ){
        this.keyName = '';
      }
      this.currentPage = (params['page'] === undefined) ? 1 : +params['page'];
      const queryParams = {
        page: this.currentPage,
        itemperpage: 10,
        status: 'history',
      }

      this.withdrawalService.getWithdrawal(queryParams).subscribe(respon => {
        this.list = respon.content;
        console.log('apa', respon.content);
        this.listItems = respon;
        this.pages = [];
        this.lastPage = this.listItems.totalPages;
        for (let r = (this.currentPage - 3); r < (this.currentPage - (-4)); r++) {
          if (r > 0 && r <= this.listItems.totalPages) {
            this.pages.push(r);
          }
        }
        this.loading = false;
      });

      // this.dataTes(queryParams);
    });
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.listItems.totalPages) { return false; }
    this.router.navigate(['/withdrawal/history'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  popDetail(content,item) {
    const options: NgbModalOptions = {
      size: 'lg',
      windowClass: 'modal-xxl' 
    };

    this.modalRef = this.modalService.open(content, options);
    const id =  item.withdrawId;

    this.withdrawalService.getDetail(id).subscribe(respon => {
      this.listInvoice = respon.data.invoiceNumber;
      this.accountName = respon.data.accountName;
      this.accountNumberDetail = respon.data.accountNumberDetail;
      this.grandTotal = respon.data.grandTotal;
      this.news = respon.data.news;
      this.nominal = respon.data.nominal;
      this.transferDate = respon.data.transferDate;
    });

    
  }

}
