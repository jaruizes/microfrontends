import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customersapp';

  private authConfig: AuthConfig = {
    issuer: 'http://localhost:8080/auth/realms/microfrontends',
    redirectUri: window.location.origin + "/private",
    clientId: 'customers-app',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    disableAtHashCheck: true,
    showDebugInformation: true
  };

  constructor(private oauthService: OAuthService) {
    console.log('Construction init...........');
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log('Construction end...........');
  }


}
