import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: "DD-MM-YYYY"
  },
  display: {
    dateInput: "DD-MM-YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "DD-MM-YYYY",
    monthYearA11yLabel: "MMMM YYYY"
  }
};

@Component({
  selector: 'app-view-suggestion',
  templateUrl: './view-suggestion.component.html',
  styleUrls: ['./view-suggestion.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    DatePipe
  ]
})
  
export class ViewSuggestionComponent {
  filterForm!: FormGroup;
  addSuggestionForm!: FormGroup;
  showAddSuggestion: boolean = false; 
  filterType: string = 'All';

  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe) {
    this.suggestionFilterMain();
   }

  suggestionFilterMain() {
    this.filterForm = this.formBuilder.group({
      empId: '',
      suggestionId: '',
      suggestionTitle: '',
      status: '',
      grade: '',
      fromDate: '',
      toDate: ''
    })
  }

  getSuggestionList() {

  }

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

  applyFilter() {
    // let from = moment(this.filterForm.get('fromDate')?.value);
    // console.log(from.format('DD-MM-YYYY'))

    let fromDate = this.filterForm.get('fromDate')?.value != '' ? moment(this.filterForm.get('fromDate')?.value).format('DD-MM-YYYY') : this.filterForm.get('fromDate')?.value;
    let toDate = this.filterForm.get('toDate')?.value != '' ? moment(this.filterForm.get('toDate')?.value).format('DD-MM-YYYY') : this.filterForm.get('toDate')?.value;

    let mainFilterPayload = {
      EmpID: this.filterForm.get('empId')?.value,
      SuggestionID: this.filterForm.get('suggestionId')?.value,
      Title: this.filterForm.get('suggestionTitle')?.value,
      Status: this.filterForm.get('status')?.value,
      Grade: this.filterForm.get('grade')?.value,
      FromDate: fromDate,
      ToDate: toDate
    }

    console.log(mainFilterPayload)
  }

  cancelFilter() {
    this.filterForm.reset();
    this.getSuggestionList();
  }

  cardFilterChange(filterType: string) {
    this.filterType = filterType;
  }

}
