import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocaleService } from '../../services/locale/locale.service';

@Component({
  selector: 'app-global-position',
  templateUrl: './global-position.component.html',
  styleUrls: ['./global-position.component.css']
})
export class GlobalPositionComponent implements OnInit {
  public globalPositionURL = '/microfrontends/mf-global-position/v1/main.js';
  public locale;
  public channel = 'customers-app';

  /**
   * This is the parentChannel used by an instance of this microfrontend
   */
  private parentChannel;

  constructor(private ngZone: NgZone, private router: Router, private localeService: LocaleService) {
  }

  ngOnInit(): void {
    this.locale = undefined;
    this.locale = this.localeService.getLocale();
    console.log('locale: ' + this.locale);
    this.initBroadcastChannel();
  }

  handleInstanceMessage(message) {
    console.log('[customers-app] Received microfrontend message: ' + message.cmd);

    if (message.cmd === 'accountClick') {
      console.log('Navigateeeeee');
      this.router.navigateByUrl('/private/account-detail?account=' + message.payload.id);
    }

    if (message.cmd === 'cardClick') {
      console.log('Navigateeeeee');
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
