import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BaseComponent} from "../../../../shared/components/base/base.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ListItem} from "../../../../shared/model/list-item";
import {ROUTE} from "../../../../routes-names";
import {takeUntil} from "rxjs/operators";
import {ConfirmDialogComponent} from "../../../../shared/components/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-edit-list',
  templateUrl: './add-edit-list.component.html',
  styleUrls: ['./add-edit-list.component.scss']
})
export class AddEditListComponent extends BaseComponent implements OnInit {
  id: string = this.route.snapshot.params['id'];
  addListForm: FormGroup = this.createFormGroups();
  title: string = '';
  selectList: Array<ListItem> = [
    new ListItem('1', '1'),
    new ListItem('2','2'),
    new ListItem('3','3')
  ];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              protected override route: ActivatedRoute,
              private titleService: Title,
              private dialog: MatDialog) {
    super(route);
  }

  ngOnInit(): void {
    this.getTitleAndMode();
  }

  findFormControl(formControlName: string): FormControl | null {
    if (this.addListForm) {
      return this.addListForm.get(formControlName) as FormControl;
    } else {
      return null;
    }
  }

  createFormGroups(): FormGroup {
     return this.formBuilder.group({
       name: ['', Validators.required],
       triggerName: ['', Validators.required],
       triggerDataKnow: [''],
       isInterimTrigger: [''],
       interimTriggerName: [''],
       constraintName: ['', Validators.required],
       constraintValueKnow: [''],
       effectiveDeadlineInfo: ['', Validators.required],
       relatedProcessingBasisReferenceType: [''],
       checkboxValue: [''],
       description: ['']
    });
  }

  getTitleAndMode(): void {
    switch (this.id) {
      case this.FormMode.CREATE: {
        this.title = 'Trigger and Constraint Schemes - New';
        this.mode = this.FormMode.CREATE;
        break;
      }
      case this.FormMode.EDIT: {
        this.title = 'Trigger and Constraint Schemes - Edit';
        this.mode = this.FormMode.EDIT;
        this.patchForm();
        break;
      }
      case this.FormMode.VIEW: {
        this.title = 'Trigger and Constraint Schemes - View';
        this.mode = this.FormMode.VIEW;
        this.patchForm();
        this.addListForm.disable();
        break;
      }
    }
    super.setTitle(this.titleService);
  }

  save(): void {
    if (this.addListForm.valid) {
      console.log(this.addListForm.value);
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: `Save record`,
          confirm: 'Ok'
        }
      }).afterClosed().subscribe(res => {
        if (res) {
          this.cancel();
        }
      });
    }
  }

  cancel(): void {
    this.router.navigateByUrl(ROUTE.HOME);
  }

  patchForm(): void {
    this.route.queryParamMap.pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
      this.addListForm.patchValue(res);
      this.findFormControl('name')?.setValue(res.get('name'))
    });
  }

  addCheckboxValue(event: any): void {
    this.findFormControl('checkboxValue')?.setValue(event.join(','));
  }

}
