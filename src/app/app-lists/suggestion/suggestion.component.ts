import { Component } from '@angular/core';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {
  public isExpanded = false;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

}
