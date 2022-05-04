import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { ErrorMessages } from 'src/app/modules/shared/models/errors.model';
import { AuthRoutes } from 'src/app/modules/shared/models/routes.model';
import { errorHandler } from 'src/app/modules/shared/utils/errors.fn';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PasswordUIService } from 'src/app/services/password-ui.service';

import { InputTypes } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //#region varibles
  loginForm: FormGroup | undefined;

  inputTypes = InputTypes;
  authRoutes = AuthRoutes;

  showPassword$ = this.passwordUIService.showPassword$;

  passwordErrorMessage = '';
  emailErrorMessage$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  emailError$: any;

  //#endregion

  constructor(
    private FB: FormBuilder,
    private authService: AuthenticationService,
    private passwordUIService: PasswordUIService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    this.listenEmail()?.subscribe();
    this.showPassword$.subscribe();
  }

  //#region core functions
  createLoginForm() {
    this.loginForm = this.FB.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    const email = this.loginForm?.get('email')?.value;
    const password = this.loginForm?.get('password')?.value;

    this.authService.signIn(email, password).subscribe({
      error: error => this.handleLoginErrors(error.message),
    });
  }

  handleLoginErrors(error: string) {
    if (error === ErrorMessages.FirebaseInvalidPassword) {
      this.passwordErrorMessage = errorHandler(error);
      this.emailErrorMessage$.next('');
      return;
    }
    if (error === ErrorMessages.FirebaseIvalidEmail) {
      this.emailErrorMessage$.next(errorHandler(error));
      this.passwordErrorMessage = '';
      return;
    }
  }

  listenEmail() {
    const email = this.loginForm?.get('email');
    return email?.valueChanges.pipe(
      debounceTime(700),
      tap(() => {
        if (email.errors?.['email']) {
          this.emailErrorMessage$.next(ErrorMessages.EmailFormatError);
          return;
        }
        this.emailErrorMessage$.next('');
      })
    );
  }

  //#endregion

  //#region Nebular Password UI
  toggleShowPassword() {
    this.passwordUIService.toggleShowPassword();
  }

  getPasswordState() {
    return this.passwordUIService.getPasswordState();
  }

  getIconState() {
    return this.passwordUIService.getIconState();
  }

  getInputType() {
    return this.passwordUIService.getInputType();
  }
  //#endregion
}
