import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent {
  addUserForm!: FormGroup;
  viewPassword: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  get newUser() {
    return this.addUserForm.controls;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  saveUser() {
    let payload = {
      userid: this.addUserForm?.get('id')?.value,
      username: this.addUserForm?.get('name')?.value,
      usermobnum: this.addUserForm?.get('mobile')?.value,
      useremail: this.addUserForm?.get('email')?.value,
      userpassword: this.addUserForm?.get('password')?.value,
      usercity: this.addUserForm?.get('city')?.value
    }
    this.userService.addUser(payload).subscribe(res => {
      if (res && res?.status == 1) {
        this.addUserForm.reset();
      }
    })
  }

  togglePasswordVisibility() {
    this.viewPassword = !this.viewPassword;
  }

  cancel() {
    this.addUserForm.reset();
  }

}
