import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PasswordResetComponent } from './password-reset.component';

const routes: Routes = [
  { path: '', component: PasswordResetComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule {}
