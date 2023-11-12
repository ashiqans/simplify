import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
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
  @ViewChild('logDialog') logDialog!: TemplateRef<any>;
  showLoader: boolean = false;
  loginId: any;
  userDetails: any;

  constructor(private router: Router,
    private authService: AuthenticationService,
    public dialog: MatDialog) {
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
    // this.showLoader = true;
    setTimeout(() => {
      // this.showLoader = false;
    this.router.navigate(['login']);
    sessionStorage.clear();
    }, 1000);
  }

  openLogOutDialog() {
    this.userDetails = sessionStorage.getItem('LogInDetails') ? sessionStorage.getItem('LogInDetails') : null;
    this.userDetails = this.userDetails ? JSON.parse(this.userDetails) : null;
    let dialogRef = this.dialog.open(this.logDialog, {
      data: {name: 'testy', animal: 'elephant'},
    });
    dialogRef.afterClosed().subscribe(result => { });
  }



}
