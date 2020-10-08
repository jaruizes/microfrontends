import { wcloader } from '../../../utils/wc-loader';

wcloader('/microfrontends/mf-accounts-summary/v1/main.js');

export default {
  title: 'Microfrontends/Accounts Summary',
  component: 'mf-accounts-summary'
};

const Template = ({ locale, customer }) => `<mf-accounts-summary locale="${locale}" customer="${customer}"></mf-accounts-summary>`;

export const AccountSummary = Template.bind();
AccountSummary.storyname = "Account Detail";
AccountSummary.args = {
  customer: '0001',
  locale: 'es'
};
