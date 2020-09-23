import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalPositionComponent } from './components/global-position/global-position.component';

const routes: Routes = [
  { path: 'globalposition', component: GlobalPositionComponent, outlet: 'private' },
  {
    path: 'accounts',
    outlet: 'private',
    loadChildren: () => import('./modules/accounts/accounts.module').then(m => m.AccountsModule)
  },
  {
    path: 'cards',
    outlet: 'private',
    loadChildren: () => import('./modules/cards/cards.module').then(m => m.CardsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
