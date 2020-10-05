import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'contact-form',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
    {
      type: 'docs-vscode',
      file: 'dist/doc/contact-form.json'
    }
  ],
};
