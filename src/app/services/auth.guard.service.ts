import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
    }
    return this.authService.isLoggedIn;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route, state);
  }
}
