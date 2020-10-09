import { Component, HostListener, Input, NgZone, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MovementsService } from '../../services/movements/movements.service';
import { Movement } from '../../model/movement';
import { ItemTable } from '../../model/item-table';
import { ConfigService } from '../../services/config/config.service';
import { UserService } from '../../services/user/user.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-global-position',
  templateUrl: './global-position.component.html',
  styleUrls: ['./global-position.component.css']
})
export class GlobalPositionComponent implements OnInit {
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

    @Input()
    public mode: number = 0;

    public _customer: string;

    /**
     * This is the parentChannel used by an instance of this microfrontend
     */
    private parentChannel;

    /**
     * This is the general channel used by manage events in broadcast
     */
    private generalChannel;

    private accountsChannel;
    private cardsChannel;


    public urlCardsSummary;
    public urlAccountsSummary;
    public urlShortcuts;
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

    public urlMovements;
    public movementsItems = [];
    public showMovements = false;

    public urlBalanceOverview;
    public user: User;

    constructor(private translate: TranslateService,
                private ngZone: NgZone,
                private movementsService: MovementsService,
                private configService: ConfigService,
                private userService: UserService) {
        this.userService.getUser().subscribe((user) => {
            this.user = user;
            this.initURLs();
            this.initI18n();
        });
        console.log('Customer (const): ' + this.customer);
    }

    ngOnInit(): void {
        console.log('Customer (ngOnInit): ' + this.customer);
        this.initBroadcastChannel();
        //this.nickName = this.userService.getUser().nickname;
    }

    handleParentMessage(message) {
        console.log('[mf-global-position] Received microfrontend message: ' + message.cmd);

        if (message.cmd === 'xxxx') {
            this.parentChannel.postMessage(message);
        }
    }

    handleAccountsMessages(message) {
        console.log('[mf-global-position: accounts] Received microfrontend message: ' + message.cmd);

        if (message.cmd === 'accountClick') {
            this.parentChannel.postMessage(message);
        }
    }

    handleCardsMessages(message) {
        console.log('[mf-global-position: cards] Received microfrontend message: ' + message.cmd);

        if (message.cmd === 'cardClick') {
            this.parentChannel.postMessage(message);
        }
    }

    handleApplicationMessage(message) {
        console.log('[mf-global-position] Received application message: ' + message.cmd);

        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
        }
    }

    /**
     * Method called when a row of "last movements" component is clicked
     * @param item
     */
    handleItemClick(item) {
        console.log(item.detail);
    }

    handleShortcutClick(e) {
        console.log(e);
    }

    getData() {
        this.showMovements = false;
        this.movementsService.getMovements(this.customer).subscribe((movements: Movement[]) => {
            movements.forEach((movement) => {
                const item: ItemTable = {
                    header: movement.date,
                    title1: movement.subject,
                    subtitle1: movement.account,
                    title2: movement.amount + ' €'
                };

                this.movementsItems.push(item);
            });
            this.showMovements = true;
        });
    }

    /**
     * Initializes the broadcastChannel object used by this microfrontend
     * The channel is specified by the property @channel
     */
    private initBroadcastChannel() {
        this.generalChannel = new BroadcastChannel('microfrontends');
        this.generalChannel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleApplicationMessage(message.data);
            });
        };

        this.accountsChannel = new BroadcastChannel('mf-global-position-accounts');
        this.accountsChannel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleAccountsMessages(message.data);
            });
        };

        this.cardsChannel = new BroadcastChannel('mf-global-position-cards');
        this.cardsChannel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleCardsMessages(message.data);
            });
        };

        if (this.channel) {
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

    private initURLs() {
        this.urlAccountsSummary = this.configService.getMicrofrontendURL('accounts-summary');
        this.urlCardsSummary = this.configService.getMicrofrontendURL('cards-summary');
        this.urlBalanceOverview = this.configService.getMicrofrontendURL('balance-overview');
        this.urlShortcuts = this.configService.getWebComponentURL('shortcuts');
        this.urlMovements = this.configService.getWebComponentURL('items-table');
    }

}
