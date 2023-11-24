import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UrlDataService {
  private value: any;

  constructor(private router: Router) { }

  redirectTo(path: string): void {
    this.value = null;
    this.router.navigate([`/${path}`]);
  }

  set id(id: number) {
    this.value = id;
  }

  get id() {
    return this.value;
  }

}
