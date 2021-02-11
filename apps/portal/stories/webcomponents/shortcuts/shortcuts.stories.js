import { wcloader } from '../../../utils/wc-loader';
import { html } from 'lit-html';

wcloader('/uicomponents/shortcuts-panel/v1/shortcuts-panel.bundled.js', true);

export default {
  title: 'UI Components/Shortcuts',
  component: 'shortcuts-panel',
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
    <shortcuts-panel id="shortcuts" .locale="${locale}" .data="${data}"></shortcuts-panel>
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
