import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, from, Observable, switchMap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthenticationService, RefreshTokenRequest, UserLogged } from '@foto-online/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userLogged: UserLogged = this.authenticationService.userValue;

    if(userLogged?.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${userLogged.token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error?.status == 401) {
          return this.refreshTokenMethod(request, next, userLogged);
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  refreshTokenMethod(request: HttpRequest<any>, next: HttpHandler, userLogged: UserLogged): Observable<HttpEvent<any>> {
    let refreshTokenRequest = new RefreshTokenRequest();

    refreshTokenRequest.tokenExpired = userLogged.token;
    refreshTokenRequest.tokenRefresh = userLogged.tokenRefresh;
    refreshTokenRequest.email = userLogged.email;

    return from(this.authenticationService.RefreshToken(refreshTokenRequest)).pipe(
        switchMap((response: any) => {

        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + response.entity.token,
          },
        });

        return next.handle(request);
      }),
      catchError((error) => {
        if (error.error.statusCode == 404) {
          this.authenticationService.Logout();
        }
        return throwError(() => error);
      })
    );
  }
}



