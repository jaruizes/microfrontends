import { Component, HostListener, Input, NgZone, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-global-position',
  templateUrl: './global-position.component.html',
  styleUrls: ['./global-position.component.css']
})
export class GlobalPositionComponent implements OnInit {
    @Input()
    public locale: string;

    public urlCardsSummary = 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/mf-cards-summary/main.js';
    public urlAccountsSummary = '/mf-accounts-summary/main.js';
    public urlShortcuts = '/web-components/wc-shortcuts/wc-shortcuts.bundled.js';
    public shortcuts = [
    {
      icon: 'unfold_less',
      text: 'Internal transfer'
    },
    {
      icon: 'payments',
      text: 'Transfer'
    },
    {
      icon: 'person',
      text: 'Profile'
    },
    {
      icon: 'groups',
      text: 'Bizum'
    }
    ];

    public urlMovements = 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/items-table/items-table.esm.js';
    public movements = [
      {
          "header": "01/01/2020 10:00",
          "title1": "MERCADONA",
          "subtitle1": "Cuenta corriente",
          "title2": "645 €",
          "subtitle2": "1028 €"
      },
      {
          "header": "01/01/2020 10:00",
          "title1": "MERCADONA",
          "subtitle1": "Cuenta corriente",
          "title2": "645 €",
          "subtitle2": "1028 €"
      },
      {
          "header": "01/01/2020 10:00",
          "title1": "MERCADONA",
          "subtitle1": "Cuenta corriente",
          "title2": "645 €",
          "subtitle2": "1028 €"
      },
      {
          "header": "01/01/2020 10:00",
          "title1": "MERCADORNA",
          "subtitle1": "Cuenta corriente",
          "title2": "645 €",
          "subtitle2": "1028 €"
      },
      {
          "header": "01/01/2020 10:00",
          "title1": "MERCADONA",
          "subtitle1": "Cuenta corriente",
          "title2": "645 €",
          "subtitle2": "1028 €"
      }
    ];

    @HostListener('itemClick', ['$event'])
    handleItemClick(item) {
        console.log('Angular!!');
        console.log(item.detail);
    }

    constructor(private translate: TranslateService, private ngZone: NgZone) {
      const channel = new BroadcastChannel("mfs-channel");
      channel.onmessage = (message) => {
          this.ngZone.run(() => {
              this.handleMessage(message.data);
          });
      };

      this.locale = 'en';
      translate.setDefaultLang(this.locale);
      translate.use(this.locale);
    }

    ngOnInit(): void {
    }

    handleMessage(message) {
        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
        }
    }

}
