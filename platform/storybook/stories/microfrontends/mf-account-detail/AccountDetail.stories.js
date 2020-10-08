import { wcloader } from '../../../utils/wc-loader';

wcloader('/microfrontends/mf-account-detail/v1/main.js');

export default {
  title: 'Microfrontends/Account Detail',
  component: 'mf-account-detail'
};

const Template = ({ locale, account }) => `<mf-account-detail locale="${locale}" account="${account}"></mf-account-detail>`;

export const AccountDetail = Template.bind();
AccountDetail.storyname = "Account Detail";
AccountDetail.args = {
  account: '1',
  locale: 'es'
};
