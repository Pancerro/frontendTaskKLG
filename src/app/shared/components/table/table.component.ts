import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITable, ITableField, ITableOptions} from "../../model/table.model";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {TableData} from "../../model/table.data";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() fields: Array<ITableField> = [];
  @Input() headers: Array<string> = [];
  @Input() keys: Array<string> = [];
  @Input() rows: Array<any> = [];
  @Input() options: ITableOptions | any;
  @ViewChild(MatTable) table: MatTable<any> | any;

  dataSource: MatTableDataSource<any[]> | any;
  tableData: ITable | any;

  constructor() { }

  ngOnInit(): void {
  }

  prepareTableData(): void {
    this.tableData = new TableData({
      fields: this.fields,
      keys: this.keys,
      headers: this.headers,
      rows: this.rows,
      options: this.options
    }).getData();
    this.dataSource = new MatTableDataSource(this.tableData.rows);
    this.dataSource.data = this.tableData.rows;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.prepareTableData();
    }
  }

  sort(sort: Sort): void {
    const data = this.rows.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return compare(a[sort.active], b[sort.active], isAsc);
    });  }
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
