import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { StatusCodeInterceptor } from './interceptors/status-code.interceptor';

@NgModule({
    declarations: [
  ],
    imports: [],
    exports: [],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: StatusCodeInterceptor,
            multi: true
        }
    ]
})
export class CoreModule {}
