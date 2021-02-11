import { Component, Input, NgZone, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CardService } from '../../services/card/card.service';
import { Card } from '../../model/card';
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
    get card(): string { return this._card; }
    set card(card: string) {
        this._card = card;
        this.getCardData();
    }
    private _card = '';


    public cardInfo: Card;
    public movements: ItemTable[] = [];

    /**
     * This is the parentChannel used by an instance of this microfrontend
     */
    private parentChannel;

    /**
     * This is the general channel used by manage events in broadcast
     */
    private generalChannel;

    public urlCard; //= '/webcomponents/credit-card/v1/credit-card.esm.js';
    public urlMovements; // = '/webcomponents/items-table/v1/items-table.esm.js';

    constructor(private cardService: CardService,
                private ngZone: NgZone,
                private translate: TranslateService,
                private configService: ConfigService){
        console.log('[mf-card-detail] starting....');
        this.urlCard = this.configService.getWebComponentURL('card');
        this.urlMovements = this.configService.getWebComponentURL('items-table');
        this.initI18n();
    }

    ngOnInit() {
        console.log('[mf-card-detail] initializing....');
        console.log('[mf-card-detail] Card Id: ' + this._card);


        this.initBroadcastChannels();
        console.log('[mf-card-detail] initialized....');
    }

    /**
     * Handle messages received by the parent channel
     * @param message
     */
    handleParentMessage(message) {
        console.log('[mf-card-detail] Message received from parent: ' + message.cmd);
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
        console.log('[mf-card-detail] Message received from general channel: ' + message.cmd);
        if (message.cmd === 'changeLocale') {
            this.locale = message.payload.locale;
            this.translate.use(this.locale);
        }
    }

    private getCardData() {
        console.log('[mf-card-detail] Getting card data....');
        this.cardService.getCard(this._card).subscribe((card: Card) => {
            console.log(card);
            this.cardInfo = card;
            card.movements.forEach((movement) => {
                const item: ItemTable = {
                    header: movement.date,
                    title1: movement.subject,
                    subtitle1: movement.account,
                    title2: movement.amount + ' €'
                };
                this.movements.push(item);
            });
            console.log('[mf-card-detail] Data set....');
        });
    }

    /**
     * Initializes translate service
     */
    private initI18n() {
        this.locale = 'en';
        this.translate.setDefaultLang(this.locale);
        this.translate.use(this.locale);
    }


    /**
     * Initializes the channels used by this microfrontend
     * The parent channel is specified by the property @channel
     */
    private initBroadcastChannels() {
        console.log('[mf-card-detail] Initializing general channel....');
        this.generalChannel = new BroadcastChannel('microfrontends');
        this.generalChannel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleGeneralMessages(message.data);
            });
        };

        if (this.channel) {
            console.log('[mf-card-detail] Initializing parent channel: ' + this.channel);
            this.parentChannel = new BroadcastChannel(this.channel);
            this.parentChannel.onmessage = (message) => {
                this.ngZone.run(() => {
                    this.handleParentMessage(message.data);
                });
            };
        }
    }

    /**
     * Card number formatter
     */
    public formatCardNumber(number): string {
        return number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    }
}
