import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public urlCardsSummary;

  public channel = 'customers-app';
  public customer;

  /**
   * This is the parentChannel used by an instance of this microfrontend
   */
  private parentChannel;
  private cardsChannel;

  /**
   * This is the general channel used by manage events in broadcast
   */
  private generalChannel;

  constructor(private ngZone: NgZone,
              private router: Router,
              private configService: ConfigService,
              private userService: UserService) {
    this.urlCardsSummary = this.configService.getMicrofrontendURL('cards-summary');
  }

  ngOnInit(): void {
    this.initBroadcastChannel();
    this.userService.getUserInfo().subscribe(userInfo => {
      this.customer = userInfo;
    });
  }

  handleInstanceMessage(message) {
    console.log('[customers-app] Received microfrontend message: ' + message.cmd);

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
    this.generalChannel = new BroadcastChannel('microfrontends');

    this.parentChannel = new BroadcastChannel(this.channel);
    this.parentChannel.onmessage = (message) => {
      this.ngZone.run(() => {
        this.handleInstanceMessage(message.data);
      });
    };

    this.cardsChannel = new BroadcastChannel('customer-app-cards');
    this.cardsChannel.onmessage = (message) => {
      this.ngZone.run(() => {
        this.handleInstanceMessage(message.data);
      });
    };
  }

}
