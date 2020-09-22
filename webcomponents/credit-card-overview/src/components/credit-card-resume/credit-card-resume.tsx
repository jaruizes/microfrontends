import { Component, getAssetPath, h, Prop } from '@stencil/core';

@Component({
  tag: 'credit-card-resume',
  styleUrl: 'credit-card-resume.scss',
  shadow: true,
  assetsDirs: ['assets']
})
export class CreditCardResume {

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
  @Prop() type: number;

  /**
   * Card last movement
   */
  @Prop() lastmovement: string;

  /**
   * Card amount
   */
  @Prop() amount: number;

  isCredit() {
    return this.type === 1;
  }

  getProgress() {
    return (this.amount * 100) / this.limit;
  }

  formatCardNumber(): string {
    const formated = this.number.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();

    console.log('Formated: ' + formated);
    return formated;
  }

  render() {

    let cardImg: string = getAssetPath('./assets/debit-card.png');
    let cardType: string = "DEBIT CARD";
    if (this.isCredit()) {
      cardImg = getAssetPath('./assets/credit-card.png');
      cardType = "CREDIT CARD";
    }

    return (
      <div class="container-fluid card-main-container">
        <div class="row">
          <div class="col-12 mt-3">
            <div class="card">
              <div class="card-horizontal">
                <div class="img-square-wrapper align-middle">
                  <img class="card-img" src={cardImg} alt="Card image cap"/>
                </div>
                <div class="card-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="col-10 col-sm-8 justify-content-start">
                        <h4 class="card-title">{this.formatCardNumber()}</h4>
                        <p class="text-muted">{cardType}</p>
                      </div>
                      <div class="col-2 col-sm-4 justify-content-end">
                        <div class="row justify-content-end">
                          <p class="card-amount">{this.amount}€</p>
                        </div>
                          { this.isCredit() ?
                            <div class="progress-bar-container">
                              <div class="progress" style={{height: "0.8em"}}>
                                <div class="progress-bar bg-danger" role="progressbar" style={{width: `${this.getProgress()}%`}} aria-valuenow={this.getProgress()} aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                              <div class="d-flex justify-content-end" style={{"padding-top": "0.2em"}}>
                                <small class="text-muted font-italic">Credit limit: {this.limit} €</small>
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
                      <small class="text-muted font-weight-bold">Last movement: {this.lastmovement}</small>
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
