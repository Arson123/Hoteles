import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBedroomPopupComponent } from './update-bedroom-popup.component';

describe('UpdateBedroomPopupComponent', () => {
  let component: UpdateBedroomPopupComponent;
  let fixture: ComponentFixture<UpdateBedroomPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateBedroomPopupComponent]
    });
    fixture = TestBed.createComponent(UpdateBedroomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
