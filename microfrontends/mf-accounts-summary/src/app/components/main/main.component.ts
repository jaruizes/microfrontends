import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { Account } from '../model/account';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [
      '../../../../node_modules/bootstrap/dist/css/bootstrap.css',
      './main.component.scss'
    ]
})
export class MainComponent implements OnInit {
    public elementUrl: string = 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/account-overview/account-overview.esm.js';

    @Input()
    public title;

    public accounts: Account[];

    private channel;

    constructor(private accountsService: AccountsService) {
        this.channel = new BroadcastChannel("mfs-channel");
    }

    ngOnInit() {
        if (!this.title) {
            this.title = 'Welcome to the future'
        }

        this.accountsService.getCards().subscribe((accounts) => {
            console.log(accounts);
            this.accounts = accounts;
            console.log('lastmovement: ' + this.accounts[0].lastmovement);
            console.log('newmovements: ' + this.accounts[0].newmovements);

            console.log('lastmovement: ' + this.accounts[1].lastmovement);
            console.log('newmovements: ' + this.accounts[1].newmovements);
        });
    }

    login() {
        console.log("-----------");
        this.channel.postMessage({ type: "login" });
    }

}
