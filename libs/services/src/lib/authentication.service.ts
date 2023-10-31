import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'apps/client/src/environments/environment';
import { AuthRequest, AuthResponse, ResetPassword, SendCodeResetPassword, ValidateCodeResetPassword } from './models/auth.model';
import { GenericResponse } from './models/communication/genericResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<AuthResponse | null>;
  public user: Observable<AuthResponse | null>;

  constructor(private http: HttpClient,
              private storageService: StorageService,
              private router: Router) {

    const userData = this.storageService.get('user')?.data;
    const currentUser = userData ? JSON.parse(userData) : null;

    this.userSubject = new BehaviorSubject<AuthResponse | null>(currentUser ? currentUser : null);
    this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    return this.userSubject ? this.userSubject.value : null;
  }

  Login(authRequest: AuthRequest) {
    return this.http.post<GenericResponse<AuthResponse>>(`${environment.api_url}/Auth/Login`, authRequest)
          .pipe(map(response => {

              if(response.statusCode !== 401) {
                this.storageService.set('user', response.entity);
                this.userSubject.next(response.entity);
              }

              return response;
            }));
  }

  SendCodeResetPassword(sendCodeResetPassword: SendCodeResetPassword) {
    return this.http.post<GenericResponse<any>>(`${environment.api_url}/Auth/SendCodeResetPassword`, sendCodeResetPassword);
  }

  ValidateCodeResetPassword(validateCodeResetPassword: ValidateCodeResetPassword) {
    return this.http.post<GenericResponse<any>>(`${environment.api_url}/Auth/ValidateCodeResetPassword`, validateCodeResetPassword);
  }

  ResetPassword(resetPassword: ResetPassword) {
    return this.http.post<GenericResponse<any>>(`${environment.api_url}/Auth/ResetPassword`, resetPassword);
  }

  Logout() {
    this.storageService.clear();
    this.userSubject.next(null);

    this.router.navigate(['/auth/login']);
  }
}
