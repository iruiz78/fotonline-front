import { read, utils, WorkBook, WorkSheet } from 'xlsx';

export class FileValidator {
  public static ValidateFileExcel(file: File, arrayColumns: Array<{ property: string; typeProperty: string; }>): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader: FileReader = new FileReader();

      fileReader.onload = (e: any) => {
        const arrayBuffer: any = e.target.result;
        const data: Uint8Array = new Uint8Array(arrayBuffer);
        const workbook: WorkBook = read(data, { type: 'array' });
        const worksheet: WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: any[] = utils.sheet_to_json(worksheet, { header: 1 });

        if (json.length === 1 && json[0].length === 0) {
          reject("El archivo está vacío");
        } else {
          const columnsFile = json[0].map((columna: any) => columna.toUpperCase());
          const expectedColumns = arrayColumns.map(obj => obj.property);
          if (!FileValidator.validateColumnOrder(columnsFile, expectedColumns)) {
            reject("El archivo no tiene el formato correcto");
          } else if (json.length === 1) {
            reject("El archivo no tiene registros a procesar");
          }else if (FileValidator.hasEmptyCells(json)) {
            reject("El archivo contiene celdas vacias");
          }
          else{
            const validationError = FileValidator.validateCellTypes(json, arrayColumns);
            if (validationError) {
              reject(`El archivo contiene un dato no válido en la columna '${validationError.column}': ${validationError.data}`);
            }
            else{
              resolve(""); // El archivo es válido, resuelve la promesa con una cadena vacía
            }
          }
        }
      };

      fileReader.onerror = (e: any) => {
        reject("Error al leer el archivo");
      };

      fileReader.readAsArrayBuffer(file);
    });
  }

  private static hasEmptyCells(json: any[]): boolean {
    for (let i = 1; i < json.length; i++) {
      const row = json[i];
      for (let j = 0; j < row.length; j++) {
        const cellValue = row[j];
        if (FileValidator.isEmptyCellValue(cellValue)) {
          return true;
        }
      }
    }
    return false;
  }

  private static validateColumnOrder(columnsFile: string[], expectedColumns: string[]): boolean {
    if (columnsFile.length < expectedColumns.length) {
      return false;
    }
    for (let i = 0; i < expectedColumns.length; i++) {
      if (columnsFile[i] !== expectedColumns[i]) {
        return false;
      }
    }
    return true;
  }

  public static validateCellTypes(json: any[], arrayColumns: Array<{ property: string; typeProperty: string; }>): { isValid: boolean; column: string; data: any } | null {
    for (let i = 1; i < json.length; i++) {
      const rowData = json[i];
      for (let j = 0; j < rowData.length; j++) {
        const cellValue = rowData[j];
        const typeProperty = arrayColumns[j].typeProperty;
        var typeCellValue=typeof cellValue;
        if(typeCellValue =='number' && FileValidator.validatePercentageValue(cellValue)){
          typeCellValue="string";
        }
        if(typeCellValue =='number' && typeProperty =='number' && !Number.isInteger(cellValue)){
          return { isValid: false, column: arrayColumns[j].property, data: cellValue };
        }
        if (typeCellValue !== typeProperty && typeProperty != "object") {
          return { isValid: false, column: arrayColumns[j].property, data: cellValue }; // El tipo de celda no coincide con el typeProperty correspondiente
        }
        if (typeCellValue=='number' && typeProperty == 'object' || typeCellValue=='string' && typeProperty == 'object'){
          const dateValue = new Date(cellValue);
          if (isNaN(dateValue.getTime())) {
            return { isValid: false, column: arrayColumns[j].property, data: cellValue };
          }
        }
      }
    }
    return null; // Todas las celdas tienen los tipos de datos correctos
  }

  private static isEmptyCellValue(cellValue: any): boolean {
    return cellValue === null || cellValue === undefined || cellValue === "";
  }

  private static validatePercentageValue(value: number): boolean {
    if (value > 0 && value <= 1) {
      return true;
    }
    return false;
  }
}
