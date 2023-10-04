import { MatPaginator } from '@angular/material/paginator';
import { User, UserService } from './../services/user.service';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: number;
  password: string;
  paginator: any;
}

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.scss']
})

export class ViewuserComponent {
  userData: User[] = [];
  columnNames: any;
  isLoading: boolean = false;

  constructor(private userService: UserService) {

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
        this.userData = [...res?.user_details];
        // this.columnNames = Object.keys(res[0]);
        // this.userData = [...res];
        this.isLoading = true;
      }
    })
  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

}
