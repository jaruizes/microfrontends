import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { MatCardModule } from '@angular/material/card';
import { MainComponent } from './components/main/main.component';
import { LazyElementsModule } from '@angular-extensions/elements';
import { AccountsService } from './services/accounts/accounts.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigService } from './services/config/config.service';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  console.log('createTranslateLoader ....');
  return new TranslateHttpLoader(http, './assets/microfrontends/mf-accounts-summary/v1/i18n/', '.json');
}

export function appInit(appConfigService: ConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    LazyElementsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MatCardModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [ConfigService]
    },
    AccountsService
  ],
  bootstrap: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    MainComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const mainCE = createCustomElement(MainComponent, { injector: this.injector });
    customElements.define('mf-accounts-summary', mainCE);
  }
}
