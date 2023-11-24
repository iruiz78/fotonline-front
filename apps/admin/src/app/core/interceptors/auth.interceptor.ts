import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, from, mergeMap, Observable, switchMap, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthenticationService, RefreshTokenRequest, StorageService } from '@foto-online/services';
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  userSubject: any;
  constructor(private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isLoggedIn = this.authenticationService.userValue;

    console.log("isLoggedIn", isLoggedIn);

      if(isLoggedIn?.token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${isLoggedIn.token}`
          }
       });
      }

      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error?.status == 401) {
            return this.refreshTokenMethod(request, next, isLoggedIn);
          } else {
            return throwError(() => error);
          }
        })
      );
  }

  refreshTokenMethod(
    request: HttpRequest<any>,
    next: HttpHandler,
    isLoggedIn: any
  ): Observable<HttpEvent<any>> {
    let refreshTokenRequest = new RefreshTokenRequest();
    refreshTokenRequest.tokenExpired = isLoggedIn.token;
    refreshTokenRequest.tokenRefresh = isLoggedIn.tokenRefresh;
    // refreshTokenRequest.token = isLoggedIn.mail;
    refreshTokenRequest.userId = 7;

    return from(this.authenticationService.RefreshToken(refreshTokenRequest)).pipe(
      switchMap((res: any) => {
        // this.signupService.clearLoginResponse();
        console.log("res", res);

        if(res.statusCode !== 400) {
          this.storageService.clear();

          this.storageService.set('user', res.entity);
          // this.userSubject.next(res.entity);
          // this.userSubject.next(res);

          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + res.entity.token,
            },
          });
        }

        return next.handle(request);
      }),
      catchError((error) => {
        //Refresh Token Issue.
        if (error.status == 404) {
          console.log("REDIRECT");

          // this.redirectLogout();
        }
        return throwError(() => error);
      })
    );
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     // this.refreshTokenSubject.next(null);

  //     const isLoggedIn = this.authenticationService.userValue;

  //     if (token)
  //     this.authenticationService.RefreshAuthentication().subscribe(data => {
  //       this.storageService.set('authentication', JSON.stringify(data.data.result));
  //      }, err => {
  //       console.error(err);
  //      })
  //   }
  // }

  // RefreshToken(){
  //   this.authService.RefreshAuthentication().subscribe(data => {
  //     this.storageService.set('authentication', JSON.stringify(data.data.result));
  //    }, err => {
  //     console.error(err);
  //    })
  // }

  // GetToken(url:string): string {
  //   let authentication = this.storageService.get('authentication');
  //   if(authentication){
  //     var date=new Date()
  //     var dateExpired=new Date(JSON.parse(authentication).dateExpired)
  //     var diffMins = Math.round(((dateExpired.getTime() - date.getTime() % 86400000) % 3600000) / 60000)
  //     if (dateExpired > date && diffMins < environment.RefreshAuthentication.minuteRefresh && !url.includes("RefreshAuthentication")){
  //       this.RefreshToken();
  //       return JSON.parse(this.storageService.get('authentication')).token
  //     }
  //     return JSON.parse(this.storageService.get('authentication')).token
  //   }
  //   return ""
  // }
}



