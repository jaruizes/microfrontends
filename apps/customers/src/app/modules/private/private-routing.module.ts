import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrivateComponent } from './components/private/private.component';
import { GlobalPositionComponent } from './components/global-position/global-position.component';
import { CardsComponent } from './components/cards/cards.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { PrivateGuard } from '../../guards/private.guard';

export const routes: Routes = [
  { path: '', component: PrivateComponent, children: [
      { path: '', component: GlobalPositionComponent, pathMatch: 'full', canActivate: [PrivateGuard]},
      { path: 'accounts', component: AccountsComponent, canActivate: [PrivateGuard] },
      { path: 'cards', component: CardsComponent, canActivate: [PrivateGuard] },
      { path: 'account-detail', component: AccountDetailComponent, canActivate: [PrivateGuard] },
      { path: 'card-detail', component: CardDetailComponent, canActivate: [PrivateGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }


