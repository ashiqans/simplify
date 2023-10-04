import { AuthenticationService } from './../services/authentication.service';
import { Component } from '@angular/core';

export interface TabItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  showLogout: boolean = false;
  constructor(private authService: AuthenticationService) {
  }
  tabs: TabItem[] = [
    {
      label: 'View User',
      route: 'viewuser',
      icon: 'person'
    },
    {
      label: 'Add User',
      route: 'adduser',
      icon: 'add'
    },
    {
      label: 'Edit User',
      route: 'edituser',
      icon: 'edit'
    },
    {
      label: 'Delete User',
      route: 'deleteuser',
      icon: 'delete'
    },
  ]

  selectedTabChanged(event: any) {
    console.log(event)
  }

  logOut() {
    this.authService.logout();
  }

}
