import {LitElement, html, customElement, css, property} from 'lit-element';
import '@material/mwc-icon';
import { registerTranslateConfig, translate } from 'lit-translate';
import { use } from "lit-translate";

registerTranslateConfig({
  loader: lang => fetch(`./assets/webcomponents/wc-shortcuts/v1/i18n/wc-shortcuts.i18n.${lang}.json`).then(res => res.json())
});

/**
 * WC Shortcuts.
 *
 * @property data Array of four elements containing icon and text for the shortcut
 */
@customElement('wc-shortcuts')
export class ShortCutsElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
    
    .card-title {
      font-weight: 500;
      line-height: 1.2;
      font-size: 1.25rem;
    }
    
    .shortcut-icon-text {
      display: flex;
      font-size: 0.8em;
      font-weight: bold;
    }
  `;

  @property({type: Array})
  data = [];

  @property({
  })
  locale = 'en';

  constructor() {
    super();
    const fontGoogle = document.createElement('link');
    fontGoogle.rel = 'stylesheet';
    fontGoogle.href = 'https://fonts.googleapis.com/css?family=Material+Icons&display=block';
    document.head.appendChild(fontGoogle);
  }

  async connectedCallback () {
    super.connectedCallback();
    await use(this.locale);
  }

  updated(){
    use(this.locale);
  }

  fireEventClick(shortcut: number) {
    console.log('fireEventClick');
    const eventData = {
      detail: { shortcut: shortcut },
      bubbles: true,
      composed: true
    };

    const customEvent = new CustomEvent('shortcutClick', eventData);
    this.dispatchEvent(customEvent);
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
      
      <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">${translate("title")}</h5>
                <div class="container-fluid" style="padding-top: 0.3em">
                    <div class="row" style="border-bottom: lightgray 0.1em solid;">
                        <div class="col-6 d-flex justify-content-center" style="border-right: lightgray 0.1em solid;">
                            <a href="#" style="padding-bottom: 0.8em" @click="${() => this.fireEventClick(0)}">
                                <div>
                                    <mwc-icon>${this.data[0]['icon']}</mwc-icon>      
                                </div>
                                <span class="shortcut-icon-text">${this.data[0]['text']}</span>
                            </a>
                        </div>
                        <div class="col-6 d-flex justify-content-center" style="border-left: lightgray 0.1em solid;">
                            <a href="#" style="padding-bottom: 0.8em" @click="${() => this.fireEventClick(1)}">
                                <div>
                                    <mwc-icon>${this.data[1]['icon']}</mwc-icon>      
                                </div>
                                <span class="shortcut-icon-text">${this.data[1]['text']}</span>
                            </a>
                        </div>
                    </div>
                    <div class="row" >
                        <div class="col-6 d-flex justify-content-center" style="border-right: lightgray 0.1em solid;">
                            <a href="#" style="padding-top: 0.8em" @click="${() => this.fireEventClick(2)}">
                                <div>
                                    <mwc-icon>${this.data[2]['icon']}</mwc-icon>      
                                </div>
                                <span class="shortcut-icon-text">${this.data[2]['text']}</span>
                            </a>
                        </div>
                        <div class="col-6 d-flex justify-content-center" style="border-left: lightgray 0.1em solid;">
                            <a href="#" style="padding-top: 0.8em" @click="${() => this.fireEventClick(3)}">
                                <div>
                                    <mwc-icon>${this.data[3]['icon']}</mwc-icon>      
                                </div>
                                <span class="shortcut-icon-text">${this.data[3]['text']}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wc-shorcuts': ShortCutsElement;
  }
}
