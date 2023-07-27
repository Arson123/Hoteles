import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHotelPopupComponent } from './create-hotel-popup.component';

describe('CreateHotelPopupComponent', () => {
  let component: CreateHotelPopupComponent;
  let fixture: ComponentFixture<CreateHotelPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateHotelPopupComponent]
    });
    fixture = TestBed.createComponent(CreateHotelPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
