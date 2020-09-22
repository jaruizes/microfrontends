import { wcloader } from '../../utils/wc-loader';
import { setCustomElements } from '@storybook/web-components';

import customElements from './credit-card.json';
setCustomElements(customElements);

wcloader('http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/credit-card/credit-card.esm.js', true);

export default {
  title: 'Web Components/Cards/Credit-Card',
  component: 'credit-card',
  argTypes: {
    name: {
      control: {
        type: 'text'
      }
    },
    number: {
      control: {
        type: 'text',
        required: true
      }
    },
    type: {
      control: {
        type: 'select',
        options: ['0', '1']
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
};


const CreditCardTemplate = ({ name, number, entity, expiration, type }) => `<credit-card name="${name}" number="${number}" entity="${entity}" expiration="${expiration}" type="${type}"</credit-card>`;

export const DebitCard = CreditCardTemplate.bind();
DebitCard.storyname = "Debit Card";
DebitCard.args = {
  name: 'Jose Miguel González del Campo',
  number: 'XXXX XXXX XXXX XXXX',
  entity: 'TECHNOLOGY BANK',
  expiration: '10/24',
  type: '0'
};

export const CreditCard = CreditCardTemplate.bind();
CreditCard.storyname = "Credit Card";
CreditCard.args = {
  ...DebitCard.args,
  type: '1'
};
