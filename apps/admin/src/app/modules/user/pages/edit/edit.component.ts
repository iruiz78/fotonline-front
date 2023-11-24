/* eslint-disable prefer-const */
import { Component, OnInit } from '@angular/core';
import { UserRequest, UserResponse, UserResponseEdit } from '../../models/user.entity';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidators } from '../../../../../../../../libs/shared/helpers/form-validators'
import { RolResponse } from '../../models/rol.entity';
import { ModuleResponse } from '../../models/modules.entity';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../services/user.service';
import { UrlDataService } from 'libs/shared/services/url-data.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { TypeToast } from 'libs/shared/models/enums';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'foto-online-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  user : UserResponse = new UserResponseEdit();
  form: FormGroup;
  submited = false;
  rols : RolResponse[];
  modules: ModuleResponse[] = [];
  modulesSource : ModuleResponse[] = [];
  modulesTarget : ModuleResponse[] = [];
  isNew = true;


  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private sp: NgxSpinnerService,
    private urlDataService : UrlDataService,
    private router : Router,
    private messageService: MessageService
  ){}

  ngOnInit(): void {
    this.getAllRols();
    this.getAllModules();
    if(this.urlDataService.id > 0){
      this.isNew = false;
      this.getById(this.urlDataService.id);
    }{
      this.modulesSource = this.modules;
    }
    this.createForm();
  }

  getById(id : number){
    this.sp.show('sp');
    this.service.getById(id).pipe(
      catchError(err => {
        console.error(err);
        this.sp.hide('sp');
        return of(null);
      })
    ).subscribe(data => {
      if(data.entity != null){
        this.user = data.entity;
        this.modulesTarget = this.user.modules;
        this.modulesSource = this.modules.filter(
          sourceModule => !this.modulesTarget.some(targetModule => targetModule.name === sourceModule.name)
        );
        this.form.patchValue(this.user);
      }
      this.sp.hide('sp');
    })
  }

  async getAllRols() : Promise<any> {
    this.sp.show('sp');
    this.service.getAllRols().pipe(
      catchError(err => {
        console.error(err);
        this.sp.hide('sp');
        return of(null);
      })
    ).subscribe(data => {
      if(data != null && data.entities.length > 0)
        this.rols = data.entities;
      this.sp.hide('sp');
    })
  }

  async getAllModules(): Promise<any>{
    this.sp.show('sp');
    this.service.getAllModules().pipe(
      catchError(err => {
        console.error(err);
        this.sp.hide('sp');
        return of(null);
      })
    ).subscribe(data => {
      this.modules = data.entities;
      this.modulesSource = data.entities;
      this.sp.hide('sp');
    })
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        id: [this.user.id],
        fullName : [this.user.fullName, [Validators.required, FormValidators.NoWhiteSpace()]],
        rolId : [this.user.rolId,Validators.required],
        email : [this.user.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        modules: [[]],
      })

      if(this.isNew){
        this.form.addControl('password', this.formBuilder.control('', [Validators.required,Validators.compose([
          FormValidators.patternValidator(/\d/, { hasNumber: true }),
          FormValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          FormValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          FormValidators.patternValidator(/[:punct:@!¡"#$%&/.{}()=?¿*-]/, { hasSpecialCharacters: true }),
          Validators.minLength(6),
        ])]));
        this.form.addControl('confirmPassword', this.formBuilder.control('', Validators.required));
        this.form.setValidators(FormValidators.comparePassword);
      }
  }

  onSubmit() {
    this.submited = true;
    let user = new UserRequest();
    user = this.form.value
    user.modules = this.modulesTarget;
    user.id = user.id == null ? 0 : user.id;
    if (this.form.valid)
      this.save(user);
  }

  save(user : UserRequest){
    this.sp.show('sp');
    console.log('save', user);
    this.service.save(user).pipe(
      catchError(err => {
        // El interceptor deberia de levantar el 400
        console.error(err);
        this.sp.hide('sp');
        return of(null);
      })
    ).subscribe(data => {
      this.sp.hide('sp');
      if(data?.statusCode == 200){
        this.messageService.add({severity: TypeToast.SUCCESS, summary:'Éxito!', detail: data.message});
        this.urlDataService.id = 0;
        this.router.navigate(['/admin/user/list']);
      }
    })
  }
}
