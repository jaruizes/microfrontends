import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'items-table',
  plugins: [
    sass({})
  ],
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
      file: 'dist/doc/items-table.json'
    }
  ],
};
