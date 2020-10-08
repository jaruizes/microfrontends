import { Injectable } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInfo: UserInfo;
  constructor(private oauthService: OAuthService) {}

  init() {
    if (!this.userInfo && this.oauthService.getIdToken()) {
      this.oauthService.loadUserProfile().then((userInfo => {
        this.userInfo = userInfo;
        console.log('User initialized');
        console.log(userInfo);
      }));
    }
  }

  getUserInfo() {
    return this.userInfo;
  }


}
