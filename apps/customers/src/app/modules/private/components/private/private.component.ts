import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { LocaleService } from '../../services/locale/locale.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  constructor(private oauthService: OAuthService, private localeService: LocaleService) { }

  ngOnInit(): void {
    console.log(this.oauthService.getAccessToken());
    console.log(this.oauthService.getIdToken());
  }

  changeLocale(locale) {
    console.log('Change locale: ' + locale);
    this.localeService.changeLocale(locale);
  }

}
