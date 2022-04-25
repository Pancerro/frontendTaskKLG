import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxSelectComponent } from './combo-box-select.component';

describe('ComboxComponent', () => {
  let component: ComboBoxSelectComponent;
  let fixture: ComponentFixture<ComboBoxSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboBoxSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
