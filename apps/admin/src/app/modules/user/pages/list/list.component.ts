import { Router } from '@angular/router';
import { UrlDataService } from './../../../../../../../../libs/shared/services/url-data.service';
import { TypeToast } from './../../../../../../../../libs/shared/models/enums';
import { Component, OnInit } from '@angular/core';
import { TableConfiguration } from 'libs/shared/table/models/table';
import { UserService } from '../../services/user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserResponse } from '../../models/user.entity';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'foto-online-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tableConfiguration: TableConfiguration = new TableConfiguration();
  columns: any[];
  users: UserResponse[];

  constructor(
    private service: UserService,
    private messageService: MessageService,
    private sp: NgxSpinnerService,
    private urlDataService : UrlDataService,
    private router : Router
  ) {}

  // Vas a tener que ver como inyectas los permisos y demas para habilitar o deshabilitar algunas acciones
  ngOnInit(): void {
    this.columns = [
      { field: 'fullName', header: 'Nombre', alignment: 'center' },
      { field: 'email', header: 'Email', alignment: 'center' },
      { field: 'rol', header: 'Rol', alignment: 'center' }
    ];
    this.getAll();
  }

  getAll(){
    this.sp.show('sp');
    this.service.getAll().pipe(
      catchError(err => {
        console.error(err);
        this.sp.hide('sp');
        return of(null);
      })
    ).subscribe(data => {
      console.log('get all user', data);
      this.users = data.entities;
      this.sp.hide('sp');
    })
  }

  new() {
    this.urlDataService.id = 0;
    this.router.navigate(['/admin/user/edit']);
  }


  disable(row : any){
    this.sp.show('sp');
    this.service.disable(row).pipe(
      catchError(err => {
        console.error(err);
        this.messageService.add({severity: TypeToast.ERROR, summary:'Error!', detail: 'No se pudo desactivar el usuario.'});
        this.getAll();
        return of(null);
      })
    ).subscribe(data => {
      this.messageService.add({severity: TypeToast.SUCCESS, summary:'Éxito!', detail: 'Usuario desactivado correctamente.'});
      this.getAll();
    })
  }

  edit(row : any){
    this.urlDataService.id = row.id;
    this.router.navigate(['/admin/user/edit']);
  }

}
