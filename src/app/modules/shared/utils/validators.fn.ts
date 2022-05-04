import { AbstractControl, ValidatorFn } from '@angular/forms';

export const inputMatcher = (inputOne: string, inputTwo: string): ValidatorFn => {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    const firstInput = c.get(inputOne);
    const secondInput = c.get(inputTwo);

    if (firstInput?.value === secondInput?.value) {
      return null;
    }
    if (firstInput?.pristine || secondInput?.pristine) {
      return null;
    }
    return { mustMatch: true };
  };
};

export const emailIsAlreadyUsed = (state: boolean): ValidatorFn => {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if ((state = true)) {
      return { mustMatch: true };
    }
    return null;
  };
};
