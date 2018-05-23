import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ShareMessageService } from './../../../@core/services/share-message/share-message.service';
import { SpecService } from './../../../@core/services/spec/spec.service';

@Component({
  selector: 'spec-add',
  templateUrl: './spec-add.component.html',
  styleUrls: ['./spec-add.component.scss']
})
export class SpecAddComponent implements OnInit {

  constructor(
    public shareMessageService: ShareMessageService,
    public specService: SpecService
  ) { }

  ngOnInit() {
  }

  name: string;

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
