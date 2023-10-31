import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
        { path: 'password-reset', loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetModule) },
        { path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule) },
        { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule) },
        { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
        { path: '**', redirectTo: '/auth/login' }
    ])],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
