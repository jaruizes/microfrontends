import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { LazyElementsModule } from '@angular-extensions/elements';
import { GlobalPositionComponent } from './components/global-position/global-position.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MovementsService } from './services/movements/movements.service';
import { ConfigService } from './services/config/config.service';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/microfrontends/mf-global-position/v1/i18n/', '.json');
}

export function appInit(appConfigService: ConfigService) {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [
    GlobalPositionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
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
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [ConfigService]
    },
    MovementsService
  ],
  bootstrap: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    GlobalPositionComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const mainCE = createCustomElement(GlobalPositionComponent, { injector: this.injector });
    customElements.define('mf-global-position', mainCE);
  }
}
