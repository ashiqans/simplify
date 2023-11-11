import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  @Input() isExpanded!: boolean;
  @Output() toggleMenu = new EventEmitter();
  loginId: any;
  constructor(private router: Router,
    private authService: AuthenticationService) {
      this.loginId = sessionStorage.getItem('empId') ? sessionStorage.getItem('empId') : 0;
  }
  public routeLinks = [
    { link: "viewSuggestion", name: "View Suggestion", icon: "account_balance" },
    { link: "dashboard", name: "Dashboard", icon: "dashboard" }
  ];

  logIn() {
    this.authService.isLoggedIn = false;
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  logOut() {
    this.router.navigate(['login']);
    sessionStorage.clear();
  }



}
