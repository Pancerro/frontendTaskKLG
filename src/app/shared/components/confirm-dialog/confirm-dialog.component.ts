import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent  {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDeleteClick(): void {
    this.data.isConfirmClicked = true;
    this.dialogRef.close(this.data.isConfirmClicked)
  }

}

export interface DialogData {
  title: string;
  description: string;
  cancel: string;
  confirm: string;
  isConfirmClicked: boolean;
}
