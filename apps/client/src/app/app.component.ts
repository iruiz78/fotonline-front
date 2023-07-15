import { Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { MockDataService } from './core/services/mock-data.service';
import { UserService } from './core/services/user.service';
import { AuthenticationService } from './core/services/authentication.service';
import { DataService } from './core/services/data.service';
import { ActionEvent } from './core/models/action-event.model';

@Component({
  selector: 'foto-online-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('login',{static:true}) login: OverlayPanel;
  @ViewChild('register',{static:true}) register: OverlayPanel;
  title = 'fotonline-front';
  items: any;
  userLogged: boolean = false;
  mail: any;

  constructor(private mockDataService: MockDataService,
              private userService: UserService,
              private authService: AuthenticationService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.setUserLogged();
    this.actionEvents();

    this.getMockData();
  }

  getUsersTest() {
    this.userService.GetAll().subscribe({
      next(value) {
        console.log(value);
      },
    })
  }

  getMockData() {
    this.mockDataService.GetProducts().subscribe(data => {
      this.items = data;
    });
  }

  setUserLogged() {
    this.authService.user.subscribe(dataUser => {
      if(!dataUser) {
        this.userLogged = false;
        return;
      }

      this.userLogged = true;
      this.mail = dataUser.mail;
    });
  }

  actionEvents() {
    this.dataService.currentMessage.subscribe((actionEvent: ActionEvent) => {
      if(actionEvent.type == 'login')
        this.login.hide();
      else
        this.register.hide();
    });
  }

  logout() {
    this.authService.Logout();
  }
}
