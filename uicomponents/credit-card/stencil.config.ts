import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'credit-card',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist/v1',
      esmLoaderPath: '../loader',
    }
  ]
};
