import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PRIMENG
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { EmptyElementsComponent } from './empty-elements/empty-elements.component';
import { TableComponent } from './table/table.component';

@NgModule({
    declarations: [
        TableComponent,
        EmptyElementsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        MultiSelectModule,
        ConfirmDialogModule,
        InputTextModule,
        CheckboxModule,
        DropdownModule
     ],
    exports: [
        TableComponent,
        EmptyElementsComponent
    ],
    providers: [
        ConfirmationService
    ],
})
export class SharedModule {}
