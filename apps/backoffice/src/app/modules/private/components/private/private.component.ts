import { Component, OnInit } from '@angular/core';
import { LocaleService } from '../../services/locale/locale.service';
import { TranslateService } from '@ngx-translate/core';
import { SecurityService } from '../../../../services/security/security.service';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  private locale;
  public logoutURL;

  constructor(private securityService: SecurityService, private localeService: LocaleService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.logoutURL = this.securityService.getLogoutURL();
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
