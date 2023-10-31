import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NxWelcomeComponent } from './nx-welcome.component';
import { PrimengUiModule } from '@foto-online/primeng-ui';
import { AuthModule } from './modules/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { BoardComponent } from './board/board.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent, BoardComponent],
  imports: [
    BrowserModule,
    CoreModule,
    HttpClientModule,
    PrimengUiModule,
    AuthModule,
    AppRoutingModule,
    // RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
