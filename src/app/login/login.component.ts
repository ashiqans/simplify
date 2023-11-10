import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'zone.js';
// import 'zone.js/dist/long-stack-trace-zone.js';
import { AuthenticationService } from '../services/authentication.service';

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
    });
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
      } else if (res?.Status == 0) {
        this.loginForm.get('empId')?.disable();
        // this.loginForm.markAsUntouched();
        // this.loginForm.get('password')?.patchValue('');
        this.loginForm.get('password')?.reset();
        // this.loginForm.get('password')?.updateValueAndValidity();
        // this.loginForm.get('password')?.markAsUntouched();
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

  togglePasswordVisibility() {
    this.viewPassword = !this.viewPassword;
  }

  comparePassword() {
    if (this.loginForm.get('password')?.value != this.loginForm.get('confirmPassword')?.value) {
      this.notMatch = true;
      console.log(this.notMatch)
    } else {
      this.notMatch = false;
      console.log(this.notMatch)
    }
  }

  navigateToViewSuggestion() {
    this.router.navigate(['suggestion/viewSuggestion']);
  }
}
