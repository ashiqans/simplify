import { DatePipe } from '@angular/common';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import moment from 'moment';
import { SuggestionService } from '../../../services/suggestion.service';
import { SnackbarComponent } from '../../../snackbar/snackbar.component';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

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
  @ViewChild('imageViewerDialog') imageViewerDialog!: TemplateRef<any>;
  @ViewChild('listView', { static: false }) public listView!: ElementRef;
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
  selectedSuggestion: any = null;
  fileDetail!: File;
  fileName: any;
  selectedSuggestionDetail: any;
  suggestionId: any;
  loginId: any = 0;
  detailTree: any = [
    {s1s: 'Show', s1c: 'Disable'},
    {s2s: 'Show', s2c: 'Disable'},
    {s3s: 'Show', s3c: 'Disable'},
    {s4s: 'Show', s4c: 'Disable'},
    {s5s: 'Show', s5c: 'Disable'},
    {s6s: 'Show', s6c: 'Disable'},
    {s7s: 'Show', s7c: 'Disable'}
  ]
  imageType: any = {
    name: '',
    src: ''
  }
  indexExpanded: any;
  minDate: Date = new Date()
  maxDate: Date = new Date()
  totalListCount=0;
  pageIndex= 0;
  pageSize = 10;
  mainFilterApplied = false;

  constructor(private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private suggestionService: SuggestionService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.suggestionFilterMain();
    this.viewSuggestionTimeline();
    this.loginId = sessionStorage.getItem('empId') ? sessionStorage.getItem('empId') : 0;
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

  // get f() {
  //   return this.viewSuggestionForm.get('sc');
  // }

  suggestionFilterMain() {
    this.filterForm = this.formBuilder.group({
      empId: '',
      suggestionId: '',
      suggestionTitle: '',
      status: '',
      grade: '',
      fromDate: '',
      toDate: '',
    })
  }

  viewSuggestionTimeline() {
    this.viewSuggestionForm = this.formBuilder.group({
      sc: this.formBuilder.group({
        acceptRejectDate: '',
        approve: '',
        reject: '',
        rejectionRemarks: '', // ['', Validators.required],
        assignedEvaluator: ''
      }),
      dl: this.formBuilder.group({
        approvedDate: '',
        editSuggestion: '', // ['', Validators.required],
        beforeImgUpload: '', // ['', Validators.required],
        category: '', // ['', Validators.required],
        implementation: '', // ['', Validators.required],
        submit: '',
        assignedEvaluator: ''
      }),
      im: this.formBuilder.group({
        acceptRejectDate: '',
        accept: '',
        reject: '',
        rejectionRemarks: '', // ['', Validators.required],
        targetDate: '', // ['', Validators.required],
        assignedEvaluator: ''
      }),
      pi: this.formBuilder.group({
        approvedDate: '',
        description: '', // ['', Validators.required],
        afterImgUpload: '', // ['', Validators.required],
        costSavings: [''],
        benefits: '',
        submit: '',
        submitEvaluator: '',
        assignedEvaluator: ''
      }),
      fi: this.formBuilder.group({
        approvedDate: '',
        costSavings: '', // ['', Validators.required],
        submit: '',
        submitEvaluator: ''
      }),
      ce: this.formBuilder.group({
        approvedDate: '',
        grade: '', // ['', Validators.required],
        comment: '', // ['', Validators.required],
        submit: '',
        submitEvaluator: ''
      }),
      hr: this.formBuilder.group({
        approvedDate: '',
        grade: '',
        paymentCredited: '', // ['', Validators.required],
        imgUpload: '', // ['', Validators.required],
        submit: '',
        winnersBoard: ''
      })
    })
    console.log(this.viewSuggestionForm.controls['sc'].get('rejectionRemarks'))
  }

  getSuggestionList(pageIndex?: any, pageSize?: any) {
    let payload = {

    }
    this.showLoader = true;
    this.suggestionService.getSuggestionList(payload, pageIndex, pageSize).subscribe(res => {
      if (res?.Status == 1) {
        this.suggestionList = res?.result;

        // this.suggestionList = [this.suggestionList, ...res?.result];
        // this.totalListCount = res?.totalListCount;

        this.openToaster('Suggestion List fetched successfully!', 3000, true);
        this.selectedSuggestionIndex = 0;
        // this.selectedSuggestion = this.suggestionList[0];
        this.getSuggestionDetail(this.suggestionList[0]?.ID)
      } else if (res?.Status == 0) {
        this.showLoader = false;
        this.openToaster('No Suggestion to show. Kindly Create!', 3000, true);
      }
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
    this.mainFilterApplied = true;
    
    let fromDate = this.filterForm.get('fromDate')?.value != '' && this.filterForm.get('fromDate')?.value != 'Invalid date' ? moment(this.filterForm.get('fromDate')?.value).format('YYYY-MM-DD') : this.filterForm.get('fromDate')?.value;
    let toDate = this.filterForm.get('toDate')?.value != '' && this.filterForm.get('toDate')?.value != 'Invalid date' ? moment(this.filterForm.get('toDate')?.value).format('YYYY-MM-DD') : this.filterForm.get('toDate')?.value;

    let mainFilterPayload: any = {
      EmpID: this.filterForm.get('empId')?.value,
      SuggestionID: this.filterForm.get('suggestionId')?.value,
      Title: this.filterForm.get('suggestionTitle')?.value,
      Status: this.filterForm.get('status')?.value,
      Grade: this.filterForm.get('grade')?.value,
      FromDate: fromDate,
      ToDate: toDate
    }

    this.suggestionService.getSuggestionList(mainFilterPayload, this.pageIndex, this.pageSize).subscribe(res => {
      if (res?.Status == 1) {
        this.suggestionList = [...res?.result];

        // this.suggestionList = [this.suggestionList, ...res?.result];
        // this.totalListCount = res?.totalListCount;

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
    this.mainFilterApplied = false;
    this.filterForm.reset();
    this.filterForm.patchValue({
      FromDate: '',
      ToDate: ''
    })
    this.getSuggestionList();
  }

  cardFilterChange(filterType: string) {
    this.filterType = filterType;
    let payload = {
      EmpID: '',
      Status: '',
      FromDate: '',
      ToDate: ''
    }

    if (filterType == 'Pen') {
      payload.Status = 'Pending';
      payload.EmpID = this.loginId;
    }
    if (filterType == 'My') {
      payload.EmpID = this.loginId;
    }

    this.showLoader = true;
    this.suggestionService.getSuggestionList(payload, this.pageIndex, this.pageSize).subscribe(res => {
      if (res?.Status == 1) {
        this.suggestionList = res?.result;

        // this.suggestionList = [this.suggestionList, ...res?.result];
        // this.totalListCount = res?.totalListCount;

        this.openToaster('Suggestion List fetched successfully!', 3000, true);
        this.selectedSuggestionIndex = 0;
        this.getSuggestionDetail(this.suggestionList[0]?.ID)
      } else if (res?.Status == 0) {
        this.showLoader = false;
        this.suggestionList = []
        this.openToaster('No Suggestion to show. Kindly Create!', 3000, true);
      }
    }, error => {
      this.openToaster('Suggestion List not fetched!', 3000, false)
      this.suggestionList = []
    })
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
      // panelClass: [type ? "success" : "error"],
      horizontalPosition: 'start',
      verticalPosition: 'bottom'
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }

  suggestionSelect(suggestion: any, index: any) {
    this.viewSuggestionForm.reset();
    this.viewSuggestionForm.updateValueAndValidity();

    this.selectedSuggestionIndex = index;
    if(this.suggestionId != suggestion?.ID) this.getSuggestionDetail(suggestion?.ID);
  }

  getSuggestionDetail(sugId: any) {
    this.viewSuggestionForm.reset();
    this.viewSuggestionForm.updateValueAndValidity();

    this.showLoader = true;
    // sugId = 64// temp
    this.suggestionId = sugId;
    // this.loginId = 1019;
    this.suggestionService.getSuggestionDetail(this.suggestionId, this.loginId).subscribe(res => {
      if (res?.Status == 1) {
        this.selectedSuggestion = res?.result;
        this.showLoader = false;
        console.log(this.selectedSuggestion)
        this.toggleStager(res?.result);
      }
    })
  }

  approveStage(stage: string) {
    this.showLoader = true;
    if (stage == 'S1' && this.viewSuggestionForm.controls['sc'].status == 'VALID') {
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        ApprovalStatus: 'Approved',
        RejectReason: this.viewSuggestionForm.controls['sc'].get('rejectionRemarks')?.value
      } 
      this.suggestionService.updateStage(1, payload).subscribe(res => {
        if (res?.Status == 1) {
          this.selectedSuggestion.s1.S1Evaluator = res?.result?.Evaluator;
          this.getSuggestionDetail(this.suggestionId);
          // this.toggleStager(res?.result);
          this.openToaster(res?.RespMsg, 5000, true);
          console.log(res) 
        } else if(res?.Status == 0) {
          this.openToaster(res?.result, 5000, true);
        }
        this.showLoader = false;
      })
    } else if (stage == 'S2' && this.viewSuggestionForm.controls['dl'].status == 'VALID') {
      const fileExtension = this.fileDetail?.type?.split('/')[1];
      const fileName = `${this.suggestionId}_before.${fileExtension}`;
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        Category: this.viewSuggestionForm.controls['dl'].get('category')?.value,
        Implementation: this.viewSuggestionForm.controls['dl'].get('implementation')?.value,
        SuggestionTitle: this.viewSuggestionForm.controls['dl'].get('editSuggestion')?.value,
        BeforePhotoFileName: fileName
      }
      this.suggestionService.fileUpload(this.fileDetail, fileName).subscribe(fileResp => {
        if (fileResp.Status == 1) {
          this.suggestionService.updateStage(2, payload).subscribe(res => {
            if (res?.Status == 1) {
              // this.viewSuggestionForm.controls['dl'].reset();
              // this.viewSuggestionForm.controls['dl'].markAsUntouched();
              this.selectedSuggestion.s2.S2Evaluator = res?.result?.Evaluator;
              this.getSuggestionDetail(this.suggestionId);
              // this.toggleStager(res?.result);
              this.openToaster(res?.RespMsg, 5000, true);
              console.log(res) 
            } else if(res?.Status == 0) {
              this.openToaster(res?.result, 5000, true);
            }
            this.showLoader = false;
          }) 
        }
      });
    } else if (stage == 'S3' && this.viewSuggestionForm.controls['im'].status == 'VALID') {
      const targetDate = moment(this.viewSuggestionForm.controls['im'].get('targetDate')?.value).format('YYYY-MM-DD')
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        ApprovalStatus: "Approved",
        RejectReason: this.viewSuggestionForm.controls['im'].get('rejectionRemarks')?.value,
        TargetDate: targetDate
      }
      this.suggestionService.updateStage(3, payload).subscribe(res => {
            if (res?.Status == 1) {
              this.selectedSuggestion.s3.S3Evaluator = res?.result?.Evaluator;
              this.getSuggestionDetail(this.suggestionId);
              // this.toggleStager(res?.result);
              this.openToaster(res?.RespMsg, 5000, true);
            } else if(res?.Status == 0) {
              this.openToaster(res?.result, 5000, true);
            }
            this.showLoader = false;
      })
    } else if (stage == 'S4' && this.viewSuggestionForm.controls['pi'].status == 'VALID') {
      const fileExtension = this.fileDetail?.type?.split('/')[1];
      const fileName = `${this.suggestionId}_after.${fileExtension}`;
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        Description: this.viewSuggestionForm.controls['pi'].get('description')?.value,
        CostSavings: this.viewSuggestionForm.controls['pi'].get('costSavings')?.value,
        AfterPhotoFileName: fileName
      }
      this.suggestionService.fileUpload(this.fileDetail, fileName).subscribe(fileResp => {
        if (fileResp.Status == 1) {
          this.suggestionService.updateStage(4, payload).subscribe(res => {
            if (res?.Status == 1) {
              this.selectedSuggestion.s4.S4Evaluator = res?.result?.Evaluator;
              this.getSuggestionDetail(this.suggestionId);
              // this.toggleStager(res?.result);
              this.openToaster(res?.RespMsg, 5000, true);
            } else if(res?.Status == 0) {
              this.openToaster(res?.result, 5000, true);
            }
            this.showLoader = false;
          }) 
        }
      });
    } else if (stage == 'S5' && this.viewSuggestionForm.controls['fi'].status == 'VALID') {
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        ActualCostSavings: this.viewSuggestionForm.controls['fi'].get('costSavings')?.value,
      }
      this.suggestionService.updateStage(5, payload).subscribe(res => {
            if (res?.Status == 1) {
              this.selectedSuggestion.s5.S5Evaluator = res?.result?.Evaluator;
              this.getSuggestionDetail(this.suggestionId);
              // this.toggleStager(res?.result);
              this.openToaster(res?.RespMsg, 5000, true);
            } else if(res?.Status == 0) {
              this.openToaster(res?.result, 5000, true);
            }
            this.showLoader = false;
      })
    } else if (stage == 'S6' && this.viewSuggestionForm.controls['ce'].status == 'VALID') {
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        Grade: this.viewSuggestionForm.controls['ce'].get('grade')?.value,
        Comment: this.viewSuggestionForm.controls['ce'].get('comment')?.value
      }
      this.suggestionService.updateStage(6, payload).subscribe(res => {
            if (res?.Status == 1) {
              this.selectedSuggestion.s6.S6Evaluator = res?.result?.Evaluator;
              this.getSuggestionDetail(this.suggestionId);
              // this.toggleStager(res?.result);
              this.openToaster(res?.RespMsg, 5000, true);
            } else if(res?.Status == 0) {
              this.openToaster(res?.result, 5000, true);
            }
            this.showLoader = false;
      })
    } else if (stage == 'S7' && this.viewSuggestionForm.controls['hr'].status == 'VALID') {
      const fileExtension = this.fileDetail?.type?.split('/')[1];
      const fileName = `${this.suggestionId}_employee.${fileExtension}`;
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        EmpPhotoName: fileName
      }
      this.suggestionService.fileUpload(this.fileDetail, fileName).subscribe(fileResp => {
        if (fileResp.Status == 1) {
          this.suggestionService.updateStage(7, payload).subscribe(res => {
            if (res?.Status == 1) {
              this.selectedSuggestion.s7.S7Evaluator = res?.result?.Evaluator;
              this.getSuggestionDetail(this.suggestionId);
              this.openToaster(res?.RespMsg, 5000, true);
            } else if(res?.Status == 0) {
              this.openToaster(res?.result, 5000, true);
            }
            this.showLoader = false;
          }) 
        }
      });
    } else {
      this.openToaster('Please enter proper values and then proceed!', 5000, true);
      this.showLoader = false;
    }
    
  }

  rejectStage(stage: string) {
    this.showLoader = true;
    if (stage == 'S1' && this.viewSuggestionForm.controls['sc'].status == 'VALID') {
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        ApprovalStatus: 'Rejected',
        RejectReason: this.viewSuggestionForm.controls['sc'].get('rejectionRemarks')?.value
      }
      this.suggestionService.updateStage(1, payload).subscribe(res => {
        if (res?.Status == 1) {
          this.selectedSuggestion.s1.S1Evaluator = res?.result?.Evaluator;
          this.getSuggestionDetail(this.suggestionId);
          // this.toggleStager(res?.result);
          this.openToaster(res?.RespMsg, 5000, true);
        } else if(res?.Status == 0) {
          this.openToaster(res?.result, 5000, true);
        }
        this.showLoader = false;
      })
    } else if (stage == 'S3' && this.viewSuggestionForm.controls['im'].status == 'VALID') {
      const targetDate = moment(this.viewSuggestionForm.controls['im'].get('targetDate')?.value).format('YYYY-MM-DD')
      let payload = {
        SugID: this.suggestionId,
        LoginID: this.loginId,
        ApprovalStatus: "Rejected",
        RejectReason: this.viewSuggestionForm.controls['im'].get('rejectionRemarks')?.value,
        TargetDate: targetDate
      }
      this.suggestionService.updateStage(3, payload).subscribe(res => {
        if (res?.Status == 1) {
          this.selectedSuggestion.s3.S3Evaluator = res?.result?.Evaluator;
          this.getSuggestionDetail(this.suggestionId);
          // this.toggleStager(res?.result);
          this.openToaster(res?.RespMsg, 5000, true);
        }
        this.showLoader = false;
      })
    }
  }

  toggleStager(value: any) {
    this.detailTree = [
      {s1s: value?.S1Status, s1c: value?.S1Control},
      {s2s: value?.S2Status, s2c: value?.S2Control},
      {s3s: value?.S3Status, s3c: value?.S3Control},
      {s4s: value?.S4Status, s4c: value?.S4Control},
      {s5s: value?.S5Status, s5c: value?.S5Control},
      {s6s: value?.S6Status, s6c: value?.S6Control},
      {s7s: value?.S7Status, s7c: value?.S7Control}
    ]

    // Stage 1
    this.viewSuggestionForm?.get('sc.rejectionRemarks')?.setValue(value?.s1?.S1ApprovalRemarks);
    this.selectedSuggestion.s1.S1Evaluator = value?.s1?.S1Evaluator;
    this.detailTree[0]?.s1c == 'Disable' ? this.viewSuggestionForm.controls['sc'].disable() : this.viewSuggestionForm.controls['sc'].enable();

    // Stage 2
    this.viewSuggestionForm?.get('dl.editSuggestion')?.setValue(value?.s2?.S2SuggestionTitle);
    this.viewSuggestionForm?.get('dl.implementation')?.setValue(value?.s2?.S2Implementation);
    this.viewSuggestionForm?.get('dl.category')?.setValue(value?.s2?.S2Category);
    this.viewSuggestionForm?.get('dl.beforeImgUpload')?.setValue(value?.s2?.S2BeforePhotoName);
    this.selectedSuggestion.s2.S2Evaluator = value?.s2?.S2Evaluator;
    this.detailTree[1]?.s2c == 'Disable' ? this.viewSuggestionForm.controls['dl'].disable() : this.viewSuggestionForm.controls['dl'].enable();

    // Stage 3
    let targetDate = moment(value?.s3?.S3TargetDate).format('YYYY-MM-DD')
    this.viewSuggestionForm?.get('im.targetDate')?.setValue(targetDate);
    this.viewSuggestionForm?.get('im.rejectionRemarks')?.setValue(value?.s3?.S3ApprovalRemarks);
    this.detailTree[2]?.s3c == 'Disable' ? this.viewSuggestionForm.controls['im'].disable() : this.viewSuggestionForm.controls['im'].enable();

    // Stage 4
    this.viewSuggestionForm?.get('pi.description')?.setValue(value?.s4?.S4Description);
    this.viewSuggestionForm?.get('pi.costSavings')?.setValue(value?.s4?.S4CostSavings);
    this.viewSuggestionForm?.get('pi.afterImgUpload')?.setValue(value?.s4?.S4AfterPhotoName);
    if (this.selectedSuggestion?.s4?.S4Benefits == 'Cost') {
      this.viewSuggestionForm?.get('pi.costSavings')?.setValidators(Validators.required)
    }
    this.detailTree[3]?.s4c == 'Disable' ? this.viewSuggestionForm.controls['pi'].disable() : this.viewSuggestionForm.controls['pi'].enable();

    // Stage 5
    this.viewSuggestionForm?.get('fi.costSavings')?.setValue(value?.s5?.S5ActualCostSavings);
    this.detailTree[4]?.s5c == 'Disable' ? this.viewSuggestionForm.controls['fi'].disable() : this.viewSuggestionForm.controls['fi'].enable();

    // Stage 6
    this.viewSuggestionForm?.get('ce.grade')?.setValue(value?.s6?.S6Grade);
    this.viewSuggestionForm?.get('ce.comment')?.setValue(value?.s6?.S6Comment);
    this.detailTree[5]?.s6c == 'Disable' ? this.viewSuggestionForm.controls['ce'].disable() : this.viewSuggestionForm.controls['ce'].enable();

    // Stage 7
    this.viewSuggestionForm?.get('hr.paymentCredited')?.setValue(value?.s7?.S7PaymentCredited);
    this.viewSuggestionForm?.get('hr.imgUpload')?.setValue(value?.s7?.S7EmpPhotoName);
    this.detailTree[6]?.s7c == 'Disable' ? this.viewSuggestionForm.controls['hr'].disable() : this.viewSuggestionForm.controls['hr'].enable();

    // *Form control validation check
    if (this.detailTree[0]?.s1s == 'Show') {
      this.viewSuggestionForm?.get('sc.rejectionRemarks')?.setValidators(Validators.required);
      // this.viewSuggestionForm?.get('sc.rejectionRemarks')?.markAsUntouched();
      this.viewSuggestionForm?.get('sc.rejectionRemarks')?.updateValueAndValidity();
    }

    if (this.detailTree[1]?.s2s == 'Show') {
      this.viewSuggestionForm?.get('dl.editSuggestion')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('dl.implementation')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('dl.category')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('dl.beforeImgUpload')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('dl.editSuggestion')?.updateValueAndValidity();
      this.viewSuggestionForm?.get('dl.implementation')?.updateValueAndValidity();
      this.viewSuggestionForm?.get('dl.category')?.updateValueAndValidity();
      this.viewSuggestionForm?.get('dl.beforeImgUpload')?.updateValueAndValidity();
    }

    if (this.detailTree[2]?.s3s == 'Show') {
      this.viewSuggestionForm?.get('im.targetDate')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('im.rejectionRemarks')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('im.targetDate')?.updateValueAndValidity();
      this.viewSuggestionForm?.get('im.rejectionRemarks')?.updateValueAndValidity();
    }

    if (this.detailTree[3]?.s4s == 'Show') {
      this.viewSuggestionForm?.get('pi.description')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('pi.afterImgUpload')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('pi.description')?.updateValueAndValidity();
      this.viewSuggestionForm?.get('pi.afterImgUpload')?.updateValueAndValidity();
    }

    if (this.detailTree[4]?.s5s == 'Show') {
      this.viewSuggestionForm?.get('fi.costSavings')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('fi.costSavings')?.updateValueAndValidity();
    }

    if (this.detailTree[5]?.s6s == 'Show') {
      this.viewSuggestionForm?.get('ce.grade')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('ce.comment')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('ce.grade')?.updateValueAndValidity();
      this.viewSuggestionForm?.get('ce.comment')?.updateValueAndValidity();
    }

    if (this.detailTree[6]?.s7s == 'Show') {
      this.viewSuggestionForm?.get('hr.imgUpload')?.setValidators(Validators.required);
      this.viewSuggestionForm?.get('hr.imgUpload')?.updateValueAndValidity();
    }

    // this.viewSuggestionForm.markAsPristine();
    // this.viewSuggestionForm.markAsUntouched();
    // this.viewSuggestionForm.reset(this.viewSuggestionForm.value);

    // Form control validation check*
    
    // Mat expansional panel open
    this.indexExpanded = this.detailTree[0]?.s1c == 'Enable' ? 1 : this.detailTree[1]?.s2c == 'Enable' ? 2 : this.detailTree[2]?.s3c == 'Enable' ? 3 : this.detailTree[3]?.s4c == 'Enable' ? 4 : this.detailTree[4]?.s5c == 'Enable' ? 5 : this.detailTree[5]?.s6c == 'Enable' ? 6 : 7;
  }

  uploadFiles(event: any, type: any) {
    let file = event?.target?.files[0];
    const fileSize = Math.round(file?.size / 1024);
    if (fileSize >= 5000) {
      this.openToaster('Please upload file size in less than 5MB', 10000, true);
      return; 
    }
    if (type == 'dl') {
      this.fileDetail = file;
      this.viewSuggestionControls[1].controls.beforeImgUpload.setValue(file?.name);
      // this.suggestionService.fileUpload(this.fileS2).subscribe(fileResp => {});
    } else if (type == 'pi') {
      this.fileDetail = file;
      this.viewSuggestionControls[3].controls.afterImgUpload.setValue(file?.name);
    } else if (type == 'hr') {
      this.fileDetail = file;
      this.viewSuggestionControls[6].controls.imgUpload.setValue(file?.name);
    }
  }

  openImageViewer(type: any) {
    if (type == 'dl') {
      this.imageType = {
        name: this.viewSuggestionForm?.get('dl.beforeImgUpload')?.value,
        src: `${this.suggestionService.baseURL}/images/${this.viewSuggestionForm?.get('dl.beforeImgUpload')?.value}`
      };
      if (this.imageType?.name != '') {
        this.showLoader = true;
        setTimeout(() => {
          this.showLoader = false;
          let dialogRef = this.dialog.open(this.imageViewerDialog);
          dialogRef.afterClosed().subscribe(result => {})
        }, 3000);
      } else {
        this.openToaster('No file to display', 3000, true);
      }
    } else if (type == 'pi') {
      this.imageType = {
        name: this.viewSuggestionForm?.get('pi.afterImgUpload')?.value,
        src: `${this.suggestionService.baseURL}/images/${this.viewSuggestionForm?.get('pi.afterImgUpload')?.value}`
      };
      if (this.imageType?.name != '') {
        this.showLoader = true;
        setTimeout(() => {
          this.showLoader = false;
          let dialogRef = this.dialog.open(this.imageViewerDialog);
          dialogRef.afterClosed().subscribe(result => {})
        }, 3000);
      } else {
        this.openToaster('No file to display', 3000, true);
      }
    } else if (type == 'hr') {
      this.imageType = {
        name: this.viewSuggestionForm?.get('hr.imgUpload')?.value,
        src: `${this.suggestionService.baseURL}/images/${this.viewSuggestionForm?.get('hr.imgUpload')?.value}`
      };
      if (this.imageType?.name != '') {
        this.showLoader = true;
        setTimeout(() => {
          this.showLoader = false;
          let dialogRef = this.dialog.open(this.imageViewerDialog);
          dialogRef.afterClosed().subscribe(result => {})
        }, 3000);
      } else {
        this.openToaster('No file to display', 3000, true);
      }
    }
  }

  onScrollLoadList() {
    const nativeElement= this.listView.nativeElement
    console.log(this.listView)

    if (nativeElement.clientHeight + Math.round(nativeElement.scrollTop) === nativeElement.scrollHeight && this.suggestionList?.length !== this.totalListCount) {
      if (!this.mainFilterApplied) {
        this.getSuggestionList(this.pageIndex, this.pageSize);
      } else {
        this.applyFilter();
      }
      this.pageIndex += 1;
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
