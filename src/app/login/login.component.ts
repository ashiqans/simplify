import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import 'zone.js';
// import 'zone.js/dist/long-stack-trace-zone.js';
import { AuthenticationService } from '../services/authentication.service';
import { CustomValidators } from '../services/password-validator';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
})
  
export class LoginComponent {
  loginForm!: FormGroup;
  isUserInvalid = false;
  viewPassword: boolean = false;
  showLoader: boolean = false;
  loginResMsg: string = '';
  notMatch: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      empId: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ''
    },
    // { validators: passwordMatchingValidatior }
      // [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
    this.loginForm.get('confirmPassword')?.disable();

    
  }

  onSubmit() {
    this.showLoader = true;
    let userObj = {
      EmpID: this.loginForm.get('empId')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.authService.login(userObj).subscribe((res: any) => {
      if (res?.Status == 1) {
        this.authService.isLoggedIn = true;
        this.loginForm.reset();
        this.isUserInvalid = false;
        // this.router.navigate(['user/viewuser']);
      } else if (res?.Status == 2) {
        this.loginForm.get('empId')?.disable();
        this.loginForm.get('password')?.reset();
        this.loginForm.get('confirmPassword')?.enable();
        this.loginForm.get('confirmPassword')?.setValidators(Validators.required);        
      } else {
        this.isUserInvalid = true;
        this.authService.isLoggedIn = false;
        this.loginResMsg = res?.RespMsg;
      }
      this.showLoader = false;
    });
  }

  updatePassword() {
    this.showLoader = true;
    let userObj = {
      EmpID: this.loginForm.get('empId')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.authService.login(userObj).subscribe((res: any) => {
      if (res?.Status == 1) {
        this.authService.isLoggedIn = true;
        this.loginForm.reset();
        this.isUserInvalid = false;
        this.router.navigate(['suggestion/viewSuggestion']);
      }
     })
  }

  togglePasswordVisibility() {
    this.viewPassword = !this.viewPassword;
  }

  get passwordMatchError() {
    return
    // return (this.loginForm.get('confirmPassword')?.touched && this.loginForm.get('password')?.value != this.loginForm.get('confirmPassword')?.value);
    // console.log(this.loginForm)
    // return (
    //   this.loginForm.getError('mismatch') &&
    //   this.loginForm.get('confirmPassword')?.touched
    // );
  }

  navigateToViewSuggestion() {
    this.router.navigate(['suggestion/viewSuggestion']);
  }

  // All is this method
onPasswordChange() {
  if (this.loginForm.controls['confirmPassword'].status == 'DISABLED' || this.confirmPassword.value == this.password.value) {
    this.confirmPassword.setErrors(null);
  } else {
    this.confirmPassword.setErrors({ mismatch: true });
  }
}

// getting the form control elements
get password(): AbstractControl {
  return this.loginForm.controls['password'];
}

get confirmPassword(): AbstractControl {
  return this.loginForm.controls['confirmPassword'];
}
}

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};
