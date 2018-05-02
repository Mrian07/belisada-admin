import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../@core/services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ResetPassword } from './../../../@core/models/authentication/authentication.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageEnum } from './../../../@core/enum/local-storage.enum';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formGroup: FormGroup;
  isProses: boolean;
  data: ResetPassword = new ResetPassword

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    this.isProses=false;
    this.createFormControl();
    this.route.queryParams.subscribe( params => {
      this.data.key = params.key;
      // console.log('key:', params.key);
    });
  }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.formGroup = this.fb.group({
      token: ['reset', [
        Validators.required]],
      password: ['reset', [
        Validators.required]],
      password_repeat: ['', [
        Validators.required,
      ]]
    });
  }

  onSubmit() {

    if (this.formGroup.valid) {

      if(this.formGroup.value.password != this.formGroup.value.password_repeat){
        alert('Your password not equal.');
      }else{
        this.data.newPassword = this.formGroup.value.password;
        this.authenticationService.doResetPassword(this.data).subscribe(result => {     
            // Handle result
            if (result.status === 1) {
              this.isProses=true;
            } else{
              alert(result.message);
            }
          },
          error => {
            // swal('belisada.co.id', 'unknown error', 'error');
            }
          );
      }

      
    }


    // const forgotPassword: ForgotPassword = this.formGroup.value;
    // this.authenticationService.doForgotPassword(forgotPassword).subscribe(
    // result => {     
    //   console.log(result); 
    //   // Handle result
    //   if (result.status === 1) {
    //     this.isProses=true;
    //   } else{
    //     alert(result.message);
    //   }
    // },
    // error => {
    //   // swal('belisada.co.id', 'unknown error', 'error');
    //   }
    // );
  }



}
