import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { UserRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserRequest> {
  constructor(protected override http: HttpClient) {
    super(http);
  }

  getControllerName(): string {
    return 'User';
  }

  Create(userRequest: UserRequest) {
    return this.http.post<any>(`${this.apiUrl}/User/Create`, userRequest);
  }

  GetAll() {
    return this.http.get<any>(`${this.apiUrl}/User/GetAll`);
  }
}
