import { wcloader } from '../../../utils/wc-loader';

wcloader('/microfrontends/mf-balance-overview/v1/mf-balance-overview.min.js');

export default {
  title: 'Microfrontends/Balance Overview',
  component: 'mf-balance-overview'
};

const Template = ({ locale, customer }) => `<mf-balance-overview locale="${locale}" customer="${customer}"></mf-balance-overview>`;

export const BalanceOverview = Template.bind();
BalanceOverview.storyname = "Balance Overview";
BalanceOverview.args = {
  customer: '0001',
  locale: 'es'
};
