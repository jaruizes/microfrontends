import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { MainComponent } from './components/main/main.component';
import { LazyElementsModule } from '@angular-extensions/elements';
import { CardsService } from './components/services/cards/cards.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfigService } from './components/services/config/config.service';
import { JwtModule } from '@auth0/angular-jwt';


// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  console.log('createTranslateLoader ....');
  return new TranslateHttpLoader(http, './assets/microfrontends/mf-cards-summary/v1/i18n/', '.json');
}

export function appInit(appConfigService: ConfigService) {
  return () => appConfigService.load();
}

export function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:4202"]
      },
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [ConfigService]
    },
    CardsService
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
    if (!customElements.get('mf-cards-summary')) {
      customElements.define('mf-cards-summary', mainCE);
    }
  }
}
