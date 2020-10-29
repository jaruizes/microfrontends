import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private authConfig: AuthConfig;

  constructor(private oauthService: OAuthService, private config: ConfigService) { }

  init() {
    const authConfig: AuthConfig = {
      issuer: 'https://cognito-idp.eu-west-2.amazonaws.com/' + this.config.get('pool-id'),
      redirectUri: window.location.origin + "/login",
      clientId: this.config.get('client-id'),
      scope: 'openid profile email aws.cognito.signin.user.admin',
      responseType: 'code',
      showDebugInformation: true,
      logoutUrl: 'https://tf-microfrontends.auth.eu-west-2.amazoncognito.com/logout?logout_uri=' + window.location.origin + "/logout" + '&client_id=' + this.config.get('client-id'),
      postLogoutRedirectUri: window.location.origin + "/home",
      strictDiscoveryDocumentValidation: false,
      userinfoEndpoint: 'https://tf-microfrontends.auth.eu-west-2.amazoncognito.com/oauth2/userInfo'
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.authConfig = authConfig;

    console.log('------------------');
    console.log(authConfig);
    console.log('------------------');
  }

  isAuthenticated() {
    const accessToken = sessionStorage.getItem('access_token');
    return accessToken;
  }

  login() {
    this.oauthService.initCodeFlow();
  }

  logout() {
    this.oauthService.logOut();
  }

  getLogoutURL() {
    return this.authConfig.logoutUrl;
  }
}
