import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';

@Component({
  selector: 'card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  public locale = 'es';

  @Input()
  public card: number;

  public cardDetailURL;

  constructor(private route: ActivatedRoute, private config: ConfigService) {
    this.cardDetailURL = this.config.getMicrofrontendURL('card-detail');
  }

  ngOnInit(): void {

  }

}
