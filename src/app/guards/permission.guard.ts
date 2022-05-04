import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { SharedRoutes } from '../modules/shared/models/routes.model';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const condition = this.authService.role === route.data?.['role'];
    if (!condition) {
      this.router.navigate([SharedRoutes.Dashboard]);
    }
    return condition;
  }
}
