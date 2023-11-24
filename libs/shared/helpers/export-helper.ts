import * as saveAs from "file-saver";

export class ExportHelper {
  public static exportExcel(values: any[], fileExportName: string = 'table-export') {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.castBooleanToString(values));
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, fileExportName);
    });
  }

  private static saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    saveAs(data, fileName + EXCEL_EXTENSION);
  }

  public static exportPdf(values: any[], columns : any, fileName : string){
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          const doc = new jsPDF.default();
          let PDF_EXTENSION = ".pdf";
          (doc as any).autoTable(columns, this.castBooleanToString(values));
          doc.save(fileName + PDF_EXTENSION);
      })
    })
  }

  private static castBooleanToString(values : any[]) : any[]{
    let returnedTarget = JSON.parse(JSON.stringify(values));
    returnedTarget.forEach(obj => {
      for (var property in obj) {
        if (typeof obj[property] === 'boolean') {
          obj[property] = obj[property] ? 'Sí' : 'No';
        }
      }
    });
    return returnedTarget;
  }
}

