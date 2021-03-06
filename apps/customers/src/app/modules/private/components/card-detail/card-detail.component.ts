import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styleUrls: ['./card-detail.component.css']
})
export class CardDetailComponent implements OnInit {

  public locale = 'es';
  public card: number = 0;
  public isCard = false;

  public cardDetailURL;

  constructor(private route: ActivatedRoute, private configService: ConfigService) {
  this.cardDetailURL = this.configService.getMicrofrontendURL('card-detail');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.card = params['card'];
      this.isCard = true;

      console.log('-----> card id: ' + this.card);
    });
  }

}
