import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxCheckboxComponent } from './combo-box-checkbox.component';

describe('ComboBoxCheckboxComponent', () => {
  let component: ComboBoxCheckboxComponent;
  let fixture: ComponentFixture<ComboBoxCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboBoxCheckboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
