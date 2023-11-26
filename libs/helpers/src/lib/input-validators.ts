export class InputValidators{
  static keyPressOnlyNumbers(event: any) {
       var charCode = (event.which) ? event.which : event.keyCode;
       // Only Numbers 0-9
       if ((charCode < 48 || charCode > 57)) {
         event.preventDefault();
         return false;
       } else {
         return true;
       }
     }
}
