import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboBoxRadioComponent } from './combo-box-radio.component';

describe('ComboBoxRadioComponent', () => {
  let component: ComboBoxRadioComponent;
  let fixture: ComponentFixture<ComboBoxRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboBoxRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboBoxRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
