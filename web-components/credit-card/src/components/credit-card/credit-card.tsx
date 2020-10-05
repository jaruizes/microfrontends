import { Component, Prop, h, getAssetPath } from '@stencil/core';

@Component({
  tag: 'credit-card',
  styleUrl: 'credit-card.css',
  shadow: true,
  assetsDirs: ['assets']
})
export class CreditCardComponent {
  /**
   * lang
   */
  @Prop() locale: string;

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

  /**
   * Localized strings
   */
  private i18nStrings: Array<string>;

  /**
   * Load the right locale resource from lang property
   * @param componentName
   * @param locale
   */
  fetchLocaleStringsForComponent(): Promise<Array<string>> {
    const locale = this.locale ? this.locale : 'en';
    return new Promise((resolve, reject): void => {
      fetch(getAssetPath(`./assets/i18n/credit-card.i18n.${locale}.json`))
        .then((result) => {
          if (result.ok) resolve(result.json());
          else reject();
        }, () => reject());
    });
  }

  /**
   * Function called within StencilJS (before every render) lifecycle
   */
  async componentWillRender() {
    this.i18nStrings = await this.fetchLocaleStringsForComponent();
  }

  render() {
    let background: string = getAssetPath('./assets/images/background-debit.png');
    if (this.type === 1) {
      background = getAssetPath('./assets/images/background-credit.jpg');
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
                <div class="credit-card-date"><span class="title">{this.i18nStrings['end-date']}</span><span class="credit-font">{this.expiration}</span></div>
                <div class="credit-font credit-owner">{this.name}</div>
              </div>
              <div class="pull-right">
                <div class="mk-icon-visa">
                  <img src={getAssetPath(`./assets/images/mc_vrt_rev.svg`)}></img>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}
