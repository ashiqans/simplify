import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitleCase]'
})
export class TitleCaseDirective implements OnInit {

  constructor(private el: ElementRef) {
  }
/* Captilize first letter when data binded Added By TTH - 18 jan 2022 - Start */
  ngOnInit(){
    this.onModelChange();
  }
  /* Captilize first letter when data binded Added By TTH - 18 jan 2022 - End */
  @HostListener('ngModelChange', ['$event'])  // get value also first letter capital sharmila 05-Jan-2021 s

  onModelChange() {   // unused event removed sharmila 05-Jan-2022

    if (this.el.nativeElement.value) {
      const arr: string[] = this.el.nativeElement.value.split('');
      arr[0] = arr[0].toUpperCase();
      this.el.nativeElement.value = arr.join('');
      const input = (this.el.nativeElement.value).replace(/\s\s+/g, ' ');  // oly single space sharmila 02-Feb-2022--
      this.el.nativeElement.value = input;
  }
  } // get value also first letter capital sharmila 05-Jan-2021 E
  @HostListener('input', ['$event']) onInputChange() {   // unused event removed sharmila 05-Jan-2022
      if (this.el.nativeElement.value) {
          const arr: string[] = this.el.nativeElement.value.split('');
          arr[0] = arr[0].toUpperCase();
          this.el.nativeElement.value = arr.join('');
          const input = (this.el.nativeElement.value).replace(/\s\s+/g, ' ');  // oly single space sharmila 02-Feb-2022--
          this.el.nativeElement.value = input;
      }
  }
}
