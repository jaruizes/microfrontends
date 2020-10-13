import { wcloader } from '../../../utils/wc-loader';

wcloader('/microfrontends/mf-cards-summary/v1/main.js');

export default {
  title: 'Microfrontends/Cards Summary',
  component: 'mf-cards-summary'
};

const CardsSummaryTemplate = ({ locale, customer, channel }) => `<mf-cards-summary locale="${locale}" customer="${customer}" channel="${channel}"></mf-cards-summary>`;

export const CardsSummary = CardsSummaryTemplate.bind();
CardsSummary.storyname = "Cards Summary";
CardsSummary.args = {
  customer: '0001',
  locale: 'es',
  channel: 'cards-summary'
};
