import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../@core/services/authentication/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ForgotPassword } from './../../../@core/models/authentication/authentication.model';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageEnum } from './../../../@core/enum/local-storage.enum';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  signinFormGroup: FormGroup;
  isProses: boolean;

  constructor(private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,) { }

  ngOnInit() {
    this.isProses=false;
    this.createFormControl();
  }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.signinFormGroup = this.fb.group({
      type: ['reset', [
        Validators.required]],
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]]
    });
  }

  onSubmit() {
    const forgotPassword: ForgotPassword = this.signinFormGroup.value;
    this.authenticationService.doForgotPassword(forgotPassword).subscribe(
    result => {     
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

}
