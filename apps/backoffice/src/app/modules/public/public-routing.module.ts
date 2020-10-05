import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublicComponent } from './components/public.component';

export const routes: Routes = [
  { path: '', component: PublicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }


