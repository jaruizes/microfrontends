import { DocsPage, DocsContainer } from '@storybook/addon-docs/blocks';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  passArgsFirst: false,
  options: {
    panelPosition: 'bottom',
    sidebarAnimations: true
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
    extractComponentDescription: (component, { notes }) => {
      if (notes) {
        return typeof notes === 'string' ? notes : notes.markdown || notes.text;
      }
      return null;
    },
  }
};
