import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards/cards.component';
import { CardsRoutingModule } from './cards-routing.module';
import { LazyElementsModule } from '@angular-extensions/elements';



@NgModule({
  declarations: [CardsComponent],
  imports: [
    CommonModule,
    CardsRoutingModule,
    LazyElementsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CardsModule { }
