import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalPositionComponent } from './components/global-position/global-position.component';
import { CardsComponent } from './components/cards/cards.component';
import { AccountsComponent } from './components/accounts/accounts.component';

const routes: Routes = [
  { path: 'globalposition', component: GlobalPositionComponent, outlet: 'private' },
  { path: 'cards', component: CardsComponent, outlet: 'private' },
  { path: 'accounts', component: AccountsComponent, outlet: 'private' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
