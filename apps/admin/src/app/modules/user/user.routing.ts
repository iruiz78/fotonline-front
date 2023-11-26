import { RouterModule } from '@angular/router';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'edit', component: EditComponent },
    { path: 'list', component: ListComponent },
    { path: '**', component: ListComponent}
  ])],
  exports: [RouterModule]
})

export class UserRoutingModule { }
