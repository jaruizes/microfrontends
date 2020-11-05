import { wcloader } from '../../../utils/wc-loader';
import { setCustomElements } from '@storybook/web-components';
import { html } from 'lit-html';

import customElements from './items-table.json';
setCustomElements(customElements);

wcloader('/uicomponents/items-table/v1/items-table.esm.js', true);

export default {
  title: 'UI Components/Items Table',
  component: 'items-table',
  argTypes: {
    header: {
      control: {
        type: 'text'
      }
    },
    items: {
      control: {
        required: true
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
};


const Template = ({ header, items }) => html `
<items-table .header="${header}" .items="${items}"></items-table>
  `;

export const ItemsTable = Template.bind();
ItemsTable.storyname = "Items Table";
ItemsTable.args = {
  header: 'Header',
  items: [
    {
      "header": "header del item",
      "title1": "TITULO DEL ITEM",
      "subtitle1": "SUBTITULO DEL ITEM",
      "title2": "TIT 2",
      "subtitle2": "SUBTITLE2"
    },
    {
      "header": "header del item",
      "title1": "TITULO DEL ITEM",
      "subtitle1": "SUBTITULO DEL ITEM",
      "title2": "TIT 2",
      "subtitle2": "SUBTITLE2"
    },
    {
      "header": "header del item",
      "title1": "TITULO DEL ITEM",
      "subtitle1": "SUBTITULO DEL ITEM",
      "title2": "TIT 2",
      "subtitle2": "SUBTITLE2"
    },
  ]
};
