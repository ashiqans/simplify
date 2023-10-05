import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import 'zone.js';
// import 'zone.js/dist/long-stack-trace-zone.js';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isUserInvalid = false;
  viewPassword: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let userObj = {
      email: this.loginForm.get('userName')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.login(userObj).subscribe((res: any) => {
      if (res?.jwtToken && res?.status == 1) {
        this.authService.isLoggedIn = true;
        this.loginForm.reset();
        this.isUserInvalid = false;
        this.router.navigate(['user/viewuser']);
      } else {
        this.isUserInvalid = true;
        this.authService.isLoggedIn = false;
      }
    })
  }

  togglePasswordVisibility() {
    this.viewPassword = !this.viewPassword;
  }
}
