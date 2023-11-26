import { Component, Input, OnInit, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { TableConfiguration } from './models/table';
import { Option } from './models/option';
import { ExportHelper } from '../helpers/export-helper';
import * as moment from 'moment';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {
  @Input() value: any[];
  @Input() columns: any;
  @Input() dropdownOption: Option[];
  @Input() configuration: TableConfiguration;
  @Output() editEvent = new EventEmitter<object>();
  @Output() deleteEvent = new EventEmitter<object>();
  @Output() otherEvent = new EventEmitter<object>();
  @Output() otherEvent2 = new EventEmitter<object>();
  @Output() printEvent = new EventEmitter<object>();
  @Output() checkBoxEvent = new EventEmitter<object>();
  @Output() newEvent = new EventEmitter<object>();
  @Output() dropdownEvent = new EventEmitter<object>();

  @ViewChild(Table, { static: false }) dataTable: Table;

  cols: any[];
  selectedOption:  Option | undefined;
  _selectedColumns: any[];
  listTranslateGenerals: any = {};
  subcription: Subscription = new Subscription();
  exportColumns: any[];
  textSearch: string;

  constructor(public confirmationService : ConfirmationService) { }

  ngOnInit(): void {
    this._selectedColumns = this.columns;
    this.exportColumns = this.columns.map(col => ({ title: col.header, dataKey: col.field }));
  }

  ngOnDestroy(): void {
    if(this.subcription)
      this.subcription.unsubscribe();
  }

  mapData(rowData: any, col: any) {
    if(typeof rowData[col.field] === 'boolean')
      return rowData[col.field] != true ? 'No' : 'Si';

    if(typeof rowData[col.field] === 'object') {
      if([col.nameField])
        return rowData[col.field]?.[col.subfield]?.[col.nameField] != null ? rowData[col.field]?.[col.subfield]?.[col.nameField] : 'Sin Datos';
      else
        return rowData[col.field]?.[col.subfield] != null ? rowData[col.field]?.[col.subfield] : 'Sin Datos';
    }
    //si llego aca con data true espprque la fecha es vacia.
    if(col.data)
      return 'Sin Datos'

    return rowData[col.field];
  }

  remove(rowData: any) {
    this.confirmationService.confirm({
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      message: this.configuration.confirmDialog.message,
      accept: () => {
        this.deleteEvent.emit(rowData);
        let index = this.value.findIndex(x => x === rowData);
        this.value.splice(index, 1);
        this.dataTable._value = this.value;

        this.confirmationService.close();
      },
      reject: () => {
        this.confirmationService.close();
      }
    });

  }

  exportPdf() {
    ExportHelper.exportPdf(this.value, this.exportColumns, this.configuration.fileExportName);
  }

  exportExcel() {
    const formattedData = this.value.map(item => {
      const exportObject: any = {};
      this.columns.forEach(col => {
        if (col.data && col.format && item[col.field] !== '0001-01-01T00:00:00') {
          const formattedValue = moment(item[col.field]).format(col.format.toUpperCase());
          exportObject[col.header] = formattedValue;
        } else if (col.data) {
          exportObject[col.header] = "";
        } else {
          exportObject[col.header] = item[col.field];
        }
      });
      return exportObject;
    });

    ExportHelper.exportExcel(formattedData, this.configuration.fileExportName);
  }

  search(dt: any) {
    this.dataTable.filterGlobal(this.textSearch, 'contains');
  }

  get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    this._selectedColumns = this.columns.filter(col => val.includes(col));
  }

  clearFilter(dt: any) {
    this.textSearch = '';
    dt.clear();
  }

  goToEdit(rowData: any) {
    this.editEvent.emit(rowData);
  }

  goToOther(rowData: any) {
    this.otherEvent.emit(rowData);
  }

  goToOther2(rowData: any) {
    this.otherEvent2.emit(rowData);
  }

  goToPrint(rowData: any) {
    this.printEvent.emit(rowData);
  }

  goToCheckBox(rowData: any){
    this.checkBoxEvent.emit(rowData);
  }

  goToNew() {
    this.newEvent.emit();
  }

  changeDropdownEvent(){
    this.dropdownEvent.emit(this.selectedOption);
  }
}
