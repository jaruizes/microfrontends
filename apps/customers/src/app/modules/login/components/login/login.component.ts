import { Component, OnInit } from '@angular/core';
import { AuthConfig, JwksValidationHandler, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private oauthService: OAuthService, private router: Router) {
  }

  ngOnInit() {
    console.log('ngOnInit init...........');
    this.oauthService.initCodeFlow();
    //this.router.navigate(['/private']);
    console.log('ngOnInit end...........');
  }

}
