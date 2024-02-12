import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {
  public isExpanded = false;
  
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000); // Update every second
  }

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

}
