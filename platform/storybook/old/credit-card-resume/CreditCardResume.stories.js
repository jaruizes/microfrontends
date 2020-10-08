import { wcloader } from '../../utils/wc-loader';
import { setCustomElements } from '@storybook/web-components';

import customElements from './credit-card-resume.json';
setCustomElements(customElements);

wcloader('http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/credit-card-resume/credit-card-resume.esm.js', true);

export default {
  title: 'Web Components/Cards/Credit Card Resume',
  component: 'credit-card-resume',
  argTypes: {
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
    },
    amount: {
      control: {
        type: 'text'
      }
    },
    limit: {
      control: {
        type: 'text'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
};


const CreditCardTemplate = ({ number, lastMovement, amount, type, limit }) => `
    <credit-card-resume number="${number}"
                        lastmovement="${lastMovement}"
                        amount="${amount}"
                        limit="${limit}"
                        type="${type}">
      </credit-card-resume>
`;

export const DebitCard = CreditCardTemplate.bind();
DebitCard.storyname = "Debit Card Resume";
DebitCard.args = {
  number: 'XXXXXXXXXXXXXXXX',
  lastMovement: '3 days ago',
  amount: '500',
  limit: '1000',
  type: '0'
};

export const CreditCard = CreditCardTemplate.bind();
CreditCard.storyname = "Credit Card Resume";
CreditCard.args = {
  ...DebitCard.args,
  type: '1'
};
