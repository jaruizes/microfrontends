import { Component, NgZone, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { LocaleService } from '../../services/locale/locale.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  public logoutURL = 'https://microfrontends.auth.eu-west-2.amazoncognito.com/logout?client_id=63h0d80c0spg132td0ipksgcv0&redirect_uri=app_client_name:' + encodeURIComponent('http://localhost:4200/signin-oidc') + '&response_type=code';
  //public logoutURL = 'https://microfrontends.auth.eu-west-2.amazoncognito.com/logout?client_id=63h0d80c0spg132td0ipksgcv0&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http://localhost:4200/';
  constructor(private oauthService: OAuthService,
              private localeService: LocaleService,
              private userService: UserService) {
    console.log('------------------------');
    this.userService.init();
  }

  ngOnInit(): void {
    console.log(this.oauthService.getAccessToken());
    console.log(this.oauthService.getIdToken());
  }

  changeLocale(locale) {
    console.log('Change locale: ' + locale);
    this.localeService.changeLocale(locale);
  }

  closeSession() {
    const logoutURL = 'https://microfrontends.auth.eu-west-2.amazoncognito.com/logout?client_id=63h0d80c0spg132td0ipksgcv0&response_type=code&scope=aws.cognito.signin.user.admin+email+openid+profile&redirect_uri=http://localhost:4200/private';
    /*this.http.get(this.logoutURL).subscribe((res) => {
      console.log('!!!! Logout !!!!');
      sessionStorage.clear();
    });*/

    //sessionStorage.clear();
    //window.open(logoutURL, '_self');
    //this.oauthService.logOut();
  }

}
