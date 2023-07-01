import { AbstractControl } from "@angular/forms";

export class Helper {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('confirmPassword').value;
     if (password != confirmPassword) {
         abstractControl.get('confirmPassword').setErrors({
           MatchPassword: true
         })
    } else {
      return null
    }
  }
}
