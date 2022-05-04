import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasswordUIService {
  //prettier-ignore
  private showPassword: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showPassword$ = this.showPassword.asObservable();

  constructor() {}

  //#region Password UI
  getInputType() {
    return this.showPassword.getValue() ? 'text' : 'password';
  }

  getIconState() {
    return this.showPassword.getValue() ? 'eye-outline' : 'eye-off-2-outline';
  }
  getPasswordState() {
    return this.showPassword.getValue() ? 'hide password' : 'show password';
  }

  toggleShowPassword() {
    this.showPassword.next(!this.showPassword.getValue());
  }
  //#endregion
}
