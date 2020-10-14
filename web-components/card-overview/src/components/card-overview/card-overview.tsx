import { Component, getAssetPath, h, Prop } from '@stencil/core';

@Component({
  tag: 'card-overview',
  styleUrls: ['card-overview.scss'],
  shadow: true,
  assetsDirs: ['assets']
})
export class CardOverview {

  /**
   * locale
   */
  @Prop({
    reflect: true
  }) locale: string;

  /**
   * Card number
   */
  @Prop() number: string;

  /**
   * Card limit
   */
  @Prop() limit: number;

  /**
   * Card type
   */
  @Prop() type: number = 0;

  /**
   * Card last movement
   */
  @Prop() lastmovement: string;

  /**
   * Card amount
   */
  @Prop() amount: number;

  /**
   * Localized strings
   */
  private i18nStrings: Array<string>;

  isCredit() {
    return this.type && this.type === 1;
  }

  getProgress() {
    return (this.amount * 100) / this.limit;
  }

  formatCardNumber(): string {
    const formated = this.number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
    return formated;
  }

  /**
   * Load the right locale resource from lang property
   * @param componentName
   * @param locale
   */
  fetchLocaleStringsForComponent(): Promise<Array<string>> {
    const locale = this.locale ? this.locale : 'en';
    return new Promise((resolve, reject): void => {
      fetch(getAssetPath(`./assets/i18n/credit-card-overview.i18n.${locale}.json`))
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

    let cardImg = this.isCredit() ? './assets/credit-card.png' : './assets/debit-card.png';
    let cardType = this.isCredit() ? this.i18nStrings['credit-card'] : this.i18nStrings['debit-card'];

    console.log('number: ' + this.number + ' / type: ' + cardType + ' / imgt: ' + cardImg);

    return (
      <div class="container-fluid card-main-container">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="card">
              <div class="card-horizontal">
                <div class="img-square-wrapper align-middle">
                  <img class="card-img" src={getAssetPath(cardImg)} alt="Card image cap"/>
                </div>
                <div class="card-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-7 col-sm-8 justify-content-start middle-col">
                        <h4 class="card-title">{this.formatCardNumber()}</h4>
                        <p class="text-muted card-type">{cardType}</p>
                      </div>
                      <div class="col-5 col-sm-4 justify-content-end right-col">
                        <div class="row justify-content-end">
                          <p class="card-amount">{this.amount}€</p>
                        </div>
                          { this.isCredit() ?
                            <div class="progress-bar-container">
                              <div class="progress" style={{height: "0.8em"}}>
                                <div class="progress-bar bg-danger" role="progressbar" style={{width: `${this.getProgress()}%`}} aria-valuenow={this.getProgress()} aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <div class="d-flex justify-content-end" style={{"padding-top": "0.2em"}}>
                                <small class="text-muted font-italic credit-limit">{this.i18nStrings['credit-limit']}: {this.limit} €</small>
                              </div>
                            </div>
                            : <div></div>
                          }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-8">
                      <small class="text-muted font-weight-bold card-last-movement">{this.i18nStrings['last-movement']}: {this.lastmovement}</small>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
