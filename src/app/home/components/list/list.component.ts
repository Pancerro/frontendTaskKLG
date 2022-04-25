import { Component, OnInit } from '@angular/core';
import {BaseListComponent} from "../../../shared/components/base/base-list.component";
import {List} from "../../model/list.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ITableField, ITableOptions} from "../../../shared/model/table.model";
import {Title} from "@angular/platform-browser";
import {DataService} from "../../services/data.service";
import {CrudService} from "../../../shared/services/crud.service";
import {ROUTE} from "../../../routes-names";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseListComponent<List> implements OnInit {
  listData: Array<List> = [];
  fields: Array<ITableField> | any;
  options: ITableOptions | any;

  constructor(protected override route: ActivatedRoute,
              private router: Router,
              private dataService: DataService,
              private titleService: Title,
              private dialog: MatDialog) {
    super(route);
    this.fields = this.prepareFields();
    this.options = this.prepareOptions();
  }

  ngOnInit(): void {
    super.ngOnInit();
    super.setTitle(this.titleService);
  }

  prepareData(data: Array<List>): void {
    this.listData = [];
    if (data && data.length) {
      for (let singleData of data) {
        const cloneData = JSON.parse(JSON.stringify(singleData));
        cloneData._name = cloneData.name;
        cloneData._description = cloneData.description;
        cloneData._triggerName = cloneData.triggerName;
        cloneData._interimTriggerName = cloneData.interimTriggerName;
        cloneData.__effectiveDeadlineInfo = cloneData.effectiveDeadlineInfo;
        this.listData.push(cloneData);
      }
    }
  }

  private prepareFields(): ITableField[] {
    return [
      {
        key: '_name',
        header: 'Name',
        className: ['width-30p', 'min-width-30p', 'ellipsis']
      },
      {
        key: '_description',
        header: 'Description',
        className: ['width-15p', 'min-width-15p', 'ellipsis']
      },
      {
        key: '_triggerName',
        header: 'Trigger Name',
        className: ['width-15p', 'min-width-15p', 'ellipsis']
      },
      {
        key: '_interimTriggerName',
        header: 'Interim Trigger Name',
        className: ['width-15p', 'min-width-15p', 'ellipsis']
      },
      {
        key: '_effectiveDeadlineInfo',
        header: 'Effective Deadline Info',
        className: ['width-15p', 'min-width-15p', 'ellipsis']
      }
    ]
  }

  private prepareOptions(): ITableOptions {
    const actions = [
      {
        disabled: false,
        label: 'view',
        tooltip: 'View element',
        callback: (_id: any, row: List) => {
          this.view(_id, row);
        }
      },
      {
        disabled: false,
        label: 'edit',
        tooltip: 'Edit element',
        callback: (_id: any, row: List) => {
          this.edit(_id, row);
        }
      },
      {
        disabled: false,
        label: 'download',
        tooltip: 'Download element',
        callback: (_id: any, row: List) => {
          console.log(_id);
        }
      },
      {
        disabled: false,
        label: 'remove',
        tooltip: 'Remove element',
        callback: (_id: any, row: List) => {
          this.remove(_id, row);
        }
      }
    ]
    return {
      activeEnabled: true,
      actions: actions
    }
  }

  protected getCrudService(): CrudService<List> | null {
    return this.dataService;
  }

  add(): void {
    this.router.navigateByUrl(`${ROUTE.HOME_DETAILS}/CREATE`);
  }

  view(id: number, row: List): void {
    this.router.navigate([`${ROUTE.HOME_DETAILS}/VIEW`], {queryParams: row});
  }

  edit(id: number, row: List): void {
    this.router.navigate([`${ROUTE.HOME_DETAILS}/EDIT`], {queryParams: row});
  }

  remove(id: number, row: List): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: `Delete record index: ${id}?`,
        description: ``,
        cancel: 'Cancel',
        confirm: 'Delete'
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.listData = this.listData.filter(data => data.id !== id);
      }
    });
  }
}
