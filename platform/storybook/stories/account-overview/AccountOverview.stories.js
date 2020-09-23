import { wcloader } from '../../utils/wc-loader';
import { setCustomElements } from '@storybook/web-components';

import customElements from './account-overview.json';
setCustomElements(customElements);

wcloader('http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/account-overview/account-overview.esm.js', true);

export default {
  title: 'Web Components/Accounts/Account Overview',
  component: 'account-overview',
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


const AccountOverviewTemplate = ({ number, name, lastMovement, amount, newMovements }) => `
    <account-overview number="${number}"
                        name="${name}"
                        lastmovement="${lastMovement}"
                        newmovements="${newMovements}"
                        amount="${amount}">
    </account-overview>
`;

export const AccountOverview = AccountOverviewTemplate.bind();
AccountOverview.storyname = "Account Overview";
AccountOverview.args = {
  number: 'XXXXXXXXXXXXXXXX',
  name: 'Cuenta Naranja',
  lastMovement: '3 days ago',
  amount: '500',
  newMovements: '10'
};
