import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareMessageService } from './../../../@core/services/share-message/share-message.service';
import { BrandService } from './../../../@core/services/brand/brand.service';

@Component({
  selector: 'brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss']
})
export class BrandAddComponent implements OnInit {

  updateImg: Boolean = false;
  base64Img: string;
  imageUrl: string;

  name: string;
  constructor(
    public shareMessageService: ShareMessageService,
    public brandService: BrandService
  ) { }

  ngOnInit() {
    this.imageUrl = "assets/images/empty.png";
  }

  save(){
    if(this.base64Img=='' || this.base64Img==undefined)
    {
      swal(
            'Alert',
            'Image tidak boleh kosong',
            'error',
          );
    }else if(this.name=='' || this.name==undefined){
      swal(
        'Alert',
        'Nama tidak boleh kosong',
        'error',
      );
    }else{

      const data = {
        "name": this.name,
        "isActive": "false",
        "imageUrl": this.base64Img,
      }

      this.brandService.add(data).subscribe(response => {
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

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;
    // this.onViewDesc = false;
    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      that.base64Img = fr.result;
      img.src = fr.result;
    };
    fr.readAsDataURL(f);
  }

}
