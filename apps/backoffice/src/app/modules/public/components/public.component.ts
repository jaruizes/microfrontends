import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  doLogin() {
    this.router.navigate(['/login']);
  }

}
