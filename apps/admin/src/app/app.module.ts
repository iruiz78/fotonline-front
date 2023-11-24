import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './_layout/app.layout.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
// import { FeatureMydialogComponent } from './feature-mydialog/feature-mydialog.component';
import { UserComponent } from './modules/user/user.component';
import { CoreModule } from './core/core.module';

@NgModule({
  // declarations: [AppComponent, FeatureMydialogComponent, UserComponent],
  declarations: [
    AppComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    AppLayoutModule,
    ToastModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    MessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
