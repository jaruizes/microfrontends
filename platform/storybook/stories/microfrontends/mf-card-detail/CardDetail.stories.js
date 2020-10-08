import { wcloader } from '../../../utils/wc-loader';

wcloader('/microfrontends/mf-card-detail/v1/main.js');

export default {
  title: 'Microfrontends/Card Detail',
  component: 'mf-card-detail'
};

const Template = ({ locale, card }) => `<mf-card-detail locale="${locale}" card="${card}"></mf-card-detail>`;

export const CardDetail = Template.bind();
CardDetail.storyname = "Card Detail";
CardDetail.args = {
  card: '1',
  locale: 'es'
};
