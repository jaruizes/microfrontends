import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  public urlAccountsSummary;

  public channel = 'customers-app';
  public customer;

  /**
   * This is the parentChannel used by an instance of this microfrontend
   */
  private parentChannel;
  private accountsChannel;

  /**
   * This is the general channel used by manage events in broadcast
   */
  private generalChannel;

  constructor(private ngZone: NgZone,
              private router: Router,
              private customerService: CustomerService,
              private configService: ConfigService) {
    this.customer = this.customerService.getCustomer();
    this.urlAccountsSummary = this.configService.getMicrofrontendURL('accounts-summary');
  }

  ngOnInit(): void {
    this.initBroadcastChannel();
  }

  handleInstanceMessage(message) {
    console.log('[customers-app] Received microfrontend message: ' + message.cmd);

    if (message.cmd === 'accountClick') {
      console.log('Navigateeeeee');
      this.router.navigateByUrl('/private/account-detail?account=' + message.payload.id);
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

    this.accountsChannel = new BroadcastChannel('customer-app-accounts');
    this.accountsChannel.onmessage = (message) => {
      this.ngZone.run(() => {
        this.handleInstanceMessage(message.data);
      });
    };
  }

}
