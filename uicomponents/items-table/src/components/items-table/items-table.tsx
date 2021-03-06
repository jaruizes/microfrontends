import { Component, h, Prop, Event } from '@stencil/core';
import { EventEmitter } from '@stencil/core/internal';

export interface Item {
  header: string;
  title1: string;
  subtitle1: string;
  title2: string;
  subtitle2: string;

}


@Component({
  tag: 'items-table',
  styleUrl: 'items-table.scss',
  shadow: true,
  assetsDirs: ['assets']
})
export class ItemsTable {

  /**
   * Table header
   */
  @Prop() header: string;

  /**
   * Table items
   */
  @Prop() items: Array<Item>;

  /**
   * Custom event emitted when a click is performed over a row
   */
  @Event() itemClick: EventEmitter<Item>;

  itemClickThrowEvent(item: Item) {
    this.itemClick.emit(item);
  }

  render() {
    if (!this.items) {
      return ('No data')
    }
    return (
      <div class="card">
        <div class="card-body">
          <h5 class="card-title items-title">{this.header}</h5>
          <div class="container-fluid items">
            {this.items.map((item) =>
              <div onClick={() => this.itemClickThrowEvent(item)}>
                <div class="row item-row" style={{padding: "0em"}}>
                  <div class="col-md-8 col-xs-8 col-8 items-left">
                    <div class="items-data">
                      <p class="text-muted text-left align-bottom items-header">{item.header}</p>
                      <p class="text-left h5 items-title1">{item.title1}</p>
                      <p class="h6 text-muted text-left items-subtitle1"><em>{item.subtitle1}</em></p>
                    </div>
                  </div>
                  <div class="col-md-4 col-md-4 col-4 text-right my-auto items-right">
                    <p class="h3 items-title2" style={{"margin": "0em"}}>{item.title2}</p>
                    <p class="h4 text-muted items-subtitle2" style={{"margin": "0em"}}><em>{item.subtitle2}</em></p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

}
