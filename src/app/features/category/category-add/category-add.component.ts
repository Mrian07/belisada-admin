import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareMessageService } from './../../../@core/services/share-message/share-message.service';
import { CategoryService } from './../../../@core/services/category/category.service';

@Component({
  selector: 'category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.scss']
})
export class CategoryAddComponent implements OnInit {
  name: string;
  nameEn: string;
  constructor(
    public shareMessageService: ShareMessageService,
    public categoryService: CategoryService
  ) { }

  ngOnInit() {
  }

  save(){
  }

  // save(){
  //   if(this.name=='' || this.name==undefined){
  //     swal(
  //       'Alert',
  //       'Nama tidak boleh kosong',
  //       'error',
  //     );
  //   }else if(this.nameEn=='' || this.nameEn==undefined){
  //     swal(
  //       'Alert',
  //       'Nama tidak boleh kosong',
  //       'error',
  //     );
  //   }else{

  //     const data = {
  //       "name": this.name,
  //       "nameEn": this.nameEn,
  //       "isActive": "false",
  //     }

  //     this.categoryService.add(data).subscribe(response => {
  //       if(response.status == 1) {
  //         swal(
  //           'Alert',
  //           response.message,
  //           'success',
  //         );
  //         this.shareMessageService.changeMessage('add-category');
  //       }else{
  //         swal(
  //           'Alert',
  //           response.message,
  //           'error',
  //         );
  //       }
        
  //     });
  //   }
  // }

}
