import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.scss']
})
export class EdituserComponent {
  userData: any = [];
  columnNames: any;
  addUserForm!: FormGroup;
  editUser: boolean = false;
  isLoading: boolean = false;
  viewPassword: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.isLoading = false;
    this.userService.getUsers().subscribe(res => {
      if (res && res?.status == 1) {
        console.log(res)
        this.columnNames = Object.keys(res?.user_details[0]);
        this.columnNames.push('Action');
        this.userData = [...res?.user_details];
        this.isLoading = true;
      }
    })
  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  edit(element: any) {
    this.editUser = true;
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required],
      id: ['']
    });

    this.addUserForm.patchValue({
      name: element?.username,
      email: element?.useremail,
      mobile: element?.usermobnum,
      password: element?.userpassword,
      city: element?.usercity,
      id: element?.userid
    })
  }

  get newUser() {
    return this.addUserForm.controls;
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
    this.userService.updateUser(payload).subscribe(res => {
      if (res && res?.status == 1) {
        this.addUserForm.reset();
        this.editUser = false;
        this.getUserList();
      }
    })
  }

  togglePasswordVisibility() {
    this.viewPassword = !this.viewPassword;
  }

  cancel() {
    this.addUserForm.reset();
    this.editUser = false;
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
