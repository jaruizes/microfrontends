import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from '../../services/locale/locale.service';
import { CustomersService } from '../../services/customers/customers.service';
import { Customer } from '../../models/customer';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../../../services/config/config.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-global-position',
  templateUrl: './global-position.component.html',
  styleUrls: ['./global-position.component.css']
})
export class GlobalPositionComponent implements OnInit {
  public globalPositionURL;
  public locale;
  public customer;
  public customerData: Customer;
  public show;
  public channel = 'backoffice-app';

  public displayOverlay = 'none';
  public account: number;
  public card: number;

  @ViewChild('accountContent') accountContent: ElementRef;
  @ViewChild('cardContent') cardContent: ElementRef;

  /**
   * This is the parentChannel used by an instance of this microfrontend
   */
  private parentChannel;

  constructor(private ngZone: NgZone, private router: Router,
              private localeService: LocaleService,
              private customerService: CustomersService,
              private translate: TranslateService,
              private config: ConfigService,
              private modalService: NgbModal,
              private route: ActivatedRoute) {
    this.show = false;
    this.customer = '';
    this.globalPositionURL = this.config.getMicrofrontendURL('global-position');
    this.route.queryParams.subscribe(params => {
      this.customer = params['customer'];
      this.getCustomerData();
    });
  }

  ngOnInit(): void {
    this.locale = undefined;
    this.locale = this.localeService.getLocale();
    this.initBroadcastChannel();
  }

  handleInstanceMessage(message) {
    console.log('[customers-app] Received microfrontend message: ' + message.cmd);

    if (message.cmd === 'accountClick') {
      this.account = message.payload.id;
      this.modalService.open(this.accountContent, { windowClass : 'account-modal', scrollable: true, centered: true })
    }

    if (message.cmd === 'cardClick') {
      this.card = message.payload.id;
      this.modalService.open(this.cardContent, { windowClass : 'account-modal', scrollable: true, centered: true })
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

  private getCustomerData() {
    this.show = false;
    this.customerService.getCustomer(this.customer).subscribe((customer) => {
      this.customerData = customer;
      this.show = true;
    });
  }

}
