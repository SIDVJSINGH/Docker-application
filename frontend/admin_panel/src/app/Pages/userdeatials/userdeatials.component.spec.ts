import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdeatialsComponent } from './userdeatials.component';

describe('UserdeatialsComponent', () => {
  let component: UserdeatialsComponent;
  let fixture: ComponentFixture<UserdeatialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserdeatialsComponent]
    });
    fixture = TestBed.createComponent(UserdeatialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
