import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'credit-card-resume',
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/scss/_global.scss'
      ]
    })
  ],
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
      file: 'dist/doc/credit-card-resume.json'
    }
  ],
};
