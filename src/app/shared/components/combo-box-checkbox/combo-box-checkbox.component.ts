import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {ListItem} from "../../model/list-item";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-combobox-checkbox',
  templateUrl: './combo-box-checkbox.component.html',
  styleUrls: ['./combo-box-checkbox.component.scss']
})
export class ComboBoxCheckboxComponent {
  isReady = false;
  checkboxTable = [false, false, false];
  @Input()
  list: ListItem[] = [];

  @Input()
  myControl: FormControl | any;

  @Output()
  event = new EventEmitter();

  constructor(
    private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnChanges(): void {
    if (this.list.length < 1) {
      this.list.push({value: '', name: ''})
    }
    this.changeDetectorRef.detectChanges();
  }

  onItemClick(obj: any, index: number): void {
    this.checkboxTable[index] = obj.checked;
    this.event.emit(this.checkboxTable);
  }

}
