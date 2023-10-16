import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-suggestion',
  templateUrl: './view-suggestion.component.html',
  styleUrls: ['./view-suggestion.component.scss']
})
export class ViewSuggestionComponent {
  addSuggestionForm!: FormGroup;
  showAddSuggestion: boolean = false; 

  constructor(private formBuilder: FormBuilder) { }

  createSuggestion() {
    this.showAddSuggestion = true;
    this.addSuggestionForm = this.formBuilder.group({
      empId: ['', Validators.required],
      empName: ['', Validators.required],
      department: ['', Validators.required],
      line: ['', Validators.required],
      zone: ['', Validators.required],
      title: ['', Validators.required],
      issue: ['', Validators.required],
      idea: ['', Validators.required],
      remarks: ['', Validators.required]
    })
  }

  addSuggestion() {

  }

  cancelSuggestion() {
    this.addSuggestionForm.reset();
    this.showAddSuggestion = false;
  }

}
