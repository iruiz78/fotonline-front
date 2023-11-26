import { Component, ElementRef, ViewChild } from '@angular/core';
import { LayoutService } from '../../../_layout/service/app.layout.service';
import { AuthenticationService, DataService, AuthRequest, LoginProvider } from '@foto-online/services';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {
  @ViewChild('inputEmail') inputEmail: ElementRef;
  valCheck: string[] = ['remember'];
  password!: string;
  form: FormGroup;
  loginFailed: boolean = false;

  constructor(public layoutService: LayoutService,
              private fb: FormBuilder,
              private authService: AuthenticationService,
              private dataService: DataService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.createForm();

    setTimeout(()=>{
      this.inputEmail.nativeElement.focus();
    }, 0);
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    let authRequest = new AuthRequest();
    authRequest.email = this.form.value.email;
    authRequest.password = this.form.value.password;
    authRequest.provider = LoginProvider.OWN;
    authRequest.fullName = '';

    this.login(authRequest);
  }

  login(authRequest: AuthRequest) {
    this.authService.Login(authRequest).subscribe({
      next: (data) => {

        if(data.statusCode == 401)
          this.messageService.add({ severity: 'warn', summary: 'Atención!', detail: 'La dirección de correo electrónico o la contraseña que has introducido no son correctas.' });

        if(data.statusCode == 200) {
          this.router.navigate(['/admin/dashboard']);
        }

        // let action = new ActionEvent();
        // action.type = 'login';
        // action.action = false;

        // this.dataService.changeMessage(action);
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Error!', detail: 'Ha ocurrido un error.' });
      }
    });
  }
}
