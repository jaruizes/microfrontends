import { Component, Input, NgZone, OnInit, ViewEncapsulation } from '@angular/core';
import { CardsService } from '../services/cards/cards.service';
import { Card } from '../model/card';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../services/config/config.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [
      './main.component.scss'
    ],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class MainComponent implements OnInit {
    /**
     * Microfrontend specified properties
     */
    @Input()
    get locale(): string { return this._locale; }
    set locale(locale: string) {
        console.log('Locale: ' + locale);
        this._locale = locale;
        this.changeLocale(locale);
    }
    public _locale: string;

    @Input()
    public channel: string;

    @Input()
    get customer(): string { return this._customer; }
    set customer(customer: string) {
        this._customer = customer;
        this.getData();
    }

    public _customer: string;

    public show;

    public elementUrl: string;
    public cards: Card[];

    /**
     * This is the parentChannel used by an instance of this microfrontend
     */
    private parentChannel;

    /**
     * This is the general channel used by manage events in broadcast
     */
    private generalChannel;

    constructor(private cardsService: CardsService,
                private ngZone: NgZone,
                private translate: TranslateService,
                private configService: ConfigService){
        console.log('[mf-cards-summary] starting....');
        this.show = false;
        this.elementUrl = this.configService.getWebComponentURL('card-overview');
        this.initI18n();
    }

    ngOnInit() {
        console.log('[mf-cards-summary] initializing....');

        this.initBroadcastChannels();

        console.log('[mf-cards-summary] initialized....');
    }

    /**
     * Handle messages received by the parent channel
     * @param message
     */
    handleParentMessage(message) {
        console.log('[mf-cards-summary] Message received from parent: ' + message.cmd);
        if (message.cmd === 'changeLocale') {
            this.changeLocale(message.payload.locale);
        }
    }

    /**
     * Handle messages received by the general broadcast channel
     * @param message
     */
    handleGeneralMessages(message) {
        console.log('[mf-cards-summary] Message received from general channel: ' + message.cmd);
        if (message.cmd === 'changeLocale') {
            this.changeLocale(message.payload.locale);
        }
    }

    /**
     * Sends a message using the parentChannel
     * @param cardId
     */
    handleCardClick(cardId) {
        this.parentChannel.postMessage({
            cmd: 'cardClick',
            payload: {
                id: cardId
            }
        });
    }

    private getData() {
        this.show = false;
        this.cardsService.getCards(this.customer).subscribe((cards) => {
            this.cards = cards;
            this.show = true;
        });
    }

    private changeLocale(locale) {
        this._locale = locale;
        this.translate.getTranslation(locale).subscribe((obj) => {
            this.translate.setTranslation(locale, obj);
            this.translate.use(locale);
        });
    }

    /**
     * Initializes the channels used by this microfrontend
     * The parent channel is specified by the property @channel
     */
    private initBroadcastChannels() {
        console.log('[mf-cards-summary] Initializing general channel....');
        this.generalChannel = new BroadcastChannel('microfrontends');
        this.generalChannel.onmessage = (message) => {
            this.ngZone.run(() => {
                this.handleGeneralMessages(message.data);
            });
        };


        if (this.channel) {
            console.log('[mf-cards-summary] Initializing parent channel: ' + this.channel);
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
        //this._locale = 'en';
        this.translate.setDefaultLang(this._locale);
        this.translate.use(this._locale);
    }

}
