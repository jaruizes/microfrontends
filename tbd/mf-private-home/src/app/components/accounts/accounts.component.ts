import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public urlAccountsSummary = 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/mf-accounts-summary/main.js';

  constructor() { }

  ngOnInit(): void {
  }

}
