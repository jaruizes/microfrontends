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

    public elementUrl: string = 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/account-overview/account-overview.esm.js';
    public accounts: Account[];
    public totalBalance: number;

    private channel;

    constructor(private accountsService: AccountsService, private ngZone: NgZone, private translate: TranslateService){
        this.totalBalance = 0;
        this.channel = new BroadcastChannel("mfs-channel");
        this.channel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleMessage(message.data);
            });
        };

        this.locale = 'en';
        translate.setDefaultLang(this.locale);
        translate.use(this.locale);
    }

    ngOnInit() {
        this.accountsService.getAccounts().subscribe((accounts) => {
            accounts.forEach((account) => this.totalBalance = this.totalBalance + account.amount);
            this.accounts = accounts;
        });
    }

    handleMessage(message) {
        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
        }
    }
}
