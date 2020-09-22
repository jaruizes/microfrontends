import { wcloader } from '../utils/wc-loader.js'

wcloader('http://microfrontends-cdn.s3-website.eu-west-2.amazonaws.com/web-components/credit-card/credit-card.esm.js');

export default {
  title: 'Cards/Credit-Card',
  component: 'credit-card',
};

const Template = (args) => `<credit-card name="${args.name}" 
                                                  number="${args.number}" 
                                                  entity="${args.entity}"
                                                  expiration="${args.expiration}"
                                                  type="${args.type}" ></credit-card>`;

// Each story then reuses that template
export const Secondary = Template.bind({});
Secondary.storyname = "Credit Card"
Secondary.args = {
  name: 'Jose Miguel González del Campo',
  number: 'XXXX XXXX XXXX XXXX',
  entity: 'TECHNOLOGY BANK',
  expiration: '10/24',
  type: '0'
};

export const CustomSource = () => Template.bind({});
CustomSource.parameters = {
  docs: {
    source: {
      code: 'Some custom string here'
    }
  },
};

