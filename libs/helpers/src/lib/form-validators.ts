import { ValidatorFn } from '@angular/forms';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidators {

  static comparePassword(g: FormGroup) {
      return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {mismatch: true};
  }

  // static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } => {
  //   if (!control.value) {
  //     // if control is empty return no error
  //     return null;
  //   }
  //   // test the value of the control against the regexp supplied
  //   const valid = regex.test(control.value);
  //   // if true, return no error (no error), else return error passed in the second parameter
  //   return valid ? null : error;
  //   };
  // }

  // static ValidateRangeWhithParams(min : number, max: number){
  //   return (control : AbstractControl) => {
  //       if (control.value < min || control.value > max){
  //           return {validateRange : true}
  //       }
  //   }
  // }

  // static NoWhiteSpace() {
  //   return (control : AbstractControl) => {
  //     if (typeof control.value === 'number') {
  //       if(control.value != null){
  //         if((control.value || '').toString().trim().length == 0){
  //           return {whiteSpace : true}
  //         }
  //       }
  //     }else{
  //       if((control.value || '').trim().length == 0){
  //         return {whiteSpace : true}
  //       }
  //     }
  //   }
  // }

  // static NoZero() {
  //   return (control : AbstractControl) => {
  //     if(control.value == 0)
  //       return {zeroValue : true}
  //   }
  // }

}
