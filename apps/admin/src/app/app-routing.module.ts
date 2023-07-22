import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./_layout/app.layout.component";
import { Loggedin } from './core/guards/loggedin.guard';
import { NotLoggedin } from './core/guards/not-loggedin.guard';

@NgModule({
  imports: [
      RouterModule.forRoot([
          {
              path: 'admin', component: AppLayoutComponent,
              canActivate: [Loggedin],
              children: [
                  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
                  // { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
              ]
          },
          {
            path: 'auth',
            canActivate: [NotLoggedin],
            runGuardsAndResolvers: 'always',
            loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
          },
          { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
          { path: '**', redirectTo: '/auth/login' }
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
