import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveManagementComponent } from './reserve-management.component';

describe('ReserveManagementComponent', () => {
  let component: ReserveManagementComponent;
  let fixture: ComponentFixture<ReserveManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveManagementComponent]
    });
    fixture = TestBed.createComponent(ReserveManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
