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
    issuer: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_L3ZWLjOCy',
    redirectUri: window.location.origin + "/private",
    clientId: '63h0d80c0spg132td0ipksgcv0',
    scope: 'openid profile email aws.cognito.signin.user.admin',
    responseType: 'code',
    showDebugInformation: true,
    strictDiscoveryDocumentValidation: false
  };

  constructor(private oauthService: OAuthService) {
    console.log('Construction init...........');
    this.oauthService.configure(this.authConfig);
    //this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    console.log('Construction end...........');
  }


}
