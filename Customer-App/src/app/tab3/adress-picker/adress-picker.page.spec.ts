import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdressPickerPage } from './adress-picker.page';

describe('AdressPickerPage', () => {
  let component: AdressPickerPage;
  let fixture: ComponentFixture<AdressPickerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdressPickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
