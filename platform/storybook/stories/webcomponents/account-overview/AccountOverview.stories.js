import { wcloader } from '../../../utils/wc-loader';
import { setCustomElements } from '@storybook/web-components';

import customElements from './account-overview.json';
setCustomElements(customElements);

wcloader('/uicomponents/account-overview/v1/account-overview.esm.js', true);

export default {
  title: 'Web Components/Account Overview',
  component: 'account-overview',
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
  number: 'ES4920959972676435211248',
  name: 'Microservicios 1,2,3',
  lastMovement: '3 days ago',
  amount: '500',
  newMovements: '10'
};
