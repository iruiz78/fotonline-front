export class GenericResponse<T> {
  pageCount: number;
  rowCount: number;
  statusCode: number;
  message: string;
  entities: Array<T> = new Array<T>();
  entity: T;
}
