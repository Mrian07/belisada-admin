import { Category } from './../../../@core/models/category/category.model';
import { Component, OnInit } from '@angular/core';
import { ShareMessageService } from './../../../@core/services/share-message/share-message.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from './../../../@core/services/category/category.service';
import { ListCategory } from '../../../@core/models/category/category.model';
import swal from 'sweetalert2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {  
  listCat1: ListCategory = new ListCategory();
  listCat2: ListCategory = new ListCategory();
  listCat3: ListCategory = new ListCategory();

  currentPage: number;
  lastPage: number;
  pages: any = [];

  status: boolean;
  idEdit: any;
  name: any = {};
  nameEn: any = {};
  isActive: any = {};

  sortUrut: string;
  sortName: string;

  isAdd: boolean;
  flag: string;

  isC2: boolean;
  isC3: boolean;
  popAdd: boolean;

  typeCat: string;
  typeCat2: string;
  typeCat3: string;
  titlePopUp: string;
  
  parentC1: number;
  parentC2: number;

  idAdd: number;
  nameAdd: string;
  nameEnAdd: string;
  typeAdd: string;
  actionCat: string;

  modalRef: NgbModalRef;

  isDataC1: boolean;
  isDataC2: boolean;

  constructor(
    public shareMessageService: ShareMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.idEdit= null;
    this.isStatus();
    this.loadData();
    this.flagAddShipping();
  }

  isStatus(){
    this.isAdd = false;
    this.isC2 = false;
    this.isC3=false;
  }

  flagAddShipping() {
    this.shareMessageService.currentMessage.subscribe(respon => {
      this.flag = respon;
      if (this.flag === 'add-category') {
        this.isAdd = false;
        this.loadData();
      }
    });
  }

  loadData(){    
    const queryParams = {
      type: 'C1'
    }
    this.categoryService.getCategory(queryParams).subscribe(response => {
      this.typeCat = "c1";
      this.listCat1 = response;
    });
  }

  srcCat2(id){
    const queryParams = {
      parentid: id
    }
    this.categoryService.getCategory(queryParams).subscribe(response => {
      console.log('hasil c2:', response.dataCount);   
      this.isStatus();  
      this.isC2=true;
      this.typeCat2 = "c2";
      this.parentC1 = id;
      if(response.dataCount){
        this.listCat2 = response;
        // this.isC2=true;
        this.isDataC1=true;
      }else{
        this.isDataC1=false;
      }
      
    });
  }

  srcCat3(id){
    
    const queryParams = {
      parentid: id
    }
    this.categoryService.getCategory(queryParams).subscribe(response => {
      console.log('hasil c3:', response);   
      this.isStatus();  
      this.isC2=true;
      this.isC3=true;
      this.typeCat3 = "c3";
      this.parentC2 = id;
      if(response.dataCount){
        this.listCat3 = response;
        // this.isC2=true;
        this.isDataC2=true;
      }else{
        this.isDataC2=false;
      }
      
    });
  }

  addCategory(content){
    this.titlePopUp = "Category C1";
    this.parentC1 = null;
    this.parentC2 = null;
    this.nameAdd = null;
    this.nameEnAdd = null;
    this.idAdd = null;
    this.typeAdd = 'c1';
    this.actionCat = "add";
    this.modalRef = this.modalService.open(content);
  }

  addCategory2(content,parentC1){
    this.titlePopUp = "Category C2";
    this.parentC1 = parentC1;
    this.nameAdd = null;
    this.nameEnAdd = null;
    this.idAdd = null;
    this.typeAdd = 'c2';
    this.actionCat = "add";
    this.modalRef = this.modalService.open(content);
  }

  addCategory3(content,parentC2){
    this.titlePopUp = "Category C3";
    this.parentC2 = parentC2;
    this.nameAdd = null;
    this.nameEnAdd = null;
    this.idAdd = null;
    this.typeAdd = 'c3';
    this.actionCat = "add";
    this.modalRef = this.modalService.open(content);
  }

  save(){
    
    if(this.nameAdd=='' || this.nameAdd==undefined || this.nameEnAdd=='' || this.nameEnAdd==undefined)
    {
      swal(
            'Alert',
            'Penyimpanan gagal silakan isi semua kolom',
            'error',
          );
    }else{

      if(this.typeAdd=='c1'){

        const data = {
          "name": this.nameAdd,
          "nameEn": this.nameEnAdd,
          "type": this.typeAdd,
        }

        this.categoryService.addCategory(data).subscribe(response => {

          swal(
            'Alert',
            response.message,
            'success',
          );
          this.modalRef.close();
          this.loadData();
        });

      }else if(this.typeAdd=='c2'){

        const data = {
          "parentId": this.parentC1,
          "name": this.nameAdd,
          "nameEn": this.nameEnAdd,
          "type": this.typeAdd,
        }

        this.categoryService.addCategory(data).subscribe(response => {

          swal(
            'Alert',
            response.message,
            'success',
          );
          this.modalRef.close();
          this.srcCat2(this.parentC2);
        });

      }else if(this.typeAdd=='c3'){

        const data = {
          "parentId": this.parentC2,
          "name": this.nameAdd,
          "nameEn": this.nameEnAdd,
          "type": this.typeAdd,
        }

        this.categoryService.addCategory(data).subscribe(response => {

          swal(
            'Alert',
            response.message,
            'success',
          );
          this.modalRef.close();
          this.srcCat3(this.parentC2);
        });

      }
    }

  }

  editCategory(content,type,id,name,nameEn,isActive){
    if(type=='c1'){
      this.titlePopUp = "Category C1";
    }else if(type=='c2'){
      this.titlePopUp = "Category C2";
    }else if(type=='c3'){
      this.titlePopUp = "Category C3";
    }
    this.isActive = isActive;
    this.typeAdd = type;
    this.idAdd = id;
    this.nameAdd = name;
    this.nameEnAdd = nameEn;
    this.modalRef = this.modalService.open(content);
    this.actionCat = "edit";
  }

  update(){
    if(this.nameAdd=='' || this.nameAdd==undefined || this.nameEnAdd=='' || this.nameEnAdd==undefined)
    {
      swal(
            'Alert',
            'Penyimpanan gagal silakan isi semua kolom',
            'error',
          );
    }else{
      const data = {
        "categoryId": this.idAdd,
        "name": this.nameAdd,
        "nameEn": this.nameEnAdd,
        "type": this.typeAdd,
        "isActive": this.isActive,
      }

      const data2 = {
        "categoryId": this.idAdd,
        "isActive": this.isActive,
      }

      this.categoryService.updateCategory(data).subscribe(response => {

        this.categoryService.activeCategory(data2).subscribe(response => {
        
          swal(
            'Alert',
            response.message,
            'success',
          );

          this.modalRef.close();
          if(this.typeAdd=='c1'){
            this.loadData();
          }else if(this.typeAdd=='c2'){
            this.srcCat2(this.parentC1);
          }else if(this.typeAdd=='c3'){
            this.srcCat3(this.parentC2);
          }
          

        });
      });
    
    }
  }
}
