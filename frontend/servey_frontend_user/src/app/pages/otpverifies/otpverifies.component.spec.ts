import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpverifiesComponent } from './otpverifies.component';

describe('OtpverifiesComponent', () => {
  let component: OtpverifiesComponent;
  let fixture: ComponentFixture<OtpverifiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpverifiesComponent]
    });
    fixture = TestBed.createComponent(OtpverifiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
