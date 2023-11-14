import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedAddressPage } from './saved-address.page';

describe('SavedAddressPage', () => {
  let component: SavedAddressPage;
  let fixture: ComponentFixture<SavedAddressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SavedAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
