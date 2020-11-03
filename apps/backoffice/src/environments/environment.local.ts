// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const version = 'v1';
const name = 'customers';
const assetsBase = `./assets/apps/${name}`;
const apiBase = '/api';

export const environment = {
  production: false,
  env: 'LOCAL',
  config: {
    name: name,
    version: version,
    assets: assetsBase,
    i18n: {
      defaultLanguage: 'es',
      localeUrls: `${assetsBase}/i18n/`,
      suffix: '.json'
    },
    security: {
      allowedDomains: ['/api/*'],
      token: 'access_token',
      issuer: 'http://localhost:8100/auth/realms/microfrontends',
      clientid: 'backoffice-app',
      scope: 'openid profile email offline_access',
      logoutUrl: 'http://localhost:8100/auth/realms/microfrontends/protocol/openid-connect/logout?redirect_uri=' + window.location.origin + "/logout",
      userinfoEndpoint: 'http://localhost:8100/auth/realms/microfrontends/protocol/openid-connect/userinfo'
    }
  },
  api: {
    base: apiBase,
    endpoints: {
      config: `${apiBase}/config/${name}-app-config`,
      examples: `${apiBase}/examples/`
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
