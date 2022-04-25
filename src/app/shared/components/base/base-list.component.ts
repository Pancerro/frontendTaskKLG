import {Directive, OnInit} from '@angular/core';
import {BaseComponent} from "./base.component";
import {BehaviorSubject} from "rxjs";
import {CrudService} from "../../services/crud.service";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Directive()
export abstract class BaseListComponent<T = any> extends BaseComponent implements OnInit {
  listCount: number = 0;
  protected _isLoading$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this._isLoading$.asObservable();
  protected crudService: CrudService<any> | null | undefined;
  protected constructor(protected override route?: ActivatedRoute) {
    super(route);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.crudService = this.getCrudService();
    this.searchOnFirstPage();
  }

  searchOnFirstPage() {
    this.searchResult();
  }

  searchResult() {
    if (this.crudService) {
      this._isLoading$.next(false);
      this.crudService.getModels()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          this._isLoading$.next(true);
          this.prepareData(result);
          this.listCount = result.length;
        })
    }
  }

  abstract prepareData(data: T[]): void;

  protected getCrudService(): CrudService<T> | null {
    return null;
  }

}
