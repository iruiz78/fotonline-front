import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionEvent } from '../../../core/models/action-event.model';
import { UserRequest } from '../../../core/models/user.model';
import { DataService } from '../../../core/services/data.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form?: FormGroup;
  registerFinished: boolean = false;
  submitted: boolean = false;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private dataService: DataService) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      mail: [null, [Validators.required]],
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    })
  }

  getControl(nameControl: string) {
    return this.form.get(nameControl);
  }

  onSubmit() {
    this.submitted = true;

    let user: UserRequest = {
      fullName: `${this.form.value.name} ${this.form.value.lastname}`,
      mail: this.form.value.mail,
      password: this.form.value.password
    };

    this.userService.Create(user).subscribe({
      next: (data) => {
        console.log(data);
        this.registerFinished = true;
        this.submitted = true;

        setTimeout(() => {
          let action = new ActionEvent();
          action.type = 'register';
          action.action = false;
          this.dataService.changeMessage(action);
          this.registerFinished = false;
        }, 3000);
      }
    });
  }
}
