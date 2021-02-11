import { Injectable } from '@angular/core';
import { OAuthService, UserInfo } from 'angular-oauth2-oidc';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userInfo: UserInfo;
  constructor(private oauthService: OAuthService) {}

  init() { }

  getUserInfo(): Observable<UserInfo> {
    if (this.userInfo) {
      return of(this.userInfo);
    }

    return fromPromise(this.oauthService.loadUserProfile()).pipe(map(userInfo => {
        this.userInfo = userInfo;
        return userInfo;
    }));
  }


}
