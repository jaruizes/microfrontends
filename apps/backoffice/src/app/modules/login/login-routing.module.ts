import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LogInComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }


