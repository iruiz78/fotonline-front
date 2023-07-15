import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [RouterModule.forChild([
        // { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        // { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: 'login', component: LoginComponent },
        // { path: '', pathMatch: 'full', redirectTo: 'login' },
        // { path: '**', redirectTo: 'login' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
