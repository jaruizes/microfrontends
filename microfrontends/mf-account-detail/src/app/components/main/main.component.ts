import { Component, Input, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountsService } from '../../services/accounts/accounts.service';
import { Account } from '../../model/account';
import { TranslateService } from '@ngx-translate/core';
import { ItemTable } from '../../model/item-table';
import { ConfigService } from '../../services/config/config.service';

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

    @Input()
    public channel: string;

    @Input()
    get account(): string { return this._account; }
    set account(card: string) {
        this._account = card;
        this.getAccountData();
    }
    private _account = '';
    public show = false;

    public accountData: Account;
    public movements: ItemTable[] = [];
    public urlItemsTable;

    /**
     * This is the parentChannel used by an instance of this microfrontend
     */
    private parentChannel;

    /**
     * This is the general channel used by manage events in broadcast
     */
    private generalChannel;

    constructor(private accountsService: AccountsService,
                private ngZone: NgZone,
                private translate: TranslateService,
                private configService: ConfigService){
        console.log('[mf-account-detail] starting....');
        this.urlItemsTable = this.configService.getWebComponentURL('items-table');
        this.initI18n();
    }

    ngOnInit() {
        console.log('[mf-account-detail] initializing....');
        this.initBroadcastChannels();
        console.log('[mf-account-detail] initialized....');
    }

    /**
     * Handle messages received by the parent channel
     * @param message
     */
    handleParentMessage(message) {
        console.log('[mf-account-detail] Message received from parent: ' + message.cmd);
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
        console.log('[mf-account-detail] Message received from general channel: ' + message.cmd);
        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
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

    private getAccountData() {
        this.show = false;
        this.accountsService.getAccount(this._account).subscribe((account: Account) => {
            this.accountData = account;
            account.movements.forEach((movement) => {
                const item: ItemTable = {
                    header: movement.date,
                    title1: movement.subject,
                    subtitle1: movement.account,
                    title2: movement.amount + ' €'
                };
                this.movements.push(item);
            });

            this.show = true;
        });
    }

    /**
     * Initializes the channels used by this microfrontend
     * The parent channel is specified by the property @channel
     */
    private initBroadcastChannels() {
        console.log('[mf-account-detail] Initializing general channel....');
        this.generalChannel = new BroadcastChannel('microfrontends');
        this.generalChannel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleGeneralMessages(message.data);
            });
        };

        if (this.channel) {
            console.log('[mf-account-detail] Initializing parent channel: ' + this.channel);
            this.parentChannel = new BroadcastChannel(this.channel);
            this.parentChannel.onmessage = (message) => {
                this.ngZone.run(() => {
                    this.handleParentMessage(message.data);
                });
            };
        }
    }
}
