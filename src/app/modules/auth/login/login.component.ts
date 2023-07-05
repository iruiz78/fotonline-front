import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { AuthRequest } from 'src/app/core/models/auth.model';
import { LoginProvider } from 'src/app/core/models/enums';
import { DataService } from 'src/app/core/services/data.service';
import { ActionEvent } from 'src/app/core/models/action-event.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form?: FormGroup;
  loginFailed: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private socialAuthService: SocialAuthService,
              private dataService: DataService) {}

  ngOnInit(): void {
    this.createForm();
    this.onGoogle();
  }

  createForm() {
    this.form = this.fb.group({
      mail: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onGoogle() {
    this.socialAuthService.authState.subscribe((user) => {
      let authRequest = new AuthRequest();
      authRequest.mail = user.email;
      authRequest.fullName = user.name;
      authRequest.password = '';
      authRequest.provider = LoginProvider.GOOGLE;

      this.login(authRequest);
    });
  }

  onSubmit() {
    let authRequest = new AuthRequest();
    authRequest.mail = this.form.value.mail;
    authRequest.password = this.form.value.password;
    authRequest.provider = LoginProvider.OWN;
    authRequest.fullName = '';

    this.login(authRequest);
  }

  login(authRequest: AuthRequest) {
    this.authService.Login(authRequest).subscribe({
      next: (data) => {

        let action = new ActionEvent();
        action.type = 'login';
        action.action = false;

        this.dataService.changeMessage(action);

        if(data.statusCode == 401) {
          this.loginFailed = true;

          setTimeout(() => {
            this.loginFailed = false;
          }, 4000);
        }
      }
    });
  }
}
