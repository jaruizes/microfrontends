import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrivateComponent } from './components/private/private.component';

export const routes: Routes = [
  { path: '', component: PrivateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }


