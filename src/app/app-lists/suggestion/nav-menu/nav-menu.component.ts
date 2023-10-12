import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  @Input() isExpanded!: boolean;
  @Output() toggleMenu = new EventEmitter();

  public routeLinks = [
    { link: "viewSuggestion", name: "View Suggestion", icon: "account_balance" },
    { link: "dashboard", name: "Dashboard", icon: "dashboard" }
  ];

}
