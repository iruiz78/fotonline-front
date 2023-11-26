export class TableConfiguration {
  resizableColumns: boolean = true;
  paginator: boolean = true;
  rows: number = 5;
  showCurrentPageReport: boolean = true;
  rowsPerPageOptions: any[] = [5, 20, 50, { showAll: 'Todos' } ];
  globalFilterFields: string[];
  reorderableColumns: boolean = true;
  responsive: boolean = true;
  rowHover: boolean = true;
  fileExportName: string = "table";
  disabledSearchKeywords: boolean = false;
  showDropdownColumn: boolean = true;
  checkDisabled: boolean = true;
  showDropdownGeneric: boolean = false;
  export : any = {
    pdf : true,
    xls : true,
    csv : true
  }
  events: any = {
    enabled: true,
    editEvent: true,
    deleteEvent: true,
    otherEvent: false,
    otherEvent2: false,
    printEvent: false,
    newEvent: false,
    showDetailsSales: false,
    checkBoxEvent : false,
    otherEventIcon: 'pi pi-ellipsis-h'
  }
  alwaysShowPaginator : boolean = true;
  confirmDialog : any = {
    header : "Eliminar",
    message : "¿Estás seguro de realizar esta acción?",
    enabled : true
  }
  keyDialog : string = 'dialog';
  stateKey : string;
  filter : any = {
    enabled : true,
    clearFilter : true,
    column : true
  }
  showFilters: boolean = true;
  sizes: any = {
    name: 'Normal',
    class: 'p-datatable-striped'
  }
  scrollable: any = {
    active: false,
    scrollHeight: '400px'
  }
  style: any = {
    label: '',
    class: 'p-button-rounded p-button-secondary ml-2'
  }
}
