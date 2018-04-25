import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  signinFormGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createFormControl();
  }

  /* Fungsi untuk membuat nama field pada form */
  createFormControl() {
    this.signinFormGroup = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
      ]],
      password: ['', [
        Validators.required,
      ]],
    });
  }

  onSubmit() {
    console.log('this.signinFormGroup: ', this.signinFormGroup);
    // const signinRequest: SigninRequest = this.signinFormGroup.value;
    // this.userService.signin(signinRequest).subscribe(
    // result => {
    //   // Handle result
    //   if (result.status === 0) {
    //     this.alert = true;
    //     this.msg = result.message;
    //   } else {
    //     const token: string = result.token;
    //     this.userService.setUserToLocalStorage(token);
    //     this.router.navigate(['/']);
    //   }
    // },
    // error => {
    //   swal('belisada.co.id', 'unknown error', 'error');
    //   }
    // );
  }

}
