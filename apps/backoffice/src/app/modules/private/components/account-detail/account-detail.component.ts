import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';

@Component({
  selector: 'account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  @Input()
  public account: number;

  public accountDetailURL;

  constructor(private route: ActivatedRoute, private config: ConfigService) {
    this.accountDetailURL = this.config.getMicrofrontendURL('account-detail');
  }

  ngOnInit(): void {

  }

}
