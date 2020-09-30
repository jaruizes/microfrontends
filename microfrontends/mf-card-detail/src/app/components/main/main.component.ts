import { Component, Input, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountsService } from '../../services/accounts.service';
import { Account } from '../../model/account';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [
      'main.component.scss'
    ],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class MainComponent implements OnInit {
    @Input()
    public locale: string;

    public urlCard = 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/credit-card/credit-card.esm.js';
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

    constructor(private accountsService: AccountsService, private ngZone: NgZone, private translate: TranslateService){
        this.locale = 'en';
        translate.setDefaultLang(this.locale);
        translate.use(this.locale);
    }

    ngOnInit() {
        /*this.accountsService.getAccounts().subscribe((accounts) => {
            accounts.forEach((account) => this.totalBalance = this.totalBalance + account.amount);
            this.accounts = accounts;
        });*/
    }

    handleMessage(message) {
        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
        }
    }
}
