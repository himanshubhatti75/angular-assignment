import {
    AbstractControl,
    ValidatorFn,
    FormControl,
    FormGroup,
    ValidationErrors
  } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidator {
    static strong() {
      return (control: AbstractControl): ValidationErrors | null  => {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
        // console.log('Num, Upp, Low', hasNumber, hasUpper, hasLower);
        const valid = hasNumber && hasUpper && hasLower;
        if(!hasNumber){
            return {
                numberError: true
            }
        }
        if(!hasUpper){
            return {
                UpperError: true
            }
        }
        if(!hasLower){
            return { lowerError: true}
        }
        // if (!valid) {
        //     // return what´s not valid
        //     return { strong: true };
        // }
        return null;
      };
}


static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
}