import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  public account: number;

  public accountDetailURL;

  constructor(private route: ActivatedRoute, private configService: ConfigService) {
    this.accountDetailURL = this.configService.getMicrofrontendURL('account-detail');
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.account = params['account'];
      console.log('Account: ' + this.account);
    });
  }

}
