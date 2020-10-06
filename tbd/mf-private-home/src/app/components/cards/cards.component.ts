import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public urlCardsSummary = 'http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/mf-cards-summary/main.js';

  constructor() { }

  ngOnInit(): void {
  }

}
