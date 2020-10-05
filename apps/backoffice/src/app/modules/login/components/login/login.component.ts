import { Component, OnInit } from '@angular/core';
import { AuthConfig, JwksValidationHandler, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private oauthService: OAuthService) {
  }

  ngOnInit() {
    console.log('ngOnInit init...........');
    this.oauthService.initLoginFlow();
    console.log('ngOnInit end...........');
  }

}
