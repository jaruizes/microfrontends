import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { SecurityService } from '../services/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class PrivateGuard implements CanActivate {
  constructor(private securityService: SecurityService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (!this.securityService.isAuthenticated()) {
      console.log('User not authenticated');
      this.securityService.logout();
      return false;
    }

    return true;
  }

}
