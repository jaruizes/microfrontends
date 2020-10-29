import { Component, NgZone, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { LocaleService } from '../../services/locale/locale.service';
import { SecurityService } from '../../../../services/security/security.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {

  public logoutURL;

  constructor(private oauthService: OAuthService,
              private localeService: LocaleService,
              private securityService: SecurityService,
              private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.logoutURL = this.securityService.getLogoutURL();
  }

  changeLocale(locale) {
    console.log('Change locale: ' + locale);
    this.localeService.changeLocale(locale);
    this.translate.use(locale);
  }

  closeSession() {
    this.securityService.logout();
  }

}
