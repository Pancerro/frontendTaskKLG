export interface ITable {
  fields: Array<ITableField | string>;
  keys?: Array<string>;
  allKeys?: Array<string>;
  types?: Array<{[key: string]: ETableFieldType}>;
  headers?: Array<string>;
  rows: Array<any>;
  options: ITableOptions;
}

export enum ETableFieldType {
  None = '',
}

export interface ITableField {
  key: string;
  header: string;
  type?: [];
  callback?: any;
  className?: string | string [];
}

export interface ITableOptions {
  className?: string;
  actions?: Array<ITableAction>;
  activeEnabled?: boolean;
}

export interface ITableAction {
  disabled: boolean;
  label: string;
  callback: any;
}
