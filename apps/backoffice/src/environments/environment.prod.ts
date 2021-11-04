// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const version = 'v1';
const name = 'backoffice';
const assetsBase = `./assets`;
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
      issuer: 'https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_B8GdfuFgX',
      clientid: 'am6fslcmg5j7u0bdg0s2q5jkk',
      scope: 'openid profile email aws.cognito.signin.user.admin',
      logoutUrl: 'https://jalb80-microfrontends.auth.eu-west-2.amazoncognito.com/logout?logout_uri=' + window.location.origin + "/logout" + '&client_id=qblosr0ba12cmth543i47ikg3',
      userinfoEndpoint: 'https://jalb80-microfrontends.auth.eu-west-2.amazoncognito.com/oauth2/userInfo'
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
