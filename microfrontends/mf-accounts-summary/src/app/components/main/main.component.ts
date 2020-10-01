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
    public channel: string;

    public elementUrl: string = './web-components/account-overview/account-overview.esm.js';
    public accounts: Account[];
    public totalBalance: number;

    /**
     * This is the parentChannel used by an instance of this microfrontend
     */
    private parentChannel;

    /**
     * This is the general channel used by manage events in broadcast
     */
    private generalChannel;

    constructor(private accountsService: AccountsService, private ngZone: NgZone, private translate: TranslateService){
        console.log('[mf-accounts-summary] starting....');
        this.totalBalance = 0;
        this.initI18n();
    }

    ngOnInit() {
        console.log('[mf-accounts-summary] initializing....');
        this.accountsService.getAccounts().subscribe((accounts: Account[]) => {
            accounts.forEach((account) => this.totalBalance = this.totalBalance + account.amount);
            this.accounts = accounts;
        });

        this.initBroadcastChannels();
        console.log('[mf-accounts-summary] initialized....');
    }

    /**
     * Handle messages received by the parent channel
     * @param message
     */
    handleParentMessage(message) {
        console.log('[mf-accounts-summary] Message received from parent: ' + message.cmd);
        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
        }
    }

    /**
     * Handle messages received by the general broadcast channel
     * @param message
     */
    handleGeneralMessages(message) {
        console.log('[mf-accounts-summary] Message received from general channel: ' + message.cmd);
        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
        }
    }

    /**
     * Sends a message using the parentChannel
     * @param accountId
     */
    handleAccountClick(accountId) {
        this.parentChannel.postMessage({
            cmd: 'accountClick',
            payload: {
                id: accountId
            }
        });
    }

    /**
     * Initializes the channels used by this microfrontend
     * The parent channel is specified by the property @channel
     */
    private initBroadcastChannels() {
        console.log('[mf-accounts-summary] Initializing general channel....');
        this.generalChannel = new BroadcastChannel('microfrontends');
        this.generalChannel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleGeneralMessages(message.data);
            });
        };

        if (this.channel) {
            console.log('[mf-accounts-summary] Initializing parent channel: ' + this.channel);
            this.parentChannel = new BroadcastChannel(this.channel);
            this.parentChannel.onmessage = (message) => {
                this.ngZone.run(() => {
                    this.handleParentMessage(message.data);
                });
            };
        }
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
