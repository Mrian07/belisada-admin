import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SpecService } from '../../../@core/services/spec/spec.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
  selector: 'spec-value',
  templateUrl: './spec-value.component.html',
  styleUrls: ['./spec-value.component.scss']
})
export class SpecValueComponent implements OnInit {

  @ViewChild('va') valueElement: ElementRef;

  searchFormGroup: FormGroup;
  addAttributeFormGroup: FormGroup;
  addAttributeValueFormGroup: FormGroup;

  specList: any[];
  pageCount: number;
  currentPage = 1;

  selectedAttributeId: number;

  attributeValueList: any[] = [];

  isSpecSelected: Boolean = false;
  isAddAttrValue: Boolean = false;
  isLoading: Boolean = false;
  isAddAttrValueFocus: Boolean = false;

  modalRef: NgbModalRef;

  constructor(
    private specService: SpecService,
    private elementRef: ElementRef,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) { }

  // convenience getter for easy access to form fields
  get fAddAttribute() { return this.addAttributeFormGroup.controls; }
  get fAddAttributeValue() { return this.addAttributeValueFormGroup.controls; }

  ngOnInit() {
    this.createFormGroup();
    this.getAttributes((data) => {
      this.specList = data;
    });
    this.onSearch();
  }

  createFormGroup() {
    this.searchFormGroup = this.fb.group({
      search: ['']
    });

    this.addAttributeFormGroup = this.fb.group({
      name: ['', [Validators.required]],
      isInstanceAttribute: [false],
      isMandatory: [false],
    });

    this.addAttributeValueFormGroup = this.fb.group({
      attributeId: ['', [Validators.required]],
      value: ['', [Validators.required]]
    });
  }

  getAttributes(cb, page?, q?) {
    const queryParams = {
      page: page ? page : 1,
      itemperpage: 20,
      name: q ? q : '',
    }
    this.specService.getList(queryParams).subscribe((res) => {
      const { data, dataCount, pageCount } = res;
      this.pageCount = pageCount;
      cb(data, dataCount, pageCount);
    });
  }

  getAttributeValues(cb, attributeid, q?) {
    const queryParams = {
      all: true,
      name: q ? q : '',
      attributeid: attributeid,
    }
    this.specService.getAttributeValue(queryParams).subscribe((res) => {
      const { data, dataCount, pageCount } = res;
      cb(data, dataCount, pageCount);
    });
  }

  onSearch() {
    this.searchFormGroup.controls['search'].valueChanges.subscribe(q => {
      this.getAttributes((data) => {
        this.specList = data;
      }, this.currentPage = 1, q);
    });
  }

  onSpecListScrollDown() {
    const scr = this.elementRef.nativeElement.querySelector('#spec-list-container');
    if (((scr.scrollHeight - scr.clientHeight) === scr.scrollTop) && this.currentPage !== this.pageCount) {
      this.getAttributes((data) => {
        this.specList = this.specList.concat(data);
      }, this.currentPage += 1);
    }
  }

  onSpecClicked(attributeid) {
    this.isSpecSelected = true;
    this.isAddAttrValue = false;
    this.isAddAttrValueFocus = false;
    this.selectedAttributeId = attributeid;
    this.addAttributeValueFormGroup.reset();
    this.specList.map(i => i.active = false);
    this.specList.find(s => s.attributeId === attributeid).active = true;
    this.getAttributeValues((data) => {
      this.attributeValueList = data;
    }, attributeid);
  }

  addAttributeSubmit() {
    if (this.addAttributeFormGroup.invalid) return;

    this.specService.add(this.addAttributeFormGroup.value).subscribe(result => {
      swal(
        (result.status === 1) ? 'success' : 'error',
        result.message,
        (result.status === 1) ? 'success' : 'error'
      )
      this.getAttributes((data) => {
        this.addAttributeFormGroup.reset();
        this.specList = data;
        this.modalRef.close();
      });
    });
  }

  openAddAttributeValue() {
    this.isAddAttrValue = true;
    this.isAddAttrValueFocus = true;
  }

  addAttributeValueSubmit() {
    // this.isAddAttrValue = false;
    this.addAttributeValueFormGroup.patchValue({
      attributeId: this.selectedAttributeId
    });
    if (this.addAttributeValueFormGroup.invalid) return;
    this.isLoading = true;
    this.specService.addAttributeValue(this.addAttributeValueFormGroup.value).subscribe(result => {
      this.addAttributeValueFormGroup.reset();
      this.isAddAttrValue = false;
      this.isLoading = false;

      this.getAttributeValues((data) => {
        this.attributeValueList = data;
      }, this.selectedAttributeId);
    })
  }

  cancelAddAttributeValue(e) {
    e.stopPropagation();
    this.addAttributeValueFormGroup.reset();
    this.isAddAttrValue = false;
  }

  openModal(modal) {
    this.modalRef = this.modalService.open(modal);
  }

}
