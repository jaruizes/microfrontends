import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Card } from '../model/card';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [
      '../../../../node_modules/bootstrap/dist/css/bootstrap.css',
      './main.component.scss'
    ]
})
export class MainComponent implements OnInit {
    public elementUrl: string = 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/credit-card-resume/credit-card-resume.esm.js';

    @Input()
    public title;

    public cards: Card[];

    focus: any;

    private channel;

    constructor(private cardsService: CardsService) {
        this.channel = new BroadcastChannel("mfs-channel");
    }

    ngOnInit() {
        if (!this.title) {
            this.title = 'Welcome to the future'
        }

        this.cardsService.getCards().subscribe((cards) => this.cards = cards);
    }

    login() {
        console.log("-----------");
        this.channel.postMessage({ type: "login" });
    }

}
