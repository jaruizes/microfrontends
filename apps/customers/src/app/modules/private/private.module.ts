import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './components/private/private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LazyElementsModule } from '@angular-extensions/elements';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { GlobalPositionComponent } from './components/global-position/global-position.component';
import { CardsComponent } from './components/cards/cards.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { LocaleService } from './services/locale/locale.service';
import { UserService } from './services/user/user.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PrivateComponent,
    GlobalPositionComponent,
    AccountsComponent,
    CardsComponent,
    CardDetailComponent,
    AccountDetailComponent
  ],
  providers: [
    LocaleService,
    UserService
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    HttpClientModule,
    LazyElementsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatCardModule,
    MatListModule,
    TranslateModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PrivateModule { }
