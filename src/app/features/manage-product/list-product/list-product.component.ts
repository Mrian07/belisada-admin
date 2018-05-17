import { Component, OnInit,ViewChild, Injectable, ElementRef, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ManageProductService } from '../../../@core/services/manage-product/manage-product.service';
import { ManageProduct, aksjdaklsjdkasjd, revise } from '../../../@core/models/manage-product/manage-product';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Observable} from 'rxjs';

import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, filter, merge} from 'rxjs/operators';
import { NgbModalBackdrop } from '@ng-bootstrap/ng-bootstrap/modal/modal-backdrop';
import { ManageStoreService } from '../../../@core/services/manage-store/manage-store.service';
import { ListingItem } from '../../../@core/models/manage-store/manage-store.model';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import swal from 'sweetalert2';
import { ModalComponent } from '../../../pages/ui-features/modals/modal/modal.component';

const WIKI_URL = 'https://en.wikipedia.org/w/api.php';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});
@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return ([]);
    }

    return this.http
      .get(WIKI_URL, {
        params: PARAMS.set('search', term)
      }).pipe(
        map(response => response[1])
      );
  }
}

@Component({
selector: 'list-product',
templateUrl: './list-product.component.html',
styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  @Input() name;
  public posts: Post[];
  modalHeader: string;
  myForm: FormGroup;
  form: FormGroup;
  closeResult: string;
  data: ManageProduct[];
  model: any;
  value: boolean = false;
  selected: string;
  current: number = 1;
  brands = [];
  searching = false;
  searchFailed = false;
  // list: ListingItem = new ListingItem();
  list: ListingItem;
  txtSearch: string;
  productBrandId: number;
  isChecked: boolean;
  sel: any;
  test: boolean = true;
  isSubscribe = new FormControl(false);
  select: any;
  a: revise;
  ll: boolean;

  ss: any[];

  user = {
    skills: [
      { name: 'JS',  selected: true, id: 12 },
      { name: 'CSS',  selected: false, id: 2 },
    ]
  }


  limit: number = 3;
  querySearch: string;
  onTextFocus: Boolean = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);
  @ViewChild('instance') instance: NgbTypeahead;
  public rowSelected: number;
  constructor(private modalService: NgbModal, private prodService: ManageProductService, private _service: WikipediaService, private el: ElementRef, private manage: ManageStoreService, private fb: FormBuilder) {}
  ngOnInit() {
    this.newMethod();
    this.myForm = this.fb.group({
      useremail: this.fb.array([]),
      tulisan: new FormControl
    });
    this.prodService.getData().subscribe(response => {
      this.data = response;

    });
    this.prodService.getDataListRevie().subscribe(asd => {
      this.a = asd;
      console.log(asd);
    });
    this.isChecked = true;
  }

  get skills() {
    return this.form.get('skills');
  }

  buildSkills() {
    const arr = this.user.skills.map(skill => {
      return this.fb.control(skill.selected);
    });
    return this.fb.array(arr);
  }
  open(content, e) {
    let options: NgbModalOptions = {
      backdrop: false,
      size: 'lg'
    }
    this.modalService.open(content, options);
    console.log(e);
    this.sel = e;

  }
  openForMe(content) {
    let options: NgbModalOptions = {
      backdrop: false,
      size: 'lg'
    }
    this.modalService.open(content, options);

  }



  checkClicked(val) {
    if (val) {
      this.test = false;
    } else {
      this.test = true;
    }
    console.log(val);
  }

  search = (text$: Observable < string > ) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? [] :
        this.data.filter(v => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: {
    title: string
  }) => x.title;


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  
  

  onFocusOut() {
    setTimeout(() => {
      this.onTextFocus = false
    }, 200)
  }

  checkValue(event: any) {
    console.log(event);
  }
  Existing() {
    // this.value = true;
    this.value = !this.value;
  }
  openVerticallyCentered(content) {
    this.modalService.open(content, {
      size: 'sm'
    });
  }
  changeValue() {
    console.log(this.isSubscribe.value);
    this.isSubscribe = new FormControl(!this.isSubscribe.value);
    // console.log(this.isSubscribe);

  }
  onScrollDown () {
    const scr = this.el.nativeElement.querySelector('#drick-scroll-container');
    console.log('scr.scrollHeight: ', scr.scrollHeight);
    console.log('scr.style.height: ', scr.clientHeight);
    console.log('scr.scrollTop: ', scr.scrollTop);
    if (scr.scrollHeight - scr.clientHeight == scr.scrollTop) {
      const queryParams = {
        current: this.current += 1,
        limit: this.limit,
        q: this.querySearch === undefined ? '' : this.querySearch
      }
      this.prodService.getData1(queryParams).subscribe(response => {
        this.brands = this.brands.concat(response);
      });
    };
  }
  

  searchBrand() {
    this.querySearch = this.txtSearch;
    const queryParams = {
      current: this.current = 1,
      limit: this.limit,
      q: this.querySearch === undefined ? '' : this.querySearch
    }
    this.prodService.getData1(queryParams).subscribe(response => {
      this.brands = response;
    });
  }

  
  Selected(value: any) {
    // this.checkIfButtonWasPressed = true;
    this.select = value;
    console.log(value);

    if (value == 7) {  
       console.log('12312321')
    }



  }
  openSm(content) {
    this.modalService.open(content, {
      size: 'sm'
    });
  }

  selectBrand(brand) {
    console.log(brand.body);
    this.txtSearch = brand.body;
    this.productBrandId = brand.m_productbrand_id;
  }

  onChange(email: any, isChecked: boolean) {
    const emailFormArray = < FormArray > this.myForm.controls.useremail;

    if (isChecked) {
      emailFormArray.push(new FormControl(email));
      this.ss = email;
      //  this.ll = isChecked;
      console.log('is', isChecked)

    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == email)
      emailFormArray.removeAt(index);
      email = isChecked;
      this.ll = isChecked;
      console.log(this.ll)

    }
  }
  



  oke() {
   
    // this.ss = this.ll;
    localStorage.setItem('aaaa', JSON.stringify(this.myForm.value));
   
    // window.location.reload();s
    console.log(this.myForm.value)
     this.myForm.reset({
      "useremail": [],
     });
//      this.myForm.reset({
//       'city': 'London',
//       'structure':{
//         'Parallel': 1,
//         'Hierarchical': 1,
//         'Stable': 1,
//  }); 

    
  }
  private newMethod() {
    // this.listService.getList().subscribe(res=>this.list=res);
    this.manage.getList().subscribe(x => {
      this.list = x;
    });
  }

  closeModal() {
    // this.activeModal.close();
  }
  public openCloseRow(idReserva: number): void {

    if (this.rowSelected === -1) {
      this.rowSelected = idReserva
    } else {
      if (this.rowSelected == idReserva) {
        this.rowSelected = -1
      } else {
        this.rowSelected = idReserva
      }

    }
  }

}
export class Post {
  constructor(
    public id: number,
    public date: string,
    public subject: string,
    public numComents: number,
    public comments: string[]
  ) {}
}
export interface type {
  id: number;
  text: string;
}