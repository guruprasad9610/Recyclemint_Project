import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PickupDetailsPage } from './pickup-details.page';

describe('PickupDetailsPage', () => {
  let component: PickupDetailsPage;
  let fixture: ComponentFixture<PickupDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PickupDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
