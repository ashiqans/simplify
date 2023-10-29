import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { SuggestionService } from '../../../services/suggestion.service';
import { SnackbarComponent } from '../../../snackbar/snackbar.component';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";

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
  viewSuggestionForm!: FormGroup;
  showAddSuggestion: boolean = false; 
  filterType: string = 'All';
  showLoader: boolean = false;
  department: any = [];
  line: any = [];
  zone: any = [];
  suggestionList: any = [];
  selectedSuggestionIndex: any;
  panelOpenState = false;
  implementationList: any = [{id: 'S', value: 'Self'},{id: 'ME', value: 'ME'},{id: 'M', value: 'Maintenance'}];
  categoryList: any = [{id: 'P', value: 'Productivity'},{id: 'C', value: 'Cost'},{id: 'Q', value: 'Quality'},{id: 'D', value: 'Delivery'},{id: 'S', value: 'Safety'}];
  gradeList: any = [{ id: 'A+', value: 'A+' }, { id: 'A', value: 'A' }, { id: 'B', value: 'B' }, { id: 'C', value: 'C' }, { id: 'D', value: 'D' }];
  // hrFormControl: any;
  viewSuggestionControls: any = [];
  selectedSuggestion: any;

  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private suggestionService: SuggestionService,
    private snackBar: MatSnackBar) {
    this.suggestionFilterMain();
    this.viewSuggestionTimeline();
  }
  
  ngOnInit(): void {
    // this.openSnackBar('This is a test message for snackbar')
    this.getSuggestionList();
    console.log(this.viewSuggestionForm)
    // this.hrFormControl = this.viewSuggestionForm.controls['hr'];
    this.viewSuggestionControls = [
      this.viewSuggestionForm.controls['sc'],
      this.viewSuggestionForm.controls['dl'],
      this.viewSuggestionForm.controls['im'],
      this.viewSuggestionForm.controls['pi'],
      this.viewSuggestionForm.controls['fi'],
      this.viewSuggestionForm.controls['ce'],
      this.viewSuggestionForm.controls['hr']
    ]
    // this.hrFormControl.controls.approvedDate.setValue('29-10-2023')
    // this.viewSuggestionControls[0].controls.approvedDate.setValidators([Validators.required]);
    // console.log(this.viewSuggestionForm)
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

  viewSuggestionTimeline() {
    this.viewSuggestionForm = this.formBuilder.group({
      sc: this.formBuilder.group({
        acceptRejectDate: '',
        accept: '',
        reject: '',
        rejectionRemarks: '',
        assignedEvaluator: ''
      }),
      dl: this.formBuilder.group({
        approvedDate: '',
        editSuggestion: '',
        beforeImgUpload: '',
        category: '',
        implementation: '',
        submit: '',
        assignedEvaluator: ''
      }),
      im: this.formBuilder.group({
        acceptRejectDate: '',
        accept: '',
        reject: '',
        rejectionRemarks: '',
        targetDate: '',
        assignedEvaluator: ''
      }),
      pi: this.formBuilder.group({
        approvedDate: '',
        description: '',
        afterImgUpload: '',
        costSavings: '',
        benefits: '',
        submit: '',
        submitEvaluator: '',
        assignedEvaluator: ''
      }),
      fi: this.formBuilder.group({
        approvedDate: '',
        costSavings: '',
        submit: '',
        submitEvaluator: ''
      }),
      ce: this.formBuilder.group({
        approvedDate: '',
        grade: '',
        comment: '',
        submit: '',
        submitEvaluator: ''
      }),
      hr: this.formBuilder.group({
        approvedDate: '',
        grade: '',
        paymentCredited: '',
        imgUpload: '',
        submit: '',
        winnersBoard: ''
      })
    })
  }

  getSuggestionList() {
    let payload = {

    }
    this.showLoader = true;
    this.suggestionService.getSuggestionList(payload).subscribe(res => {
      if (res?.Status == 1) {
        this.suggestionList = res?.result;
        this.openToaster('Suggestion List fetched successfully!', 3000, true);
        this.selectedSuggestionIndex = 0;
        this.selectedSuggestion = this.suggestionList[0];
      }
      this.showLoader = false;
    }, error => {
      this.openToaster('Suggestion List not fetched!', 3000, false)
    })
  }

  createSuggestion() {
    this.showLoader = true;
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
    this.addSuggestionForm.get('line')?.disable();
    this.addSuggestionForm.get('zone')?.disable();
    this.suggestionService.department().subscribe(res => {
      if (res?.Status == 1) {
        this.department = res?.result;
      }
      this.showLoader = false;
    }, error => {

    })
  }

  addSuggestion() {
    this.showLoader = true;
    let suggestionPayload = {
      EmpID: this.addSuggestionForm.get('empId')?.value,
      EmpName: this.addSuggestionForm.get('empName')?.value,
      Department: this.addSuggestionForm.get('department')?.value?.Department,
      Line: this.addSuggestionForm.get('line')?.value?.Line,
      Zone: this.addSuggestionForm.get('zone')?.value?.Zone,
      Title: this.addSuggestionForm.get('title')?.value,
      Issue: this.addSuggestionForm.get('issue')?.value,
      Idea: this.addSuggestionForm.get('idea')?.value,
      Remarks: this.addSuggestionForm.get('remarks')?.value
    }

    this.suggestionService.createSuggestion(suggestionPayload).subscribe(res => {
      if (res?.Status == '1') {
        this.getSuggestionList();
        this.openToaster('Suggestion created successfully!', 3000, true);
        this.addSuggestionForm.reset();
        this.showAddSuggestion = false;
      }
      this.showLoader = false;
    }, error => {
        this.openToaster('Suggestion not created!', 3000, false);
    })
  }

  cancelSuggestion() {
    this.addSuggestionForm.reset();
    this.showAddSuggestion = false;
  }

  applyFilter() {
    // let from = moment(this.filterForm.get('fromDate')?.value);
    // console.log(from.format('DD-MM-YYYY'))
    this.showLoader = true;

    let fromDate = this.filterForm.get('fromDate')?.value != '' ? moment(this.filterForm.get('fromDate')?.value).format('YYYY-MM-DD') : this.filterForm.get('fromDate')?.value;
    let toDate = this.filterForm.get('toDate')?.value != '' ? moment(this.filterForm.get('toDate')?.value).format('YYYY-MM-DD') : this.filterForm.get('toDate')?.value;

    let mainFilterPayload: any = {
      EmpID: this.filterForm.get('empId')?.value,
      SuggestionID: this.filterForm.get('suggestionId')?.value,
      Title: this.filterForm.get('suggestionTitle')?.value,
      Status: this.filterForm.get('status')?.value,
      Grade: this.filterForm.get('grade')?.value,
      FromDate: fromDate,
      ToDate: toDate
    }

    this.suggestionService.filterSuggestion(mainFilterPayload).subscribe(res => {
      if (res?.Status == 1) {
        this.suggestionList = [...res?.result];
        // this.filterForm.reset();
        mainFilterPayload = {}
        this.openToaster('Suggestion List fetched successfully!', 3000, true);
      } else {
        this.suggestionList = [];
        this.openToaster('No records found!', 3000, false);
      }
      this.showLoader = false;
    }, error => {
      this.showLoader = false;
      this.openToaster('Suggestion List not fetched!', 3000, false);
    })
  }

  cancelFilter() {
    this.filterForm.reset();
    this.filterForm.patchValue({
      FromDate: '',
      ToDate: ''
    })
    this.getSuggestionList();
  }

  cardFilterChange(filterType: string) {
    this.filterType = filterType;
  }

  departmentChange(event: any) {
    this.showLoader = true;
    // this.addSuggestionForm.get('department')?.patchValue(event?.value?.ID);
    this.suggestionService.line(event?.value?.ID).subscribe(res => {
      if (res?.Status == 1) {
        this.addSuggestionForm.get('line')?.enable();
        this.line = res?.result
      }
      this.showLoader = false;
    })
  }

  lineChange(event: any) {
    this.showLoader = true;
    // this.addSuggestionForm.get('line')?.patchValue(event?.value?.Value);
    this.suggestionService.zone(event?.value?.ID).subscribe(res => {
      if (res?.Status == 1) {
        this.addSuggestionForm.get('zone')?.enable();
        this.zone = res?.result
      }
      this.showLoader = false;
    })
  }

  zoneChange(event: any) {
    // this.addSuggestionForm.get('zone')?.patchValue(event?.value?.Value);
  }


  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 30000
    });
  }

  openToaster(content: any, duration: any, type: boolean, action?: any) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: [ type ? "success" : "error"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  suggestionSelect(suggestion: any, index: any) {
    this.selectedSuggestionIndex = index;
    this.selectedSuggestion = suggestion;
    console.log(this.selectedSuggestion)
  }

  uploadFiles(event: any, type: any) {
    let file = event?.target?.files;
    console.log(file[0]);
    console.log(file[0]?.name);
    if (type == 'dl') {
      this.viewSuggestionControls[1].controls.beforeImgUpload.setValue(file[0]?.name);
    } else if (type == 'pi') {
      this.viewSuggestionControls[3].controls.afterImgUpload.setValue(file[0]?.name);
    } else if (type == 'hr') {
      this.viewSuggestionControls[6].controls.imgUpload.setValue(file[0]?.name);
    }
  }

  scrollToTop(el: any) {
    const duration = 600;
    const interval = 5;
    const move = el.scrollTop * interval / duration;
    observableInterval(interval).pipe(
      scan((acc, curr) => acc - move, el.scrollTop),
      tap(position => el.scrollTop = position),
      takeWhile(val => val > 0)).subscribe();
  }

 }
