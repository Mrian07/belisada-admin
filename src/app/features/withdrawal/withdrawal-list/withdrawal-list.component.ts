import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { WithdrawalService } from '../../../@core/services/withdrawal/withdrawal.service';
import { Withdrawal, Content, Bank } from '../../../@core/models/withdrawal/withdrawal.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrls: ['./withdrawal-list.component.scss']
})
export class WithdrawalListComponent implements OnInit {

  modalRef: NgbModalRef;

  list: Content[];
  listBank: Bank[]
  pages: any = [];
  currentPage: any;
  lastPage: number;
  toBackend: any = [];
  keyName: any;
  createComForm: FormGroup;
  listItems: Withdrawal = new Withdrawal();
  onBankFocus: Boolean = false;

  listInvoice: any[];
  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private withdrawalService: WithdrawalService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loadData();
    this.loadBank();
    this.formData();
  }

  private formData() {
    this.createComForm = this.fb.group({
      bankAccountId: ['', [Validators.required]],
      accountName: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
      bankName: ['', [Validators.required]],

      transferDate: ['', [Validators.required]],
    });
  }

  loadBank(){
    this.withdrawalService.getBank().subscribe(respon => {
      this.listBank = respon;
      console.log('apa sih', respon);
    });
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
        itemperpage: 10,
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

      });

      // this.dataTes(queryParams);
    });
  }

  popCair(content,item) {
    const options: NgbModalOptions = {
      size: 'lg',
      windowClass: 'modal-xxl' 
    };

    this.modalRef = this.modalService.open(content, options);
    this.listInvoice = item.invoiceNumber;
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.listItems.totalPages) { return false; }
    this.router.navigate(['/withdrawal/list'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
    window.scrollTo(0, 0);
  }

  onBankBlur(): void {
    setTimeout(() => { this.onBankFocus = false; }, 200);
  }

  selectBank(bank) {
    this.createComForm.patchValue({
      bankAccountId: bank.bankAccountId,
      bankName: bank.name
    });
  }

  cancel(){

  }
}
