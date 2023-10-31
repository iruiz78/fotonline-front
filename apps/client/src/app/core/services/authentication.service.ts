import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRequest, AuthResponse, RefreshTokenRequest } from '../models/auth.model';
import { GenericResponse } from '../models/communication/genericResponse';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { StorageService } from './storage.service';
import { environment } from 'apps/client/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<AuthResponse | null>;
  public user: Observable<AuthResponse | null>;

  constructor(private http: HttpClient,
              private storageService: StorageService) {

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

  RefreshAuthentication(refreshTokenRequest: RefreshTokenRequest): Observable<any> {
    return this.http.post(`${environment.api_url}/Auth/RefreshToken`, refreshTokenRequest);
  }

  Logout() {
    this.storageService.clear();
    this.userSubject.next(null);
  }
}
