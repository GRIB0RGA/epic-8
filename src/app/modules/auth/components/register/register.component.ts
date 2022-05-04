import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { NbComponentStatus } from '@nebular/theme';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/modules/shared/models/roles.model';
import { lettersOnly } from 'src/app/modules/shared/utils/helpers.fn';

import { inputMatcher } from 'src/app/modules/shared/utils/validators.fn';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PasswordUIService } from 'src/app/services/password-ui.service';

import { InputTypes } from './register.models';
import { RegisterService } from './register.service';

//prettier-ignore

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //#region  Variables
  registerForm: FormGroup | undefined;
  emailIsTaken: boolean | undefined;

  InputTypes = InputTypes;

  emailErrorMessage$: Observable<string> | undefined;
  passwordErrorMessage$: Observable<string> | undefined;
  passwordGroupErrorMessage$: Observable<string> | undefined;

  showPassword$ = this.passwordUIService.showPassword$;

  //#region Radio buttons
  options = [
    { value: Roles.Doctor, label: 'Doctor' },
    { value: Roles.Patient, label: 'Patient' },
  ];

  status: NbComponentStatus = 'basic';
  //#endregion
  
  //#endregion
  constructor(
    private FB: FormBuilder,
    private authService: AuthenticationService,
    private registerService: RegisterService,
    private passwordUIService: PasswordUIService
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
    this.handleErrorMessages();
    this.registerService.emailIsTaken$.subscribe(
      state => (this.emailIsTaken = state)
    );

    this.showPassword$.subscribe();
  }

  //#region  core functions

  get formStatus() {
    return this.registerForm?.valid;
  }

  createRegisterForm() {
     this.registerForm = this.FB.group({
       firstName: ['', [Validators.required]],
       lastName: ['', [Validators.required]],
       email: ['', [Validators.email, Validators.required]],
       passwordGroup: this.FB.group(
         {
           password: ['', [Validators.required, Validators.minLength(8)]],
           repeatePassword: ['', [Validators.required]],
         },
         {
           validators: inputMatcher(
             InputTypes.Password,
             InputTypes.RepeatePassword
           ),
         }
       ),
       role: ['', Validators.required],
     });
  }

  handleErrorMessages() {
    //prettier-ignore
    this.emailErrorMessage$ = this.registerService.handleEmailErrors(this.registerForm);
    //prettier-ignore
    this.passwordErrorMessage$ = this.registerService.handlePasswordErrors(InputTypes.Password, this.registerForm),
      //prettier-ignore
    this.passwordGroupErrorMessage$ = this.registerService.handlePasswordErrors(InputTypes.PasswordGroup, this.registerForm);
  }

  getUserData() {
    const userType =
      this.localGetInput(InputTypes.Role)?.value == Roles.Doctor
        ? Roles.Doctor
        : Roles.Patient;
 
    
    const userData = {
      entityNo: userType,
      firstName: this.localGetInput(InputTypes.Firstname)?.value,
      lastName: this.localGetInput(InputTypes.Lastname)?.value,
    };

    return JSON.stringify(userData);
  }

  onSubmit() {
    if (this.formStatus) {
      this.authService
        .register(
          this.localGetInput(InputTypes.Email)?.value,
          this.localGetInput(InputTypes.Password)?.value,
          this.getUserData()
        )
        .subscribe();
    }
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

  //#region  Helpers
  passLettersOnly = lettersOnly;

  getStatus(input: string) {
    const currentInput = this.localGetInput(input);
    return currentInput?.errors && currentInput?.touched ? 'danger' : 'basic';
  }

  localGetInput(input: string) {
    return this.registerService.getInput(input, this.registerForm);
  }
  //#endregion
}
