import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'withdrawal-list',
  templateUrl: './withdrawal-list.component.html',
  styleUrls: ['./withdrawal-list.component.scss']
})
export class WithdrawalListComponent implements OnInit {

  modalRef: NgbModalRef;

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
  }

  popCair(content) {
    const options: NgbModalOptions = {
      size: 'lg',
      windowClass: 'modal-xxl' 
    };
    this.modalRef = this.modalService.open(content, options);
  }

}
