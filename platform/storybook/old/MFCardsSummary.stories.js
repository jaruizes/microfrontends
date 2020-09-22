import { wcloader } from '../utils/wc-loader';

wcloader('http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/mf-cards-summary/main.js');

export default {
  title: 'Microfrontends/Cards Summary',
  component: 'mf-cards-summary',
  parameters: {
    controls: { expanded: true }
  }
};

export const Primary = () => {
  return `<mf-cards-summary></mf-cards-summary>`
};

Primary.storyname = "Cards Summary";
