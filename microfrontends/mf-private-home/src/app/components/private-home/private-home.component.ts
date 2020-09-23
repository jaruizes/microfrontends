import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './private-home.component.html',
    styleUrls: [
      '../../../../node_modules/bootstrap/dist/css/bootstrap.css',
      './private-home.component.scss'
    ]
})
export class PrivateHomeComponent implements OnInit {
    private channel;

    constructor(private router: Router) {
        this.channel = new BroadcastChannel("mfs-channel");
    }

    ngOnInit() {
        this.router.navigate([{ outlets: { private: [ 'globalposition' ] }}]);
    }

    login() {
        console.log("-----------");
        this.channel.postMessage({ type: "login" });
    }

}
