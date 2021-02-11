import { wcloader } from '../../../utils/wc-loader';
import readme from './readme.md';

wcloader('/microfrontends/mf-global-position/v1/main.js');

export default {
  title: 'Microfrontends/Global Position',
  component: 'mf-global-position',
  parameters: {
    notes: { Doc: readme }
  },
  argTypes: {
    locale: {
      control: {
        type: 'text',
      },
      description: 'desc'
    },
    customer: {
      control: {
        required: true,
        type: 'select',
        options: ['0001', '0002']
      },
      description: 'desc'
    },
    mode: {
      control: {
        required: true,
        type: 'select',
        options: [0, 1]
      },
      description: 'desc'
    }
  },
  Storage
};

const Template = ({ locale, customer, mode }) => {
  return `
    <mf-global-position locale="${locale}" customer="${customer}" mode="${mode}"></mf-global-position>
    `;
}

export const GlobalPositionCustomer = Template.bind();
GlobalPositionCustomer.storyname = "Global Position (Customer)";
GlobalPositionCustomer.args = {
  customer: '0001',
  locale: 'en',
  mode: 0
};

export const GlobalPositionBackoffice = Template.bind();
GlobalPositionBackoffice.storyname = "Global Position (Backoffice)";
GlobalPositionBackoffice.args = {
  customer: '0001',
  locale: 'en',
  mode: 1
};
