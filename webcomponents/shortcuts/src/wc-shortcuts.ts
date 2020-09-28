/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, customElement, css, property} from 'lit-element';
import '@material/mwc-icon';


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

  constructor() {
    super();
    const fontGoogle = document.createElement('link');
    fontGoogle.rel = 'stylesheet';
    fontGoogle.href = 'https://fonts.googleapis.com/css?family=Material+Icons&display=block';
    document.head.appendChild(fontGoogle);
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css">
      
      <div class="card text-center">
            <div class="card-body">
                <h5 class="card-title">Shortcuts</h5>
                <div class="container-fluid" style="padding-top: 0.3em">
                    <div class="row" style="border-bottom: lightgray 0.1em solid;">
                        <div class="col-6 d-flex justify-content-center" style="border-right: lightgray 0.1em solid;">
                            <a href="" style="padding-bottom: 0.8em">
                                <div>
                                    <mwc-icon>${this.data[0]['icon']}</mwc-icon>      
                                </div>
                                <span class="shortcut-icon-text">${this.data[0]['text']}</span>
                            </a>
                        </div>
                        <div class="col-6 d-flex justify-content-center" style="border-left: lightgray 0.1em solid;">
                            <a href="" style="padding-bottom: 0.8em">
                                <div>
                                    <mwc-icon>${this.data[1]['icon']}</mwc-icon>      
                                </div>
                                <span class="shortcut-icon-text">${this.data[1]['text']}</span>
                            </a>
                        </div>
                    </div>
                    <div class="row" >
                        <div class="col-6 d-flex justify-content-center" style="border-right: lightgray 0.1em solid;">
                            <a href="" style="padding-top: 0.8em">
                                <div>
                                    <mwc-icon>${this.data[2]['icon']}</mwc-icon>      
                                </div>
                                <span class="shortcut-icon-text">${this.data[2]['text']}</span>
                            </a>
                        </div>
                        <div class="col-6 d-flex justify-content-center" style="border-left: lightgray 0.1em solid;">
                            <a href="" style="padding-top: 0.8em">
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
