import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../../services/security/security.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private securityService: SecurityService, private authService: OAuthService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.route.snapshot.paramMap.get('doLogin') === 'true') {
        this.securityService.login();
      } else if (this.authService.hasValidAccessToken()) {
        this.router.navigateByUrl('/private');
      }
    });

    this.authService.events.subscribe(event => {
      if (event instanceof OAuthErrorEvent) {
        console.error(event);
      } else {
        if (event.type === 'token_received') {
          this.router.navigateByUrl('/private');
        }
      }
    });
  }

}
