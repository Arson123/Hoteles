import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBedroomPopupComponent } from './create-bedroom-popup.component';

describe('CreateBedroomPopupComponent', () => {
  let component: CreateBedroomPopupComponent;
  let fixture: ComponentFixture<CreateBedroomPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBedroomPopupComponent]
    });
    fixture = TestBed.createComponent(CreateBedroomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
