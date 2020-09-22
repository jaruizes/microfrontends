import { Component, Prop, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'credit-card',
  styleUrl: 'credit-card.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class CreditCardComponent {
  /**
   * Card onwer's name
   */
  @Prop() name: string;

  /**
   * Card number
   */
  @Prop() number: string;

  /**
   * Card entity
   */
  @Prop() entity: string;

  /**
   * Card logo
   */
  @Prop() logo: string;

  /**
   * Card expiration
   */
  @Prop() expiration: string;

  /**
   * Card expiration
   */
  @Prop() type: number;

  render() {
    let background: string = getAssetPath('./assets/background-debit.png');
    if (this.type === 1) {
      background = getAssetPath('./assets/background-credit.jpg');
    }

    return (
      <div class="credit-card-wrap" style={{backgroundImage: `url(${background})`}}>
        <div class="credit-card-inner">
          <header class="header">
            <div class="credit-logo">
              <span class="text credit-font">{this.entity}</span>
            </div>
          </header>
          <div class="mk-icon-sim"></div>
          <div class="credit-font credit-card-number">{this.number}</div>
          <footer class="footer">
            <div class="clearfix">
              <div class="pull-left">
                <div class="credit-card-date"><span class="title">Expires End</span><span class="credit-font">{this.expiration}</span></div>
                <div class="credit-font credit-owner">{this.name}</div>
              </div>
              <div class="pull-right">
                <div class="mk-icon-visa">
                  <img src={getAssetPath(`./assets/mc_vrt_rev.svg`)}></img>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
