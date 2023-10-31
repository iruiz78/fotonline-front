import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { mergeMap, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthenticationService } from '@foto-online/services';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authReq = request;
    console.log("request", request);


    return next.handle(request).pipe(
      tap({
        next: () => {
            const isLoggedIn = this.authenticationService.userValue;

            request = request.clone({
            setHeaders: { Authorization: `Bearer ${isLoggedIn.token}` }
          });
        },
        error: (error: HttpErrorResponse) => {

          if (error.status === 401 && !request.url.includes('/auth/login')) {

          }
        },
      },)
    );

      // const isLoggedIn = this.authenticationService.userValue;

      // console.log("isLoggedIn", isLoggedIn);


      // if (isLoggedIn) {
      //     request = request.clone({
      //         setHeaders: { Authorization: `Bearer ${isLoggedIn.token}` }
      //     });
      // }

      // return next.handle(request);

    // let token = this.GetToken();
    // request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    // });

    // return next.handle(request);
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



