import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActionEvent } from './models/action-event.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject(new ActionEvent());
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(actionEvent: ActionEvent) {
    this.messageSource.next(actionEvent)
  }
}
