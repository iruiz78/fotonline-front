import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T> {
  apiUrl: string = environment.api_url;
  private readonly controller = this.getControllerName();

  constructor(protected http: HttpClient) { }

  abstract getControllerName(): string;

  FindById(id: number): Observable<T> {

    return this.http.get<T>(`${this.apiUrl}/${this.controller}/${id}`);
  }

  Get(): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${this.controller}`);
  }

  Post(TEntity: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${this.controller}`, TEntity);
  }

  Delete(id: number) {
    return this.http.delete<T>(`${this.apiUrl}/${this.controller}/${id}`);
  }
}
