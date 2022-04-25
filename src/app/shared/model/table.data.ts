import {ETableFieldType, ITable, ITableField, ITableOptions} from "./table.model";
import {UtilsFunctions} from "../functions/utils-functions";
import {isArray, root} from "rxjs/internal-compatibility";

export class TableData {
  protected  newTableData: ITable | any;
  private tableDefaults: ITable = {
    fields: [],
    types: [],
    keys: [],
    allKeys: [],
    rows: [],
    headers: [],
    options: {
      actions: [],
      activeEnabled: false
    }
  };

  constructor(originalTableData: { headers: Array<string> | undefined; keys: Array<string> | undefined;
    options: ITableOptions | undefined; fields: Array<ITableField> | undefined; rows: Array<any> | undefined }) {
    const newTableData: any = (this.tableDefaults);
    for (const i in this.tableDefaults) {
      if (this.tableDefaults.hasOwnProperty(i)) {
        // @ts-ignore
        if (!UtilsFunctions.isUndefined(originalTableData[i])) {
          // @ts-ignore
          if (UtilsFunctions.isObject(originalTableData[i])) {
            // @ts-ignore
            newTableData[i] = {...newTableData[i], ...originalTableData[i]};
          } else {
            // @ts-ignore
            newTableData[i] = originalTableData[i];
          }
        }
      }
    }

    if (originalTableData.fields) {
      if (!isArray(originalTableData.fields)) {
        throw new Error(`Fields parameter needs to be an Array<ITableField | string > !`);
      }

      newTableData.keys = [];
      newTableData.headers = newTableData.headers || [];
      newTableData.types = newTableData.types || [];

      originalTableData.fields?.forEach((v => {
        newTableData.keys.push(v.key);
        newTableData.headers.push(v.header);
        newTableData.types[v.key] = v.type || ETableFieldType.None;
      }));

    } else {
      if (originalTableData.keys) {
        if (!isArray(originalTableData.keys)) {
          throw new Error(`Keys parameter needs to be an Array<string > !`);
        }

        newTableData.fields = [];
        newTableData.headers = newTableData.headers || [];
        newTableData.types = newTableData.types || [];

        originalTableData.keys.forEach((k: string, i: number) => {
          newTableData.fields.push({
            key: k,
            header: newTableData.headers[i] || k,
            type: newTableData.types[k] || ETableFieldType.None
          });
        });
      }
    }

    newTableData.allKeys = [...newTableData.keys];

    if (newTableData.options.actions.length) {
      newTableData.allKeys.push('actions');
    }

    newTableData.rows.forEach((row: any, index: number) => {
      row['_index'] = `${index + 1}`;
    });

    this.newTableData = newTableData;
  }

  public getData(): ITable {
    return this.newTableData;
  }
}
