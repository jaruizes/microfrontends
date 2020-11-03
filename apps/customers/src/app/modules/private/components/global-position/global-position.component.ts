import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocaleService } from '../../services/locale/locale.service';
import { ConfigService } from '../../../../services/config/config.service';
import { CustomerService } from '../../services/customer/customer.service';
import { UserService } from '../../services/user/user.service';
import { UserInfo } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-global-position',
  templateUrl: './global-position.component.html',
  styleUrls: ['./global-position.component.css']
})
export class GlobalPositionComponent implements OnInit {
  public globalPositionURL;
  public locale;
  public channel = 'customers-app';
  public customer: UserInfo;

  /**
   * This is the parentChannel used by an instance of this microfrontend
   */
  private parentChannel;

  private username;

  constructor(private ngZone: NgZone,
              private router: Router,
              private localeService: LocaleService,
              private customerService: CustomerService,
              private configService: ConfigService,
              private userService: UserService) {
    this.globalPositionURL = this.configService.getMicrofrontendURL('global-position');
  }

  ngOnInit(): void {
    this.locale = undefined;
    this.locale = this.localeService.getLocale();
    this.initBroadcastChannel();
    this.userService.getUserInfo().subscribe(userInfo => {
      this.customer = userInfo;
    });

  }

  handleInstanceMessage(message) {
    console.log('[customers-app] Received microfrontend message: ' + message.cmd);

    if (message.cmd === 'accountClick') {
      this.router.navigateByUrl('/private/account-detail?account=' + message.payload.id);
    }

    if (message.cmd === 'cardClick') {
      this.router.navigateByUrl('/private/card-detail?card=' + message.payload.id);
    }
  }

  /**
   * Method called when a row of "last movements" component is clicked
   * @param item
   */
  handleItemClick(item) {
    console.log(item.detail);
  }

  /**
   * Initializes the broadcastChannel object used by this microfrontend
   * The channel is specified by the property @channel
   */
  private initBroadcastChannel() {
    this.parentChannel = new BroadcastChannel(this.channel);
    this.parentChannel.onmessage = (message) => {
      this.ngZone.run(() => {
        this.handleInstanceMessage(message.data);
      });
    };
  }

}
