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
      toDate: ''
    })
  }

  viewSuggestionTimeline() {
    this.viewSuggestionForm = this.formBuilder.group({
      sc: this.formBuilder.group({
        acceptRejectDate: '',
        approve: '',
        reject: '',
        rejectionRemarks: ['', Validators.required],
        assignedEvaluator: ''
      }),
      dl: this.formBuilder.group({
        approvedDate: '',
        editSuggestion: ['', Validators.required],
        beforeImgUpload: ['', Validators.required],
        category: ['', Validators.required],
        implementation: ['', Validators.required],
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
    console.log(this.viewSuggestionForm.controls['sc'].get('rejectionRemarks'))
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
        // this.selectedSuggestion = this.suggestionList[0];
        this.getSuggestionDetail(this.suggestionList[0]?.ID)
      }
      // this.showLoader = false;
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
    // this.selectedSuggestion = suggestion;
    this.getSuggestionDetail(suggestion?.ID);
  }

  getSuggestionDetail(sugId: any) {
    this.showLoader = true;
    sugId = 38// temp
    this.suggestionId = sugId;
    this.suggestionService.getSuggestionDetail(sugId, this.loginId).subscribe(res => {
      if (res?.Status == 1) {
        this.selectedSuggestion = res?.result;
        this.showLoader = false;
        console.log(this.selectedSuggestion)
        this.toggleStager(res?.result);
      }
    })
  }

  approveStage(stage: string) {
    if (stage == 'S1') {
      let payload = {
        SugID: 66, //this.suggestionId,
        LoginID: 1019, //this.loginId,
        ApprovalStatus: 'Approved',
        RejectReason: ''
      } 
      this.suggestionService.updateStage(1, payload).subscribe(res => {
        if (res?.Status == 1) {
          this.selectedSuggestion.s1.S1Evaluator = res?.result?.Evaluator;
          this.toggleStager(res?.result);
          console.log(res) 
        }
      })
    } else if (stage == 'S2') {
      const fileExtension = this.fileDetail?.type?.split('/')[1];
      const fileName = `${this.suggestionId}_before.${fileExtension}`;
      let payload = {
        SugID: 66, //this.suggestionId,
        LoginID: 1019, //this.loginId,
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
              this.toggleStager(res?.result);
              console.log(res) 
            }
          }) 
        }
      });
    } else if (stage == 'S3') {
      const fileExtension = this.fileDetail?.type?.split('/')[1];
      const fileName = `${this.suggestionId}_before.${fileExtension}`;
      let payload = {
        SugID: 66, //this.suggestionId,
        LoginID: 1019, //this.loginId,
        Category: this.viewSuggestionForm.controls['dl'].get('category')?.value,
        Implementation: this.viewSuggestionForm.controls['dl'].get('implementation')?.value,
        BeforePhotoFileName: fileName
      }
      this.suggestionService.fileUpload(this.fileDetail, fileName).subscribe(fileResp => {
        if (fileResp.Status == 1) {
          this.suggestionService.updateStage(2, payload).subscribe(res => {
            if (res?.Status == 1) {
              this.viewSuggestionForm.controls['dl'].reset();
              this.viewSuggestionForm.controls['dl'].markAsUntouched();
              this.selectedSuggestion.s2.S2Evaluator = res?.result?.Evaluator;
              this.toggleStager(res?.result);
              console.log(res)
            }
          })
        }
      });
    } else {
      
    }
    
  }

  rejectStage(stage: string) {

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
    this.viewSuggestionForm.controls['sc'].disable();
    // Stage 1
    this.viewSuggestionForm?.get('sc.rejectionRemarks')?.setValue(value?.s1?.S1ApprovalRemarks);
    // this.detailTree[0]?.s1c == 'Disable' ? this.viewSuggestionForm.controls['sc'].disable() : this.viewSuggestionForm.controls['sc'].enable();

    // Stage 2
    this.viewSuggestionForm?.get('dl.editSuggestion')?.setValue(value?.s2?.S2SuggestionTitle);
    this.viewSuggestionForm?.get('dl.implementation')?.setValue(value?.s2?.S2Implementation);
    this.viewSuggestionForm?.get('dl.category')?.setValue(value?.s2?.S2Category);
    this.viewSuggestionForm?.get('dl.beforeImgUpload')?.setValue(value?.s2?.S2BeforePhotoName);
    // this.detailTree[1]?.s2c == 'Disable' ? this.viewSuggestionForm.controls['dl'].disable() : this.viewSuggestionForm.controls['dl'].enable();

    // Stage 3
    this.detailTree[2]?.s3c == 'Disable' ? this.viewSuggestionForm.controls['im'].disable() : this.viewSuggestionForm.controls['im'].enable();

    // Stage 4
    this.detailTree[3]?.s4c == 'Disable' ? this.viewSuggestionForm.controls['pi'].disable() : this.viewSuggestionForm.controls['pi'].enable();

    // Stage 5
    this.detailTree[4]?.s5c == 'Disable' ? this.viewSuggestionForm.controls['fi'].disable() : this.viewSuggestionForm.controls['fi'].enable();

    // Stage 6
    this.detailTree[5]?.s6c == 'Disable' ? this.viewSuggestionForm.controls['ce'].disable() : this.viewSuggestionForm.controls['ce'].enable();

    // Stage 7
    this.detailTree[6]?.s7c == 'Disable' ? this.viewSuggestionForm.controls['hr'].disable() : this.viewSuggestionForm.controls['hr'].enable();
  }

  uploadFiles(event: any, type: any) {
    let file = event?.target?.files[0];
    if (type == 'dl') {
      this.fileDetail = file;
      this.viewSuggestionControls[1].controls.beforeImgUpload.setValue(file.name);
      // this.suggestionService.fileUpload(this.fileS2).subscribe(fileResp => {});
      // this.updateStageFive();
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

  // updateStageTwo() {
  //   console.log(this.viewSuggestionControls)
  //   console.log(this.viewSuggestionControls[1].get('beforeImgUpload').value);
  //   const payload = new FormData();
  //   payload.append('LoginID',  '1037');
  //   payload.append('SugID',  '38');
  //   payload.append('Image',  this.viewSuggestionControls[1].get('beforeImgUpload').value);
  //   payload.append('S2Implementation',  'hgfhgfh');
  //   payload.append('S2Category',  'jgjhjg');
  //   console.log(payload.get('file'));
  //   console.log(payload)
  //   this.suggestionService.updateStageTwo(payload).subscribe(res => {
  //     console.log(res)
  //     console.log(payload)
  //   })
  // }

 }
