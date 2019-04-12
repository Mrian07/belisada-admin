import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { WithdrawalService } from '../../../@core/services/withdrawal/withdrawal.service';
import { Withdrawal, Content, Bank, Transfer } from '../../../@core/models/withdrawal/withdrawal.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DateFormatEnum } from '../../../@core/enum/date-format.enum';
import {IMyDpOptions} from 'mydatepicker';
// import { BindOptions } from 'dgram';
// import { DateUtil } from '../../../@core/utils/date.util';
import swal from 'sweetalert2';

@Component({
  selector: 'withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrls: ['./withdrawal-list.component.scss']
})
export class WithdrawalListComponent implements OnInit {
  public loading = false;
  // ----- Start date picker declaration required
  now: Date = new Date();
  defaultDateFormat: DateFormatEnum = DateFormatEnum.DDMMYYYY_WITH_SLASH;

  myDatePickerOptions: IMyDpOptions = {
    // other options... https://github.com/kekeh/mydatepicker#options-attribute
    dateFormat: this.defaultDateFormat,
    todayBtnTxt: 'Today',
    editableDateField: false,
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    maxYear: this.now.getFullYear() - 12,
    minYear: this.now.getFullYear() - 90,
    disableSince: {
      year: this.now.getFullYear() - 12,
      month: this.now.getMonth() + 1,
      day: this.now.getDate()
    }
  };
  // ----- End date picker declaration required

  modalRef: NgbModalRef;

  list: Content[];
  listBank: Bank[];
  pages: any = [];
  currentPage: any;
  lastPage: number;
  toBackend: any = [];
  keyName: any;
  createComForm: FormGroup;
  listItems: Withdrawal = new Withdrawal();
  onBankFocus: Boolean = false;

  accountName: string;
  accountNumberDetail: string;
  grandTotal: number;

  isForm: boolean;
  isSuccess: boolean;
  isError: boolean;
  
  listInvoice: any[];
  
  constructor(
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private withdrawalService: WithdrawalService,
    private router: Router,
    private fb: FormBuilder,
    // private dateUtil: DateUtil
  ) { }

  ngOnInit() {
    this.flagStatus();
    this.loadData();
    this.loadBank();
    this.formData();
  }

  flagStatus(){
    this.isForm=false;
    this.isSuccess=false;
    this.isError=false;
  }

  private formData() {
    this.createComForm = this.fb.group({
      bankDetail: ['', [Validators.required]],
      invoiceNumber: ['', [Validators.required]],
      storeId: ['', [Validators.required]],

      bankAccountId: ['', [Validators.required]],
      withdrawId: ['', [Validators.required]],
      // accountNumber: ['', [Validators.required]],
      bankName: ['', [Validators.required]],

      transferDate: ['', [Validators.required]],
      nominal: ['', [Validators.required]],
      news: ['', [Validators.required]],
    });
  }

  loadBank(){
    this.withdrawalService.getBank().subscribe(respon => {
      this.listBank = respon;
    });
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
        status: 'nonhistory',
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
    });
  }

  popCair(content,item) {
    this.flagStatus();
    this.isForm=true;
    const options: NgbModalOptions = {
      size: 'lg',
      windowClass: 'modal-xxl' 
    };

    this.modalRef = this.modalService.open(content, options);
    const id =  item.withdrawId;
    const storeId =  item.storeId;

    this.withdrawalService.getDetail(id).subscribe(respon => {
      this.listInvoice = respon.data.invoiceNumber;
      const invoiceNumber =  respon.data.invoiceNumber;
      this.accountName = respon.data.accountName;
      this.accountNumberDetail = respon.data.accountNumberDetail;
      this.grandTotal = respon.data.grandTotal;

      this.createComForm.patchValue({
        bankDetail: this.accountNumberDetail,
        invoiceNumber: invoiceNumber
      });

    });

    this.createComForm.patchValue({
      withdrawId: id,
      storeId: storeId
    });
    
  }

  setPage(page: number, increment?: number) {
    if (increment) { page = +page + increment; }
    if (page < 1 || page > this.listItems.totalPages) { return false; }
    this.router.navigate(['/withdrawal'], { queryParams: {page: page}, queryParamsHandling: 'merge' });
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

  onSubmit(){
    this.modalService.dismissAll();

    swal({
      title: 'Info',
      text: 'Apakah anda ingin melakukan transfer?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Iya',
      cancelButtonText: 'Tidak',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.flagStatus();
        const data: Transfer = new Transfer();

        data.bankDetail = this.createComForm.value.bankDetail;
        data.invoiceNumber = this.createComForm.value.invoiceNumber;
        data.storeId = this.createComForm.value.storeId;


        data.bankAccountId = this.createComForm.value.bankAccountId;
        data.nominal = this.createComForm.value.nominal;
        data.transferDate = this.createComForm.value.transferDate.formatted;
        // data.transferDate = this.dateUtil.formatMyDate(this.createComForm.value.transferDate, this.defaultDateFormat);
        data.withdrawId = this.createComForm.value.withdrawId;
        data.news = this.createComForm.value.news;
        this.withdrawalService.transfer(data).subscribe(respon => {
          if(respon.status === 1){
          //  this.isSuccess = true;
          swal(
            "Withdrawal berhasil diproses.",
          )
            this.list = [];
            this.loadData();
          }else{
            swal(
              "Withdrawal gagal diproses!.",
            )
            // this.isError = true;
          }
          location.reload();
        });
      }
    });
  }

}
