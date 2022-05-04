import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, debounceTime, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RegisterErrors, InputTypes } from './register.models';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private DEBAUNCE_TIME = 700;
  //prettier-ignore
  private emailIsTaken: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  emailIsTaken$ = this.emailIsTaken.asObservable();

  constructor(private authService: AuthenticationService) {}

  getInput(input: string, form: FormGroup | undefined) {
    if (input === InputTypes.Password || input === InputTypes.RepeatePassword) {
      return form?.get('passwordGroup')?.get(input);
    }
    return form?.get(input);
  }

  handlePasswordErrors(input: string, form: FormGroup | undefined) {
    const currentInput = this.getInput(input, form);
    return currentInput?.valueChanges.pipe(
      debounceTime(this.DEBAUNCE_TIME),
      switchMap(() => {
        //prettier-ignore
        if (input === InputTypes.Password && currentInput.errors?.['minlength']) {
            return of('Password must be at least 8 characters');
        }
        //prettier-ignore
        if (input === InputTypes.PasswordGroup && currentInput.errors?.['mustMatch']) {
           return of('Passwords do not match');
        }
        return of('');
      })
    );
  }

  handleEmailErrors(form: FormGroup | undefined) {
    const email = this.getInput(InputTypes.Email, form);
    return email?.valueChanges.pipe(
      debounceTime(this.DEBAUNCE_TIME),
      switchMap(() =>
        email.errors?.['email']
          ? of(RegisterErrors.FormatError)
          : this.authService.checkIfEmailIsAlreadyTaken(email?.value)
      ),
      tap(errorType => this.generateEmailErrorMessage(errorType))
    );
  }

  private generateEmailErrorMessage(errorType: string) {
    return errorType === RegisterErrors.EmailIsTaken
      ? this.emailIsTaken.next(false)
      : this.emailIsTaken.next(true);
  }
}
