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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      empId: ['', Validators.required],
      password: ['', Validators.required],
    });

    let testObj = {
      "EmpID": "asd",
      "EmpName": "ghfghf",
      "Department": "hjh",
      "Line": "jkj",
      "Zone": "hj",
      "Title": "hhg",
      "Issue": "hjg",
      "Idea": "khg",
      "Remarks": "hhh"
    }
  }

  onSubmit() {
    this.showLoader = true;
    let userObj = {
      EmpID: this.loginForm.get('empId')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.authService.login(userObj).subscribe((res: any) => {
      if (res?.status == 1) {
        this.authService.isLoggedIn = true;
        this.loginForm.reset();
        this.isUserInvalid = false;
        // this.router.navigate(['user/viewuser']);
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

  navigateToViewSuggestion() {
    this.router.navigate(['suggestion/viewSuggestion']);
  }
}
