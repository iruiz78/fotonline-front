import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../../../../../../libs/shared/communications/genericResponse';
// import { environment } from 'src/environments/environment';
import { UserRequest, UserResponse } from '../models/user.entity';
import { RolResponse } from '../models/rol.entity';
import { ModuleResponse } from '../models/modules.entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() : Observable<GenericResponse<UserResponse>>{
    return this.http.get<GenericResponse<UserResponse>>(`https://localhost:7045/User/GetAll`);
  }

  disable(user : UserResponse) : Observable<GenericResponse<UserResponse>>{
    return this.http.post<GenericResponse<UserResponse>>(`https://localhost:7045/User/Disable`, user);
  }

  save(user : UserRequest) : Observable<GenericResponse<UserRequest>>{
    return this.http.post<GenericResponse<UserRequest>>(`https://localhost:7045/User/Save`, user);
  }

  getById(id : number) : Observable<GenericResponse<UserResponse>>{
    return this.http.get<GenericResponse<UserResponse>>(`https://localhost:7045/User/GetById/${id}`);
  }

  getAllRols() : Observable<GenericResponse<RolResponse>>{
    return this.http.get<GenericResponse<RolResponse>>(`https://localhost:7045/User/GetAllRols`);
  }

  getAllModules() : Observable<GenericResponse<ModuleResponse>>{
    return this.http.get<GenericResponse<ModuleResponse>>(`https://localhost:7045/User/GetAllModules`);
  }



}
