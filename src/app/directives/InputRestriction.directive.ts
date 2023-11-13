import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appInputRestriction]'
})
export class InputRestrictionDirective {
    inputElement: ElementRef;
    @Input('appInputRestriction') appInputRestriction!: string;
    @Input('uppercase') uppercase!: string;
    @Input('lowercase') lowercase!: string;
    arabicRegex = '[\u0600-\u06FF]';
    lastValue!: string;
    constructor(private el: ElementRef, public commonApiService: 'CommonApiService') { // CR-780 mobile validation Mukilan 16-Jun-2022
        this.inputElement = el;
    }
    @HostListener('keypress', ['$event']) onKeyPress(event: any) {

        if (this.appInputRestriction === 'integer') {
            this.integerOnly(event);
        } else if (this.appInputRestriction === 'noSpecialChars') {
            this.noSpecialChars(event);
        }
        else if (this.appInputRestriction === 'allowalphabetsonly') {
            this.allowalphabets(event);
        }
        else if (this.appInputRestriction === 'allowalphabetandspace') {
            this.allowalphabetsandspace(event);
        }
        else if (this.appInputRestriction === 'ARN') {
            this.Arn(event);
        }
        else if (this.appInputRestriction === 'email') {
            this.Validateeamil(event);
        }
        else if (this.appInputRestriction === 'pan') {
            this.Validatepan(event);
        }
        else if (this.appInputRestriction === 'date') {
            this.Validatedate(event);
        }
        else if (this.appInputRestriction === 'allowalphabetandnumber') {
            this.Allowalphabetandnumber(event);
        }
        else if (this.appInputRestriction === 'allowalphabetandnumberandcomma') {
            this.Allowalphabetandnumberandspce(event);
        }
        else if (this.appInputRestriction === 'allowalphabetandnumberandhypen') {
            this.Allowalphabetandnumberandhyphen(event);
        }
        else if (this.appInputRestriction === 'restrictfirstspace') {
            this.restrictfirstspace(event);
        }
        else if (this.appInputRestriction === 'allowaddress') {
            this.allowaddress(event);
        }
        else if (this.appInputRestriction === 'allowschename') {
            this.allowschename(event);
        }
        else if (this.appInputRestriction === 'allownegrajob') {
            this.allownegrajob(event);
        }
        else if (this.appInputRestriction === 'allowsplandalpha') {
            this.allowsplandalpha(event);
        }
        else if (this.appInputRestriction === 'passwordvalidation') {
            this.passwordvalidation(event);
        }
        else if (this.appInputRestriction === 'spaceNotAllowed') {
            this.spaceNotAllowed(event);
        }
        else if (this.appInputRestriction === 'numberWithoutSpaceOTP') {
            this.numberWithoutSpaceOTP(event);
        } else if (this.appInputRestriction === 'amountLength') {                                 // amount limit 16-Nov-2021 sharmila
            this.amountLength(event);
        } else if (this.appInputRestriction === 'emailWithoutSpace') {// space not allowed 17-dec-2021 Kesavan
            this.emailWithoutSpace(event);
        } else if (this.appInputRestriction === 'AllowAlphabetandNumber') { // Alpha & Numeric without hypen - Ashiq T 09-Dec-2021
            this.AllowalphabetandnumberWithoutHypen(event);
        }else if (this.appInputRestriction === 'initalNoSpaceFullName') {       // --inital no space and oly single space sharmila 02-Feb-2022--                           //amount limit 16-Nov-2021 sharmila
            this.initalNoSpaceFullName(event);
        } else if (this.appInputRestriction === 'initalNoSpaceName') {       // --inital no space and oly single space sharmila 02-Feb-2022--                           //amount limit 16-Nov-2021 sharmila
            this.initalNoSpaceName(event);
        } // --inital no space and oly single space sharmila 02-Feb-2022--
        // No space and noSpace aphanumeric directive-Karan(16-02-2022)(start)
        else if (this.appInputRestriction === 'noSpace'){
            this.noSpace(event);
        }
        else if (this.appInputRestriction === 'noSpaceAlphaNum'){
            // this.noSpaceAlphaNumeric(event)
            this.panValidateNoSpace(event); // CRA-853 No space and alpnumeric with 4 letter p directive-sharmila(24-02-2022)(Start)
        }// No space and noSpace aphanumeric directive-Karan(16-02-2022)(end)
        else if (this.appInputRestriction === 'passportValidation'){ // passport validation directive-sharmila(24-02-2022)(Start)
            this.passportValidation(event);
        }else if (this.appInputRestriction === 'voterid'){    // CRA 460 voterid validation directive gopal(07-03-2022)
          this.VoterId(event);
        }else if (this.appInputRestriction === 'drivingLicense'){    //  CRA 460 drivingLicense validation directive gopal(08-03-2022)
          this.drivingLicense(event);
        }
        else if (this.appInputRestriction === 'panValidationMobile'){
            this.panValidationMobile(event);
        }else if (this.appInputRestriction === 'noSpaceAlphaNumeric'){
            this.noSpaceAlphaNumeric(event); // 1830 added alphanum Sharmila 18-Oct-2022
        }
    }
    @HostListener('input', ['$event']) onInputChange(event: any) {
        if (this.appInputRestriction === 'folionumber') {
            this.validatefolionumber(event);
        }
        else if (this.appInputRestriction === 'numbersonly') {
            this.allownumber(event);
        }
        // sayali-ACC-9-5-2022-CRA1324-Allow Decimal Number
        else if (this.appInputRestriction === 'numbersanddecimalonly') {
            this.allowdecimalnumber(event);
        }
        // SAILAZA-ACC 04-01-2022
        else if (this.appInputRestriction === 'allownumberwithcomma') {
            // THIS FUNCTION WILL REPLACE NUMBER  WITH COMMA  AFTER EVERY 3 DIGIT
            this.allownumberwithcomma(event);
        }
        // SAILAZA-ACC 04-01-2022 END
        else if (this.appInputRestriction === 'allownumberwithpercentageanddot') {
            this.allownumberwithpercentageanddot(event);
        }
        else if (this.appInputRestriction === 'numbersandcommaallowed') {
            this.Numbersandcommaallowed(event);
        }
        // Directive for User ID fields-Karan(25-04-2022)(start)
        else if (this.appInputRestriction === 'idValidation'){
            this.idValidation(event);
        } else if (this.appInputRestriction === 'alphabetInitalNoSpaceName') {
            this.alphabetInitalNoSpaceName(event);
        }
        else if (this.appInputRestriction === 'alphabetAndInitalNoSpace') { // CR-780 mobile validation Mukilan 16-Jun-2022 Start
            this.alphabetAndInitalNoSpace(event);
        }
        else if (this.appInputRestriction === 'numberAndInitalNoSpace'){
            this.numberAndInitalNoSpace(event);
        }else if (this.appInputRestriction === 'alphebetNumberAndInitalNoSpace'){
            this.alphebetNumberAndInitalNoSpace(event);
        }// CR-780 mobile validation Mukilan 16-Jun-2022 End
        // Directive for User ID fields-Karan(25-04-2022)(end)
    }
    /**CR-CRA-780 mobile validation Sharmila 08-Apr-2022 Start */
    @HostListener('ngModelChange', ['$event'])
    ngModelChange(event: any) {
        if (this.appInputRestriction === 'alphabetAndInitalNoSpace') {
            this.alphabetAndInitalNoSpace(event);
        } else if (this.appInputRestriction === 'alphabetInitalNoSpaceName') {
            this.alphabetInitalNoSpaceName(event);
        }else if (this.appInputRestriction === 'numberAndInitalNoSpace'){
            this.numberAndInitalNoSpace(event);
        }else if (this.appInputRestriction === 'alphebetNumberAndInitalNoSpace'){
            this.alphebetNumberAndInitalNoSpace(event);
        }else if (this.appInputRestriction === 'addressrAndInitalNoSpace'){
            this.addressrAndInitalNoSpace(event);
        }else if (this.appInputRestriction === 'noSpaceValidation'){
            this.noSpaceValidation(event);
        }else if (this.appInputRestriction === 'amountAndInitalNoSpace'){
            this.amountAndInitalNoSpace(event);
        }else if (this.appInputRestriction === 'dateolyMobile'){
            this.dateolyMobile(event);
        }
        // Directive for User ID fields-Karan(26-04-2022)(start)
        else if (this.appInputRestriction === 'idValidation'){
            this.idValidation(event);
        }
        // Directive for User ID fields-Karan(26-04-2022)(end)

      }

      @HostListener('keydown', ['$event']) onKeyDown(event: any) {
        if (this.appInputRestriction === 'panValidationMobile'){
            this.panValidationMobile(event);
        }
      }
      @HostListener('keyup', ['$event']) onKeyUp(event: any) {
        if (this.appInputRestriction === 'panValidationMobile'){
            this.panValidationMobile(event);
        }
    }

      /**CR-CRA-780 mobile validation Sharmila 08-Apr-2022 End */
    allownumberwithpercentageanddot(event: any) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9.%]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', false, true);
            event.target.dispatchEvent(evt);
            event.stopPropagation();
        }
    }
    validatefolionumber(event: any) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            event.stopPropagation();
        }
    }
    allownumber(event: any) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', false, true);
            event.target.dispatchEvent(evt);
            event.stopPropagation();
        }
    }
           // sayali-ACC-9-5-2022-CRA1324-Allow Decimal Number
    allowdecimalnumber(event: any){
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9\.]/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', false, true);
            event.target.dispatchEvent(evt);
            event.stopPropagation();
        }
    }
    // SAILAZA-ACC 04-01-2022
     // THIS FUNCTION WILL REPLACE NUMBER  WITH COMMA  AFTER EVERY 3 DIGIT
    allownumberwithcomma(event: any) {

        const initalValue = this.el.nativeElement.value;
        const v = initalValue.replace(/[^0-9]*/g, '');
        this.el.nativeElement.value = v.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (initalValue !== this.el.nativeElement.value) {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', false, true);
            event.target.dispatchEvent(evt);
            event.stopPropagation();
        }
    }
     // SAILAZA-ACC 04-01-2022 END
    Numbersandcommaallowed(event: any) {
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^0-9\,]/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', false, true);
            event.target.dispatchEvent(evt);
            event.stopPropagation();
        }
    }
    passwordvalidation(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const regex = new RegExp('^[a-zA-Z]*$');
        const regex1 = new RegExp('^[-0-9]*$');
        const regex2 = new RegExp('^[#$@*]*$');
        if (regex.test(ch) || regex1.test(ch) || regex2.test(ch)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    spaceNotAllowed(event: any) {
        if (event.code == 'Space') {
            if (event.target.value.length == 0) {
                event.preventDefault();
            }
        } else {
            if (event.charCode !== 0) {
                const pattern = /[a-zA-Z0-9]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        }
    }
    numberWithoutSpaceOTP(event: any) {
        if (event.code == 'Space') {
            event.preventDefault();
        } else {
            if (event.charCode !== 0) {
                const pattern = /[0-9]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        }
    }
    emailWithoutSpace(event: any) {// space not allowed 17-dec-2021 Kesavan
        if (event.code == 'Space') {
            event.preventDefault();
        }
    }
    //  pan 541 LOGIC IS PENDING
    Validatepan(event: any) {
        const inputvalue = event.target.value;
        const ch = String.fromCharCode(event.keyCode);
        const input = event.target.selectionStart;
        const regex = new RegExp('^[a-zA-Z]*$');
        const regex1 = new RegExp('^[0-9]*$');
        if ((input < 5 || input == 9) && (inputvalue.length < 5 || inputvalue.length == 9)) {
            if (!regex.test(ch)) {
                if (event.keyCode == 13) {
                    return true;
                }
                else {
                    event.preventDefault();
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else if ((input > 4 && input < 9) && (inputvalue.length > 4) && (inputvalue.length <= 9)) {
            if (!regex1.test(ch)) {
                event.preventDefault();
                return false;
            } else {
                return false;
            }

        }
        else {
            if (input < 5 && inputvalue.length <= 9) {
                if (!regex.test(ch)) {
                    event.preventDefault();
                    return false;
                } else {
                    return false;
                }
            }
            else if (input < 4 && inputvalue.length == 9) {
                if (!regex1.test(ch)) {
                    event.preventDefault();
                    return false;
                } else {
                    return false;
                }
            }
            else {
                if (event.keyCode == 13) {
                    return true;
                }
                else {
                    event.preventDefault();
                    return false;
                }
            }
        }
    }
    // date-formast-16-11-2021-seshan-s
    Validatedate(event: any) {
        const value = event.target.value;
        if (event.charCode !== 0) {
            const pattern = /[0-9/]/;
            const pattern1 = /[A-Za-z/]/;
            const pattern2 = /[-]/;
            const inputChar = String.fromCharCode(event.charCode);
            if (value.length < 2) {
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            } else if (value.length > 1 && value.length < 3) {
                if (!pattern2.test(inputChar)) {
                    event.preventDefault();
                }
            } else if (value.length > 2 && value.length < 6) {
                if (!pattern1.test(inputChar)) {
                    event.preventDefault();
                }
            } else if (value.length > 5 && value.length < 7) {
                if (!pattern2.test(inputChar)) {
                    event.preventDefault();
                }
            } else if (value.length > 6 && value.length < 11) {
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            } else if (value.length > 10) {
                event.preventDefault();
            }
        }
    }
    // date-formast-16-11-2021-seshan-e
    Allowalphabetandnumber(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const regex = new RegExp('^[a-zA-Z]*$');
        const regex1 = new RegExp('^[-0-9]*$');
        if (regex.test(ch) || regex1.test(ch)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    // Alpha & Numeric without hypen - Ashiq T - 09-Dec-2021 S
    AllowalphabetandnumberWithoutHypen(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const regex = new RegExp('^[a-zA-Z]*$');
        const regex1 = new RegExp('^[0-9]*$');
        if (regex.test(ch) || regex1.test(ch)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    // Alpha & Numeric without hypen - Ashiq T - 09-Dec-2021 E
    Allowalphabetandnumberandspce(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const regex = new RegExp('^[a-zA-Z]*$');
        const regex1 = new RegExp('^[-0-9,]*$');
        if (regex.test(ch) || regex1.test(ch)) {
            return true;
        }
        else if (event.keyCode == 13) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    Allowalphabetandnumberandhyphen(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const regex = new RegExp('^[a-zA-Z]*$');
        const regex1 = new RegExp('^[-0-9-]*$');
        const regex2 = new RegExp('(\d{0,9},)?(\d{9},)?\d{0,9}');
        if (regex.test(ch) || regex1.test(ch) || regex2.test(ch)) {
            return true;
        }
        else if (event.keyCode == 13) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    Arn(event: any) {

        const ch = String.fromCharCode(event.keyCode);
        const regex = new RegExp('^[a-zA-Z]*$');
        const regex1 = new RegExp('^[-0-9]*$');
        if (regex.test(ch) || regex1.test(ch)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }

    }
    Validateeamil(event: any) {
        const keycode = (event.which) ? event.which : event.keyCode;
        if (keycode == 32 || keycode == 44) {
            event.preventDefault();
        }
        else {
            return;
        }

    }
    integerOnly(event: any) {
        const e = event as KeyboardEvent;
        if (e.key === 'Tab' || e.key === 'TAB') {
            return;
        }
        if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||

            (e.keyCode === 65 && e.ctrlKey === true) ||

            (e.keyCode === 67 && e.ctrlKey === true) ||

            (e.keyCode === 86 && e.ctrlKey === true) ||

            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].indexOf(e.key) === -1) {
            e.preventDefault();
        }
    }

    noSpecialChars(event: any) {
        const e = event as KeyboardEvent;
        if (e.key === 'Tab' || e.key === 'TAB') {
            return;
        }
        let k;
        k = event.keyCode;
        if ((k > 64 && k < 91) || (k > 96 && k < 123) || k === 8 || k === 32 || (k >= 48 && k <= 57)) {
            return;
        }
        const ch = String.fromCharCode(e.keyCode);
        const regEx = new RegExp(this.arabicRegex);
        if (regEx.test(ch)) {
            return;
        }
        e.preventDefault();
    }
    allowalphabetsandspace(event: any) {
        const regex = new RegExp('^[a-zA-Z \s]+$');
        const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(str)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    allowalphabets(event: any) {
        const regex = new RegExp('^[a-zA-Z]*$');
        const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(str)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    restrictfirstspace(event: any) {
        const regex = new RegExp('^[a-zA-Z \s]+$');
        const input = event.target.selectionStart;
        const fgfg = event.target.value;
        if (event.charCode == 32 && fgfg.length == 0) {
            event.preventDefault();
            return false;
        }
        if (event.charCode == 32 && input == 0) {
            event.preventDefault();
            return;
        }
        const str = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (regex.test(str)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    allowaddress(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const input = event.target.selectionStart;
        const regex = new RegExp('^[#. /0-9a-zA-Z\s,-/]+$');
        if (event.charCode == 32 && input == 0) {
            event.preventDefault();
            return;
        }
        else {
            if (regex.test(ch)) {
                return true;
            }
            else {
                event.preventDefault();
                return false;
            }
        }
    }
    allownegrajob(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const regex = new RegExp('^[A-Za-z-/]*$');
        const regex1 = new RegExp('^[-0-9]*$');
        if (regex.test(ch) || regex1.test(ch)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    allowschename(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const input = event.target.selectionStart;
        const regex = new RegExp('^[A-Za-z- ]*$');
        const regex1 = new RegExp('^[-0-9]*$');
        if (event.charCode == 32 && input == 0) {
            event.preventDefault();
            return;
        }
        else if (regex.test(ch) || regex1.test(ch)) {
            return true;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    allowsplandalpha(event: any) {
        const ch = String.fromCharCode(event.keyCode);
        const input = event.target.selectionStart;
        const regex = new RegExp('^[A-Za-z/, ]*$');
        if (event.charCode == 32 && input == 0) {
            event.preventDefault();
            return;
        }
        else {
            if (regex.test(ch)) {
                return true;
            }
            else {
                event.preventDefault();
                return false;
            }
        }
    }

    /**
     * amount limit 16-Nov-2021 Sharmila
     * @param event
     */
    amountLength(event: any) {
        if (event.target.value.length < 12) {
            if (event.charCode !== 0) {
                const pattern = /[0-9/.]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        } else {
            event.preventDefault();
        }
    }
/**
 * inital no space and name with space sharmila 09-Feb-2022
 * @param event
 */
    initalNoSpaceName(event: any){
        if (event.code === 'Space') {
            if (event.target.value.length == 0) {
              event.preventDefault();
            }
          } else {
            if (event.charCode !== 0) {
              const pattern = /[a-zA-Z\s]/;  // removed spl character sharmila 16-Feb-2022
              const inputChar = String.fromCharCode(event.charCode);
              if (!pattern.test(inputChar)) {
                event.preventDefault();
              }
            }
          }
    }
    initalNoSpaceFullName(event: any){
        if (event.code === 'Space') {
            if (event.target.value.length == 0) {
              event.preventDefault();
            }
          } else {
            if (event.charCode !== 0) {
              const pattern = /[a-zA-Z.' ]/;
              const inputChar = String.fromCharCode(event.charCode);
              if (!pattern.test(inputChar)) {
                event.preventDefault();
              }
            }
          }
    }
    // No space and noSpace aphanumeric directive-Karan(16-02-2022)(start)
    noSpace(event: any){
        if (event.code === 'Space') {
            event.preventDefault();
        }
    }

    noSpaceAlphaNumeric(event: any){
        const ch = String.fromCharCode(event.keyCode);
        const regex = new RegExp('^[a-zA-Z]*$');
        const regex1 = new RegExp('^[-0-9-]*$');
        if (regex.test(ch) || regex1.test(ch)) {
            return true;
        }
        else if (event.code === 'Space') {
            event.preventDefault();
            return false;
        }
        else {
            event.preventDefault();
            return false;
        }
    }
    // No space and noSpace aphanumeric directive-Karan(16-02-2022)(end)
    /** CRA-853 pan validation with p letter sharmila 24-Feb-2022
     *
     * @param event
     */
    panValidateNoSpace(event: any) {
        if (event.code === 'Space') {
            event.preventDefault();
        }else{
            if (event.target.value.length <= 4){
                if ((event.charCode < 123  && event.charCode > 96) || (event.charCode < 91  && event.charCode > 64)){
                    const pattern = /[a-zA-Z]/;
                    const inputChar = String.fromCharCode(event.charCode);
                    if (!pattern.test(inputChar)) {
                                event.preventDefault();
                            }
                }
                else{
                    event.preventDefault();
                }

            }
            // else if(event.target.value.length === 3){
            //      if ((event.key !== 'p') && (event.key !== 'P')) {
            //         event.preventDefault();

            //     } else if ((event.key === 'p')&&(event.key === 'P')) {
            //         const pattern = /([p]){1}?$/;
            //         const inputChar = String.fromCharCode(event.charCode);
            //         if (!pattern.test(inputChar)) {
            //             event.preventDefault();
            //         }
            //    }
            // }else if(event.target.value.length === 4){
            //     if((event.charCode < 123  && event.charCode > 96) || (event.charCode < 91  && event.charCode > 64)){
            //         const pattern = /[a-zA-Z]/;
            //                 const inputChar = String.fromCharCode(event.charCode);
            //                 if (!pattern.test(inputChar)) {
            //                     event.preventDefault();
            //                 }
            //     }
            //     else{
            //         event.preventDefault();
            //     }
            // }
            else if (event.target.value.length > 4 && event.target.value.length < 9){
                if ((event.charCode < 58  && event.charCode > 47)){
                    const pattern = /[0-9]/;
                    const inputChar = String.fromCharCode(event.charCode);
                    if (!pattern.test(inputChar)) {
                                event.preventDefault();
                            }
                }
                else{
                    event.preventDefault();
                }
            }else if (event.target.value.length === 9){
                if ((event.charCode < 123  && event.charCode > 96) || (event.charCode < 91  && event.charCode > 64)){
                    const pattern = /[a-zA-Z]/;
                    const inputChar = String.fromCharCode(event.charCode);
                    if (!pattern.test(inputChar)) {
                                event.preventDefault();
                            }
                }
                else{
                    event.preventDefault();
                }
            }
        }
    }
    /**passport validation sharmila 24-Feb-2022
     *
     * @param event
     */
    passportValidation(event: any){
        if (event.code === 'Space') {
            event.preventDefault();
        }else{
            if (event.target.value.length < 1){
                if ((event.charCode < 123  && event.charCode > 96) || (event.charCode < 91  && event.charCode > 64)){
                    const pattern = /[a-zA-Z]/;
                    const inputChar = String.fromCharCode(event.charCode);
                    if (!pattern.test(inputChar)) {
                                event.preventDefault();
                            }
                }
                else{
                    event.preventDefault();
                }
            }else if (event.target.value.length > 0){
                if ((event.charCode < 58  && event.charCode > 47)){
                    const pattern = /[0-9]/;
                    const inputChar = String.fromCharCode(event.charCode);
                    if (!pattern.test(inputChar)) {
                                event.preventDefault();
                            }
                }
                else{
                    event.preventDefault();
                }
            }
        }
    } // end passport validation sharmila 24-Feb-2022
    // CRA 460 voterid and driving license validation directive gopal(07-03-2022)-start
    VoterId(event: any){
      if (event.code === 'Space') {
        event.preventDefault();
        }else{
        if (event.target.value.length < 3){
            if ((event.charCode < 123  && event.charCode > 96) || (event.charCode < 91  && event.charCode > 64)){
                const pattern = /[a-zA-Z]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                            event.preventDefault();
                        }
            }
            else{
                event.preventDefault();
            }
        }else if (event.target.value.length > 0){
            if ((event.charCode < 58  && event.charCode > 47)){
                const pattern = /[0-9]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                            event.preventDefault();
                        }
            }
            else{
                event.preventDefault();
            }
        }
    }
    }

    drivingLicense(event: any){
      if (event.code === 'Space') {
        event.preventDefault();
    }else{
        if (event.target.value.length < 2){
            if ((event.charCode < 123  && event.charCode > 96) || (event.charCode < 91  && event.charCode > 64)){
                const pattern = /[a-zA-Z]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                            event.preventDefault();
                        }
            }
            else{
                event.preventDefault();
            }
        }else if (event.target.value.length > 0){
            if ((event.charCode < 58  && event.charCode > 47)){
                const pattern = /[0-9]/;
                const inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                            event.preventDefault();
                        }
            }
            else{
                event.preventDefault();
            }
        }
    }
    }
    // CRA 460 voterid and driving license validation directive gopal(07-03-2022)-End


    // CR-CRA-780 mobile view Validation Checking Sharmila 05-Apr-2022 Start
    // alphabet oly
    alphabetAndInitalNoSpace(event: any){
        if (this.el.nativeElement?.value?.length === 1 && this.el.nativeElement?.value === ' '){
            const initalValue = this.el.nativeElement.value;
            const value = initalValue?.replace(/[^a-zA-Z]*/g, ''); // CR-780 mobile validation Mukilan 16-Jun-2022 Start
            const fnOut = 'this.commonApiService.alphabetTextFieldOnly(value)';
            this.el.nativeElement.value = fnOut ? fnOut : ''; // CR-780 mobile validation Mukilan 16-Jun-2022 End
        }else{
            const initalValue = this.el.nativeElement.value;
            const value1 = initalValue?.replace(/[^a-zA-Z ]*/g, ''); // CR-780 mobile validation Mukilan 16-Jun-2022 Start
            const fnOut1 = 'this.commonApiService.alphabetTextFieldOnly(value1)';
            this.el.nativeElement.value = fnOut1 ? fnOut1 : '';          // CR-780 mobile validation Mukilan 16-Jun-2022 End
        }


    }
    alphabetInitalNoSpaceName(event: any){
        if (this.el.nativeElement.value.length === 1 && this.el.nativeElement.value === ' '){
            const initalValue = this.el.nativeElement.value;
            const value = initalValue.replace(/[^a-zA-Z]*/g, '');
            const fnOut = 'this.commonApiService.alphabetTextFieldOnly(value)';
            this.el.nativeElement.value = fnOut ? fnOut : '';
        }else{
            const initalValue = this.el.nativeElement.value;
            const value1 = initalValue.replace(/[^a-zA-Z.' ]*/g, '');
            this.el.nativeElement.value = value1 ? value1 : '';
        }
    }
    // number oly
    numberAndInitalNoSpace(event: any){
            const initalValue = this.el.nativeElement.value;
            this.el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
            const fnOut = 'this.commonApiService.numbersOnly(this.el.nativeElement.value)'; // CR-780 mobile validation Mukilan 16-Jun-2022
            this.el.nativeElement.value = fnOut ? fnOut : ''; // CR-780 mobile validation Mukilan 16-Jun-2022
    }
    // alphabet and number
    alphebetNumberAndInitalNoSpace(event: any){
        if (this.el.nativeElement.value.length === 1 && this.el.nativeElement.value === ' '){
            const initalValue = this.el.nativeElement.value;
            this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z0-9]*/g, '');
            const fnOut = 'this.commonApiService.alphaNumericOnly(this.el.nativeElement.value)'; // CR-780 mobile validation Mukilan 16-Jun-2022
            this.el.nativeElement.value = fnOut ? fnOut : ''; // CR-780 mobile validation Mukilan 16-Jun-2022
        }else{
            const initalValue = this.el.nativeElement.value;
            this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z0-9]*/g, '');
            const fnOut1 = 'this.commonApiService.alphaNumericOnly(this.el.nativeElement.value)'; // CR-780 mobile validation Mukilan 16-Jun-2022
            this.el.nativeElement.value = fnOut1 ? fnOut1 : ''; // CR-780 mobile validation Mukilan 16-Jun-2022
        }
    }
    // address validation
    addressrAndInitalNoSpace(event: any){
        if (this.el.nativeElement.value.length === 1 && this.el.nativeElement.value === ' '){
            const initalValue = this.el.nativeElement.value;
            this.el.nativeElement.value = initalValue.replace(/[^#./0-9a-zA-Z,-/()]*/g, '');
        }else{
            const initalValue = this.el.nativeElement.value;
            this.el.nativeElement.value = initalValue.replace(/[^#. /0-9a-zA-Z\s,-/()]*/g, '');
        }
    }
    // no space validation
    noSpaceValidation(event: any){
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[\s]*/g, '');
    }
    // amount validation
    amountAndInitalNoSpace(event: any){
            const initalValue = this.el.nativeElement.value;
            this.el.nativeElement.value = initalValue.replace(/[^0-9.]*/g, '');
    }
    dateolyMobile(event: any){
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z0-9-/]*/g, '');
    }
    panValidationMobile(event: any){
    // let targetval = event.target.value;
    // event.target.value = targetval.substring(
    //     0,targetval.length - 1
    // )

        const windowKey: any = window.event;
        const kcd = event.wich || event.keyCode || windowKey.wich || windowKey.keyCode;
        if ((kcd === 8) || (kcd === 46) || (kcd === 188) || (kcd === 190)) {
            // event.preventDefault();
        }else{
            if (event.target.value.length <= 4){
                if ((kcd < 123  && kcd > 96) || (kcd < 91  && kcd > 64)){
                    const pattern = /[a-zA-Z]/;
                    const inputChar = String.fromCharCode(kcd);
                    if (!pattern.test(inputChar)) {
                                event.preventDefault();
                            }
                }
                else{
                    event.preventDefault();
                }

            }
            else if (event.target.value.length > 4 && event.target.value.length < 9){
                if ((kcd < 58  && kcd > 47) || kcd > 95 && kcd < 106){
                    const pattern = /[0-9]/;
                    const inputChar = (kcd);
                    if (!pattern.test(inputChar)) {
                                event.preventDefault();
                            }
                }
                else{
                    event.preventDefault();
                }
            }else if (event.target.value.length === 9){
                if ((kcd < 123  && kcd > 96) || (kcd < 91  && kcd > 64)){
                    const pattern = /[a-zA-Z]/;
                    const inputChar = String.fromCharCode(kcd);
                    if (!pattern.test(inputChar)) {
                                event.preventDefault();
                            }
                }
                else{
                    event.preventDefault();
                }
            }
        }
    }

    /// **CR-CRA-780 mobile validation Sharmila 08-Apr-2022 Start */

    // Directive for User ID fields-Karan(25-04-2022)(start)
    idValidation(event: any){
        const initalValue = this.el.nativeElement.value;
        this.el.nativeElement.value = initalValue.replace(/[^a-zA-Z0-9-.@_]*/g, '');
        if (initalValue !== this.el.nativeElement.value) {
            const evt = document.createEvent('HTMLEvents');
            evt.initEvent('input', false, true);
            event.target.dispatchEvent(evt);
            event.stopPropagation();
        }
    }
    // Directive for User ID fields-Karan(25-04-2022)(end)
}



