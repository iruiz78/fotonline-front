import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, ResetPassword, SendCodeResetPassword, ValidateCodeResetPassword } from '@foto-online/services';
import { MessageService } from 'primeng/api';
import { InputValidators } from '@foto-online/helpers';

@Component({
  selector: 'foto-online-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent {
  formSendCode: FormGroup;
  formEnterCode: FormGroup;
  formResetPassword: FormGroup;
  stepformSendCode: boolean = true;
  stepformEnterCode: boolean = false;
  stepformResetPassword: boolean = false;
  submit: boolean = false;

  constructor(public fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private messageService: MessageService,
              private router: Router) {}

  ngOnInit(): void {
    this.createForms();
  }

  createForms() {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.formSendCode = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(emailRegex), Validators.maxLength(100)]]
    });

    this.formEnterCode = this.fb.group({
      code: [null, [Validators.required, Validators.maxLength(50)]]
    });

    const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

    this.formResetPassword = this.fb.group({
      password: [null, [Validators.required, Validators.maxLength(50), Validators.pattern(mediumRegex)]],
      confirmPassword: [null, [Validators.required, Validators.maxLength(50)]]
    }, { validators:  this.checkIfMatchingPasswords('password', 'confirmPassword') });
  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
      else {
          return passwordConfirmationInput.setErrors(null);
      }
    }
  }

  sendCode() {
    if(!this.formSendCode.valid) return;
    this.submit = true;

    let request = new SendCodeResetPassword();
    request = this.formSendCode.value;

    this.authenticationService.SendCodeResetPassword(request).subscribe({
      next: () => {
        this.stepformSendCode = false;
        this.stepformEnterCode = true;
        this.submit = false;
      },
      error: (err) => {
        this.messageService.add({ life: 6000, severity: 'warn', summary: 'Atención!', detail: err.error.message });
        this.submit = false;
        console.error(err);
      }
    });
  }

  enterCode() {
    if(!this.formEnterCode.valid) return;

    this.submit = true;

    let request = new ValidateCodeResetPassword();
    request = this.formEnterCode.value;
    request.email = this.formSendCode.controls['email'].value;

    this.authenticationService.ValidateCodeResetPassword(request).subscribe({
      next: () => {
        this.stepformEnterCode = false;
        this.stepformResetPassword = true;
        this.submit = false;
      },
      error: (err) => {
        this.messageService.add({ life: 6000, severity: 'warn', summary: 'Atención!', detail: err.error.message });
        this.submit = false;
        console.error(err);
      }
    });
  }

  resetPassword() {
    if(!this.formResetPassword.valid) return;
    this.submit = true;

    let request = new ResetPassword();
    request = this.formResetPassword.value;
    request.email = this.formSendCode.controls['email'].value;

    this.authenticationService.ResetPassword(request).subscribe({
      next: () => {
        this.messageService.add({ life: 6000, severity: 'success', summary: 'Éxito!', detail: 'Contraseña modificada correctamente.' });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.messageService.add({ life: 6000, severity: 'warn', summary: 'Atención!', detail: err.error.message });
        this.submit = false;
        console.error(err);
      },
    });
  }

  keyPressInputCode(event: any) {
    InputValidators.keyPressOnlyNumbers(event);
  }
}
