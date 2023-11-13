import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appIndianCurrency]'
})
export class IndianCurrencyDirective {
  @Input() appIndianCurrency: any;
  constructor(
        private elementRef: ElementRef,
      ){ }
  ngOnChanges(changes: SimpleChanges) {
    let value = changes?.['appIndianCurrency']?.currentValue;
    if (value) {
  if (typeof value == 'string'){ // comma is removed vijay E 14-sep-2022
  value = value.replace(/,/g, '');
  }
  this.elementRef.nativeElement.value = new Intl.NumberFormat('en-IN').format(parseFloat(value)).toString();

}

}

}
