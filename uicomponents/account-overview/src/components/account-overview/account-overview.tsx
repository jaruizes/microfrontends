import { Component, getAssetPath, h, Prop } from '@stencil/core';

@Component({
  tag: 'account-overview',
  styleUrl: 'account-overview.scss',
  shadow: true,
  assetsDirs: ['assets']
})
export class AccountOverview {

  /**
   * locale
   */
  @Prop({
    reflect: true
  }) locale: string;

  /**
   * Account number (not formatted)
   */
  @Prop() number: string;

  /**
   * Account name
   */
  @Prop() name: string;

  /**
   * Account new movements
   */
  @Prop() newmovements: number;

  /**
   * Account last movement
   */
  @Prop() lastmovement: string;

  /**
   * Account amount
   */
  @Prop() amount: number;

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
      fetch(getAssetPath(`./assets/i18n/account-overview.i18n.${locale}.json`))
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

  formatIBAN(accountNumber: string) {
    return accountNumber.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
  }

  render() {

    return (
      <div class="container-fluid card-main-container">
        <div class="row">
          <div class="col-12 left-col">
            <div class="card">
              <div class="card-body">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-xl-6 col-lg-5 col-sm-6 col-6 left-col">
                      <h4 class="card-title">{this.name}</h4>
                      <p class="text-muted card-number">{this.formatIBAN(this.number)}</p>
                    </div>
                    <div class="col-xl-3 col-lg-3 col-sm-3 col-3 middle-col">
                      <div class="d-flex justify-content-center new-movememnts">
                        <p class="text-muted card-movements-header">{this.i18nStrings['new-transactions']}</p>
                      </div>
                      <div class="d-flex justify-content-center">
                        <h3 class="card-movements">{this.newmovements}</h3>
                      </div>
                    </div>
                    <div class="col-xl-3 col-lg-4 col-sm-3 col-3 right-col">
                      <div class="d-flex justify-content-end balance">
                        <p class="text-muted card-balance-header">{this.i18nStrings['balance']}</p>
                      </div>
                      <div class="d-flex justify-content-end">
                        <h3 class="card-amount">{this.amount} €</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-12 card-last-movement">
                      <small class="text-muted font-weight-bold last-movements-text">{this.i18nStrings['last-movement']}: {this.lastmovement}</small>
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
