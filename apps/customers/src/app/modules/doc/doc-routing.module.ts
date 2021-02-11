import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DocComponent } from './doc/doc.component';

export const routes: Routes = [
  { path: '', component: DocComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocRoutingModule { }


