import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ShareMessageService } from './../../../@core/services/share-message/share-message.service';
import { SpecService } from './../../../@core/services/spec/spec.service';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'spec-add',
  templateUrl: './spec-add.component.html',
  styleUrls: ['./spec-add.component.scss']
})
export class SpecAddComponent implements OnInit {

  public myForm: FormGroup;
  name: string;

  constructor(
    public shareMessageService: ShareMessageService,
    public specService: SpecService,
    public form: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  public buildForm() {
    this.myForm = this.form.group({
      name: ['', [Validators.required]]
    });
  }

  register(myForm) {
    console.log('myForm: ', myForm);
  }

  save(){
    if(this.name=='' || this.name==undefined){
      swal(
        'Alert',
        'Nama tidak boleh kosong',
        'error',
      );
    }else{

      const data = {
        "name": this.name,
        "isMandatory":true,
        "isInstanceAttribute":false
      }

      this.specService.add(data).subscribe(response => {
        if(response.status == 1) {
          swal(
            'Alert',
            response.message,
            'success',
          );
          this.shareMessageService.changeMessage('add-brand');
        }else{
          swal(
            'Alert',
            response.message,
            'error',
          );
        }
        
      });
    }
  }

}
