import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { mergeMap, Observable, tap } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let authReq = request;
    console.log("request", request);


    return next.handle(request).pipe(
      tap({
        next: () => null,
        error: (error: HttpErrorResponse) => {

          if (error.status === 401 && !request.url.includes('auth/signin')) {

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



