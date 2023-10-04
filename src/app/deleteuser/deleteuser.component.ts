import { Component, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.scss']
})
export class DeleteuserComponent {
  userData: any = [];
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
        this.columnNames.push('Action');
        this.userData = [...res?.user_details];
        this.isLoading = true;
      }
    })
  }

  capitalize(s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  delete(element: any) {
    let payload = {
      userid: element?.userid
    }
    this.userService.deleteUser(payload).subscribe(res => {
      if (res && res?.status == 1) {
        this.getUserList();
      }
    })
  }

}
