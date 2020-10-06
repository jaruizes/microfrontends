import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: [
      '../../../../node_modules/bootstrap/dist/css/bootstrap.css',
      '../../../assets/mfs-home/css/nucleo-icons.css',
      './main.component.scss'
    ]
})
export class MainComponent implements OnInit {
    @Input()
    public title;

    focus: any;
    focus1: any;

    private channel;

    constructor() {
        this.channel = new BroadcastChannel("mfs-channel");
    }

    ngOnInit() {
        if (!this.title) {
            this.title = 'Welcome to the future'
        }
    }

    login() {
        console.log("-----------");
        this.channel.postMessage({ type: "login" });
    }

}
