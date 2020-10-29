import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrivateComponent } from './components/private/private.component';
import { GlobalPositionComponent } from './components/global-position/global-position.component';
import { CardsComponent } from './components/cards/cards.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { CardDetailComponent } from './components/card-detail/card-detail.component';
import { CustomersListComponent } from './components/customers-list/customers-list.component';

export const routes: Routes = [
  { path: '', component: PrivateComponent, children: [
      { path: '', component: CustomersListComponent, pathMatch: 'full'},
      { path: 'global', component: GlobalPositionComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }


