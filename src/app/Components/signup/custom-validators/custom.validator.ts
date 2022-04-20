import {
    AbstractControl,
    ValidatorFn,
    ValidationErrors
  } from '@angular/forms';


export interface ValidationResult {
    [key: string]: boolean;
}
export class CustomValidator {
    static strong() {
      return (control: AbstractControl): ValidationErrors | null  => {
        let hasNumber = /\d/.test(control.value);
        let hasUpper = /[A-Z]/.test(control.value);
        let hasLower = /[a-z]/.test(control.value);
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

  static atleastOne(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);
      if (control?.value || checkControl?.value) {
        return null;      
      }
      return { atleastOne: true }; 
    };
  }
}