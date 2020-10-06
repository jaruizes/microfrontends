import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { LocaleService } from '../../services/locale/locale.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  private locale;

  constructor(private oauthService: OAuthService, private localeService: LocaleService, private translate: TranslateService) { }

  ngOnInit(): void {
    console.log(this.oauthService.getAccessToken());
    console.log(this.oauthService.getIdToken());
  }

  changeLocale(locale) {
    console.log('Change locale: ' + locale);
    this.localeService.changeLocale(locale);
    this.locale = locale;
    this.translate.currentLang = locale;
    this.translate.use(locale);
    this.translate.getTranslation(locale).subscribe((obj) => {
      this.translate.setTranslation(locale, obj);
    });

  }

}
