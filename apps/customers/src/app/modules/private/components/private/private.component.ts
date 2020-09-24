import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.css']
})
export class PrivateComponent implements OnInit {
  constructor(private oauthService: OAuthService) { }

  ngOnInit(): void {
    console.log(this.oauthService.getAccessToken());
    console.log(this.oauthService.getIdToken());
  }

}
