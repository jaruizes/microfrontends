import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { ConfigService } from '../config/config.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private authConfig: AuthConfig;

  constructor(private oauthService: OAuthService, private config: ConfigService) { }

  init() {
    const authConfig: AuthConfig = {
      issuer: environment.config.security.issuer,
      redirectUri: window.location.origin + "/login",
      clientId: environment.config.security.clientid,
      scope: environment.config.security.scope,
      responseType: 'code',
      showDebugInformation: true,
      logoutUrl: environment.config.security.logoutUrl,
      postLogoutRedirectUri: window.location.origin + "/home",
      strictDiscoveryDocumentValidation: false,
      userinfoEndpoint: environment.config.security.userinfoEndpoint
    };

    this.oauthService.configure(authConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.authConfig = authConfig;
  }

  isAuthenticated() {
    const accessToken = sessionStorage.getItem(environment.config.security.token);
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
