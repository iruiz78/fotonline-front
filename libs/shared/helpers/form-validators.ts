import { ValidatorFn } from '@angular/forms';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export class FormValidators {

    public static comparePassword(g: FormGroup) {
        return g.get('password')?.value === g.get('confirmPassword')?.value ? null : {mismatch: true};
    }

    public static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value) {
          // Si el control está vacío, no hay error
          return null;
        }

        // Comprueba el valor del control contra la expresión regular suministrada
        const valid = regex.test(control.value);

        // Si es true, devuelve null (sin error), de lo contrario, devuelve el error pasado como segundo parámetro
        return valid ? null : error;
      };
    }
    public static NoWhiteSpace() {
      return (control: AbstractControl) => {
        if (typeof control.value === 'number') {
          if (control.value != null) {
            if ((control.value || '').toString().trim().length === 0) {
              return { whiteSpace: true };
            }
          }
        } else {
          if ((control.value || '').trim().length === 0) {
            return { whiteSpace: true };
          }
        }
        // Agrega el retorno por defecto para indicar que la validación es exitosa
        return null;
      };
    }
}

// export function ValidateRangeWhithParams(min : number, max: number){
//     return (control : AbstractControl) => {
//         if (control.value < min || control.value > max){
//             return {validateRange : true}
//         }
//     }
// }
