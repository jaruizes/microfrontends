import { wcloader } from '../../../utils/wc-loader';
import { html } from 'lit-html';

wcloader('http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/webcomponents/wc-shortcuts/v1/wc-shortcuts.bundled.js', true);

export default {
  title: 'Web Components/Shortcuts',
  component: 'wc-shortcuts',
  argTypes: {
    locale: {
      control: {
        type: 'text'
      }
    },
    data: {
      control: {
        required: true
      }
    }
  },
  parameters: {
    controls: { expanded: true }
  }
};


const Template = ({ locale, data }) => html `
    <wc-shortcuts id="shortcuts" .locale="${locale}" .data="${data}"></wc-shortcuts>
`;

export const Shortcuts = Template.bind();
Shortcuts.storyname = "Shortcuts";
Shortcuts.args = {
  locale: 'en',
  data: [
    {
      icon: 'shopping_cart',
      text: 'National transfer 1'
    },
    {
      icon: 'shopping_cart',
      text: 'National transfer 2'
    },
    {
      icon: 'shopping_cart',
      text: 'National transfer 3'
    },
    {
      icon: 'shopping_cart',
      text: 'National transfer 4'
    },
  ]
};
