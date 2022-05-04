import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { SharedRoutes } from '../modules/shared/models/routes.model';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AnonymGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isLoggedIn.pipe(
      map(loggedInState => {
        if (loggedInState) {
          this.router.navigate([SharedRoutes.Dashboard]);
        }
        return !loggedInState;
      })
    );
  }
}
