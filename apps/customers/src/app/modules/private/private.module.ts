import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './components/private/private.component';
import { PrivateRoutingModule } from './private-routing.module';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    PrivateComponent
  ],
  providers: [
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    HttpClientModule
  ]
})
export class PrivateModule { }
