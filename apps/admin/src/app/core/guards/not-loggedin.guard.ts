import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from '@foto-online/services';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class NotLoggedin {

  constructor(public authService: AuthenticationService,
              public router: Router,
              public messageService: MessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this.authService.userValue) {
      this.router.navigate(['/admin/dashboard']);
      return false;
    }
    else {
      return true;
    }
  }
}
