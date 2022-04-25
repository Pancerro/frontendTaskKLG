import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableComponent} from "./components/table/table.component";
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MaterialModule} from "../material/material.module";
import { ComboBoxSelectComponent } from './components/combo-box-select/combo-box-select.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ComboBoxRadioComponent } from './components/combo-box-radio/combo-box-radio.component';
import { ComboBoxCheckboxComponent } from './components/combo-box-checkbox/combo-box-checkbox.component';

@NgModule({
  declarations: [
    TableComponent,
    ConfirmDialogComponent,
    ComboBoxSelectComponent,
    ComboBoxRadioComponent,
    ComboBoxCheckboxComponent,
  ],
  exports: [
    TableComponent,
    ComboBoxSelectComponent,
    ComboBoxRadioComponent,
    ComboBoxCheckboxComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class SharedModule { }
