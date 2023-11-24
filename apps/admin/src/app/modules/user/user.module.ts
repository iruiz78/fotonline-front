import { SharedModule } from './../../../../../../libs/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './pages/edit/edit.component';
import { ListComponent } from './pages/list/list.component';
import { UserRoutingModule } from './user.routing';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { PickListModule } from 'primeng/picklist';
import { PasswordModule } from 'primeng/password';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgxSpinnerModule,
    RippleModule,
    ButtonModule,
    ReactiveFormsModule,
    PickListModule,
    PasswordModule
  ],
  declarations: [
    EditComponent,
    ListComponent
  ]
})
export class UserModule { }

