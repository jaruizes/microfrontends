import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MainComponent } from './components/main/main.component';
import { LazyElementsModule } from '@angular-extensions/elements';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CardService } from './services/card/card.service';
import { ConfigService } from './services/config/config.service';
import { JwtModule } from '@auth0/angular-jwt';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/microfrontends/mf-card-detail/v1/i18n/', '.json');
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
    MatListModule,
    MatGridListModule,
    MatCardModule,
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
    CardService
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
    if (!customElements.get('mf-card-detail')) {
      customElements.define('mf-card-detail', mainCE);
    }
  }
}
