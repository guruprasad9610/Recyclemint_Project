import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwiperPagesPage } from './swiper-pages.page';

describe('SwiperPagesPage', () => {
  let component: SwiperPagesPage;
  let fixture: ComponentFixture<SwiperPagesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SwiperPagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
