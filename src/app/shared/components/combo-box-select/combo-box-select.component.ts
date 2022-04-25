import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {debounceTime, map, startWith, tap} from "rxjs/operators";
import {merge, Observable} from 'rxjs';
import {FormControl} from "@angular/forms";
import {ListItem} from "../../model/list-item";

@Component({
  selector: 'app-combobox-select',
  templateUrl: './combo-box-select.component.html',
  styleUrls: ['./combo-box-select.component.scss']
})
export class ComboBoxSelectComponent implements OnChanges {
  isReady = false;
  filteredValues: Observable<ListItem[]> | undefined;

  @Input()
  list: ListItem[] = [];

  @Input()
  title: string = '';

  @Input()
  required: boolean = false;

  @Input()
  myControl: FormControl | any;

  @Output()
  event = new EventEmitter();

  private clickEvent = new EventEmitter<string>();
  private typeEvent = new EventEmitter<string>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const myControlChanges = changes['myControl'];
    const listChanges = changes['list'];
    if (this.list.length < 1 && !this.required) {
      this.list.push({value: '', name: ''})
    }
    if ((myControlChanges || listChanges) && this.myControl && this.list) {
      this.init();
    }

    if (changes['required'] || changes['customError']) {
      if (this.myControl) {
        this.checkRequiredError(this.myControl.value);
      }
    }

    this.changeDetectorRef.detectChanges();
  }

  init(): void {
    this.filteredValues = merge(this.clickEvent.asObservable(), this.typeEvent.asObservable().pipe(debounceTime(100))).pipe(
      startWith(''),
      tap(value => this.checkRequiredError(value)),
      map(value => this.filter(value)),
    );
    this.isReady = true;
  }

  displayFunction = (value: string | ListItem): string => {
    if (!value) {
      return '';
    }
    let item: any;
    if (value instanceof ListItem) {
      item = this.list.find(i => i.value === value.value);
    } else {
      item = this.list.find(i => i.value === value.toString());
    }

    return item !== undefined ? item.name : '';
  }

  private emitEventIfValid(value: string, list: ListItem[]) {
    if (list) {
      const item = list.find(it => it.name === value);
      if (item && this.myControl) {
        this.myControl.setValue(item.value);
        this.event.emit(item);
      }
    }
  }

  private checkRequiredError(value: string): void {
    if (this.myControl && !this.myControl.value && value === '' && this.required) {
      this.myControl.setErrors({required: true});
    } else {
      if (this.myControl && this.myControl.errors) {
        delete this.myControl.errors['required'];
      }

      if (this.myControl && this.myControl.errors !== null && Object.keys(this.myControl.errors).length === 0) {
        this.myControl.setErrors(null);
      }
    }
  }

  private checkInvalidError(value: string, list: ListItem[]): void {
    if (value) {
      if (this.myControl && this.myControl.value && list) {
        const listItem = list.find(it => {
          if (this.myControl) {
            return it.value === this.myControl.value
          }
          return null;
        });
        if (listItem) {
          value = listItem.name;
        }
      }
    }
    const filteredValues = list.filter(v => v.name.toLowerCase() === value.toLowerCase());
    let item;
    if (filteredValues) {
      item = filteredValues.find(it => it.name === value);
    }
    if (value
      && ((!item && filteredValues)
        || (item))) {
      if (this.myControl && this.myControl.errors) {
        delete this.myControl.errors['invalid'];
      }
    } else if (value && this.myControl) {
      this.myControl.setErrors({invalid: true});
    }
  }

  private filter(value: string): Array<ListItem> {

    const listItems = (value !== '') ? this.list.filter(option =>
      option.name.toLowerCase().includes(value.toLowerCase())
    ) : this.list;

    this.emitEventIfValid(value, listItems);
    this.checkInvalidError(value, listItems);
    return listItems;
  }

  onInput(event: Event): void {
    // @ts-ignore
    this.typeEvent.emit(event.target['value'] as string);
  }

  onItemClick(obj: MatAutocompleteSelectedEvent): void {
    this.clickEvent.emit(obj.option.value);
  }
}
