import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, tap } from 'rxjs';

import { Router } from '@angular/router';
import { RegisterErrors } from '../modules/auth/components/register/register.models';
import { SharedRoutes } from '../modules/shared/models/routes.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _currentUser: any;
  constructor(public afAuth: AngularFireAuth, public router: Router) {
    this.afAuth.authState.subscribe(user => {
      this._currentUser = user;
    });
  }

  get currentUser() {
    return this._currentUser ? JSON.parse(this._currentUser.displayName) : '';
  }

  get role() {
    return this.currentUser.entityNo;
  }

  get isLoggedIn() {
    return from(this.afAuth.authState).pipe(map(user => !!user));
  }

  signIn(email: string, password: string) {
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      tap(() => this.router.navigate([SharedRoutes.Dashboard]))
    );
  }

  register(email: string, password: string, userData: string) {
    return from(
      this.afAuth.createUserWithEmailAndPassword(email, password).then(u =>
        u.user?.updateProfile({
          displayName: userData,
        })
      )
    ).pipe(tap(() => this.router.navigate([SharedRoutes.Dashboard])));
  }

  checkIfEmailIsAlreadyTaken(email: string) {
    return from(this.afAuth.fetchSignInMethodsForEmail(email)).pipe(
      map(array => (array.length > 0 ? RegisterErrors.EmailIsTaken : ''))
    );
  }

  signOut() {
    return from(this.afAuth.signOut()).pipe(tap(() => this.router.navigate([''])));
  }
}
