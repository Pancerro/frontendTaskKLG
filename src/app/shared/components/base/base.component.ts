import {Directive, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import { ROUTE } from 'src/app/routes-names';
import {ModeFormEnum} from "../../model/mode-form-enum";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Directive()
export class BaseComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  mode: ModeFormEnum = ModeFormEnum.VIEW;
  FormMode = ModeFormEnum;
  ROUTE = ROUTE;

  constructor(protected route?: ActivatedRoute) { }

  ngOnInit(): void {
  }

  setTitle(titleService: Title): void {
    const title = this.getTitle();
    if (title) {
      titleService.setTitle(title);
    } else {
      titleService.setTitle('Default Title');
    }
  }

  getTitle(): string {
    let child = this.route;
    while (child) {
      if (child.firstChild) {
        child = child.firstChild;
      } else if (this.hasDataAndMode(child, ModeFormEnum.EDIT) && child.snapshot.data['title'].edit) {
        return child.snapshot.data['title'].edit;
      } else if (this.hasDataAndMode(child, ModeFormEnum.VIEW) && child.snapshot.data['title'].view) {
        return child.snapshot.data['title'].view;
      } else if (this.hasDataAndMode(child, ModeFormEnum.CREATE) && child.snapshot.data['title'].create) {
        return child.snapshot.data['title'].create;
      } else if (child.snapshot.data && child.snapshot.data['title'] && typeof child.snapshot.data['title'] === 'string') {
        return child.snapshot.data['title'];
      } else {
        return '';
      }
    }
    return '';
  }

  hasDataAndMode(child: ActivatedRoute, mode: ModeFormEnum) {
    return child.snapshot.data && this.mode === mode;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
