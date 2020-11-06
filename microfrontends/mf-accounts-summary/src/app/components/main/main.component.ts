import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    NgZone,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { AccountsService } from '../../services/accounts/accounts.service';
import { Account } from '../../model/account';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../services/config/config.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [
      'main.component.scss'
    ],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class MainComponent implements OnInit, AfterViewInit {
    /**
     * Microfrontend specified properties
     */
    @Input()
    public locale: string;

    @Input()
    public channel: string;

    @Input()
    get customer(): string { return this._customer; }
    set customer(customer: string) {
        this._customer = customer;
        this.getData();
    }

    public _customer: string;

    public show = false;

    public elementUrl: string;
    public accounts: Account[];
    public totalBalance: number;
    public displayOverlay = 'none';

    /**
     * This is the parentChannel used by an instance of this microfrontend
     */
    private parentChannel;

    /**
     * This is the general channel used by manage events in broadcast
     */
    private generalChannel;

    @ViewChild('contentCard', {read: ElementRef, static:false}) elementView: ElementRef;

    public overlayHeight: number;
    public overlayWidth: number;

    constructor(private accountsService: AccountsService,
                private ngZone: NgZone,
                private translate: TranslateService,
                private configService: ConfigService){
        console.log('[mf-accounts-summary] starting....');
        this.elementUrl = this.configService.getWebComponentURL('account-overview');
        this.totalBalance = 0;
    }

    ngAfterViewInit() {

    }

    ngOnInit() {
        console.log('[mf-accounts-summary] initializing....');
        this.initBroadcastChannels();
        this.initI18n();
        console.log('[mf-accounts-summary] initialized....');
    }

    /**
     * Sends a message using the parentChannel
     * @param accountId
     */
    handleAccountClick(accountId) {
        this.parentChannel.postMessage({
            cmd: 'accountClick',
            payload: {
                id: accountId,
                detail: this.accounts.filter(account => account.id = accountId)[0]
            }
        });
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

        if (message.cmd === 'showMFDetail') {
            this.overlayHeight = this.elementView.nativeElement.offsetHeight;
            this.overlayWidth = this.elementView.nativeElement.clientWidth;
            this.displayOverlay = 'block';
        }

        if (message.cmd === 'hideMFDetail') {
            this.displayOverlay = 'none';
        }
    }

    private getData() {
        this.show = false;
        this.accountsService.getAccounts(this.customer).subscribe((accounts: Account[]) => {
            accounts.forEach((account) => this.totalBalance = this.totalBalance + account.amount);
            this.accounts = accounts;
            this.show = true;
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
        let locale = this.locale ? this.locale : 'en';
        this.translate.setDefaultLang(locale);
        this.translate.use(locale);
    }
}
