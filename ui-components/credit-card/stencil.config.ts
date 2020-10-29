import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'credit-card',
  outputTargets: [
    {
      type: 'dist',
      dir: 'dist/credit-card/v1',
      esmLoaderPath: '../loader',
    }
  ]
};
