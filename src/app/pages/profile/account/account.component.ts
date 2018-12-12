import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../../@core/services/profile/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile, ChangePasswordRequest } from './../../../@core/models/profile/profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'bs-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  profileFormGroup: FormGroup;
  name: string;
  email: any;
  phone: number;
  isChangePass: boolean;

  newPassword: string;
  repeatPassword: string;
  fm: any = {};
  userImgAvatar: string;
  updateImg: Boolean = false;
  imageDataUrl: any;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isChangePass = false;
    this.loadData();
    this.createFormControl();
  }

  createFormControl() {
    this.profileFormGroup = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      repeatNewPassword: ['', [Validators.required]],
    });
  }

  loadData() {
    this.profileService.getProfile().subscribe(
      result => {
        this.name = result.name;
        this.email = result.email;
        this.phone = result.phone;
        this.userImgAvatar = result.imageAvatar ? result.imageAvatar : '/assets/images/kristy.png';
      },
      error => {
        swal('belisada.co.id', 'unknown error', 'error');
        }
      );
  }

  changePassword() {
    this.isChangePass = true;
  }

  cancel() {
    this.isChangePass = false;
  }

  onSubmit() {
    if (this.profileFormGroup.value.newPassword !== this.profileFormGroup.value.repeatNewPassword) {
      swal(
        'Alert',
        'Maaf password baru tidak sama',
        'error',
      );
    } else {
      const profile: ChangePasswordRequest = this.profileFormGroup.value;
      this.profileService.changePassword(profile).subscribe(
      result => {
        if (result.status === 1) {
          swal(
            'Alert',
            result.message,
            'success',
          );
        } else {
          swal(
            'Alert',
            result.message,
            'error',
          );
        }
      },
      error => {
        swal('belisada.co.id', 'unknown error', 'error');
        }
      );
    }
  }

  setCanvas(e, imageAvatar) {
    if (!this.updateImg) { return false; }
    const cnv = document.createElement('canvas');
    const el = e.target;
    const w = el.width;
    const h = el.height;

    cnv.width = w;
    cnv.height = h;
    cnv.getContext('2d').drawImage(el, 0, 0, w, h);

    this.fm[imageAvatar] = cnv.toDataURL('image/jpeg', 0.5).slice(23).replace(' ', '+');

    const request = {
      imageAvatar: this.imageDataUrl
    };

    this.profileService.uploadAvatar(request).subscribe(data => {
      if (data.status === 1) {
        swal(
          'Success',
          'Upload Photo berhasil',
          'success'
        );
      } else {
        swal(
          'Error',
          'Upload Photo gagal',
          'error'
        );
      }
    });

  }

  setUrl(event, img) {
    const fr = new FileReader();
    const f = event.target.files[0];
    const that = this;
    console.log('image:', f);

    if (!f.type.match(/image.*/)) { return alert('Not valid image file'); }
    fr.onload = function() {
      that.updateImg = true;
      img.src = fr.result;
      that.imageDataUrl = fr.result;
      console.log('apa', fr.result);
    };
    fr.readAsDataURL(f);
  }

}
