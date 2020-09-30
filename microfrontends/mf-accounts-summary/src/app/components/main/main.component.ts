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
    /**
     * Microfrontend specified properties
     */
    @Input()
    public locale: string;

    @Input()
    public channel: string = 'microfrontends';

    public elementUrl: string = './web-components/account-overview/account-overview.esm.js';
    public accounts: Account[];
    public totalBalance: number;

    /**
     * This is the broadcastChannel used by an instance of this microfrontend
     */
    private broadcastChannel;

    constructor(private accountsService: AccountsService, private ngZone: NgZone, private translate: TranslateService){
        this.totalBalance = 0;
        this.initI18n();
    }

    ngOnInit() {
        this.accountsService.getAccounts().subscribe((accounts) => {
            accounts.forEach((account) => this.totalBalance = this.totalBalance + account.amount);
            this.accounts = accounts;
        });

        this.initBroadcastChannel();
    }

    /**
     * Handle messages received by the broadcast channel
     * @param message
     */
    handleMessage(message) {
        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
        }
    }

    /**
     * Sends a message using the broadcastChannel
     * @param accountId
     */
    handleAccountClick(accountId) {
        this.broadcastChannel.postMessage({
            cmd: 'accountClick',
            payload: {
                accountId: accountId
            }
        });
    }

    /**
     * Initializes the broadcastChannel object used by this microfrontend
     * The channel is specified by the property @channel
     */
    private initBroadcastChannel() {
        this.broadcastChannel = new BroadcastChannel(this.channel);
        this.broadcastChannel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleMessage(message.data);
            });
        };
    }

    /**
     * Initializes translate service
     */
    private initI18n() {
        this.locale = 'en';
        this.translate.setDefaultLang(this.locale);
        this.translate.use(this.locale);
    }
}
