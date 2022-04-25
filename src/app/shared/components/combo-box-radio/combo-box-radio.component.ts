import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ListItem} from "../../model/list-item";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-combobox-radio',
  templateUrl: './combo-box-radio.component.html',
  styleUrls: ['./combo-box-radio.component.scss']
})
export class ComboBoxRadioComponent {
  isReady = false;

  @Input()
  list: ListItem[] = [];

  @Input()
  title: string = '';

  @Input()
  myControl: FormControl | any;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnChanges(): void {
    if (this.list.length < 1) {
      this.list.push({value: '', name: ''})
    }
    this.changeDetectorRef.detectChanges();
  }

}
