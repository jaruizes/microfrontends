import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'credit-card',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist/v1',
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
      file: 'dist/doc/credit-card.json'
    }
  ]
};
