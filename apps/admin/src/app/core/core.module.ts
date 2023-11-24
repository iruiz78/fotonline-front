import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StatusCodeInterceptor } from './interceptors/status-code.interceptor';

@NgModule({
  declarations: [],
  imports: [ CommonModule ],
  exports: [],
  providers: [
    // BsModalService,
    // AuthGuard,
    // NoAuthGuard,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: StatusCodeInterceptor,
        multi: true
    },
    // {
    //     provide: LocationStrategy,
    //     useClass: HashLocationStrategy
    // },
    // UrlDataService
],
})
export class CoreModule {}
