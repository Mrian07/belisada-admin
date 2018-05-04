import { Component, OnInit } from '@angular/core';
import { ProfileService } from './../../../@core/services/profile/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profile, ChangePasswordRequest } from './../../../@core/models/profile/profile.model';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'account',
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

  loadData(){
    this.profileService.getProfile().subscribe(
      result => {     
        this.name = result.name;
        this.email = result.email;
        this.phone = result.phone;
      },
      error => {
        swal('belisada.co.id', 'unknown error', 'error');
        }
      );
  }

  changePassword(){
    this.isChangePass = true;
  }

  cancel(){
    this.isChangePass = false;
  }

  onSubmit(){
    if(this.profileFormGroup.value.newPassword != this.profileFormGroup.value.repeatNewPassword) {
      swal(
        'Alert',
        'Maaf password baru tidak sama',
        'error',
      );
    }else{
      const profile: ChangePasswordRequest = this.profileFormGroup.value;
      this.profileService.changePassword(profile).subscribe(
      result => {     
        if (result.status === 1) {
          swal(
            'Alert',
            result.message,
            'success',
          );
        } else{
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

}
