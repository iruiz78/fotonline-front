import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class StatusCodeInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        next: () => null,
        error: (error: HttpErrorResponse) => {

          // ** Status code AppException por defecto 400.

          if (error.status === 400) {
            this.messageService.add({ life: 3000, severity: 'error', summary: 'Error!', detail: error.error.message });
          }

          if (error.status === 500) {
            this.messageService.add({ life: 3000, severity: 'error', summary: 'Error!', detail: error.error });
          }
        },
      })
    );
  }
}
