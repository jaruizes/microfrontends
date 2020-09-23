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

    public accounts: Account[];
    public totalBalance: number;

    private channel;

    constructor(private accountsService: AccountsService) {
        this.totalBalance = 0;
        this.channel = new BroadcastChannel("mfs-channel");
    }

    ngOnInit() {
        this.accountsService.getCards().subscribe((accounts) => {
            accounts.forEach((account) => this.totalBalance = this.totalBalance + account.amount);
            this.accounts = accounts;
        });
    }

    login() {
        console.log("-----------");
        this.channel.postMessage({ type: "login" });
    }

}
