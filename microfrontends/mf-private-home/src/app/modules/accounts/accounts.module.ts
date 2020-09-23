import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsRoutingModule } from './accounts-routing.module';
import { LazyElementsModule } from '@angular-extensions/elements';
import { AccountsComponent } from './components/accounts/accounts.component';



@NgModule({
  declarations: [AccountsComponent],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    LazyElementsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AccountsModule { }
