import { wcloader } from '../../../utils/wc-loader';
import { setCustomElements } from '@storybook/web-components';

import customElements from './card-overview.json';
setCustomElements(customElements);

wcloader('http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/webcomponents/card-overview/v1/card-overview.esm.js', true);

export default {
  title: 'Web Components/Card Overview',
  component: 'card-overview',
  argTypes: {
    number: {
      control: {
        type: 'text',
        required: true
      }
    },
    name: {
      control: {
        type: 'text',
        required: true
      }
    },
    amount: {
      control: {
        type: 'text'
      }
    },
    lastmovement: {
      control: {
        type: 'text'
      }
    },
    newmovements: {
      control: {
        type: 'number'
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
};


const CardTemplate = ({ number, name, lastMovement, amount, newMovements, locale, type, limit }) => `
    <card-overview number="${number}"
                    name="${name}"
                    lastmovement="${lastMovement}"
                    newmovements="${newMovements}"
                    type="${type}"
                    limit="${limit}"
                    amount="${amount}"
                    locale="${locale}">
    </card-overview>
`;

export const CardOverview = CardTemplate.bind();
CardOverview.storyname = "Card Overview (Debit)";
CardOverview.args = {
  number: 'XXXXXXXXXXXXXXXX',
  name: 'MICROSERVICIOS 1,2,3',
  lastMovement: '3 days ago',
  newmovements: '3',
  amount: '500',
  type: '0',
  locale: 'en'
};

export const CardOverview2 = CardTemplate.bind();
CardOverview2.storyname = "Card Overview (Credit)";
CardOverview2.args = {
  number: 'XXXXXXXXXXXXXXXX',
  name: 'MICROSERVICIOS 1,2,3',
  lastMovement: '3 days ago',
  newmovements: '3',
  amount: '500',
  limit: '2500',
  type: '1',
  locale: 'en'
};
