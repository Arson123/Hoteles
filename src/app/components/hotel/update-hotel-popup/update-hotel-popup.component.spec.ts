import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHotelPopupComponent } from './update-hotel-popup.component';

describe('UpdateHotelPopupComponent', () => {
  let component: UpdateHotelPopupComponent;
  let fixture: ComponentFixture<UpdateHotelPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHotelPopupComponent]
    });
    fixture = TestBed.createComponent(UpdateHotelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
