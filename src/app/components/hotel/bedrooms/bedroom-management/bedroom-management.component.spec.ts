import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedroomManagementComponent } from './bedroom-management.component';

describe('BedroomManagementComponent', () => {
  let component: BedroomManagementComponent;
  let fixture: ComponentFixture<BedroomManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BedroomManagementComponent]
    });
    fixture = TestBed.createComponent(BedroomManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
