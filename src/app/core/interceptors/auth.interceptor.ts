import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { mergeMap, Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthenticationService } from "../services/authentication.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request);
    // return this.authService.GetToken().pipe(mergeMap(token => {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    //     });
    //     return next.handle(request);
    //   })
    // );
  }

}



