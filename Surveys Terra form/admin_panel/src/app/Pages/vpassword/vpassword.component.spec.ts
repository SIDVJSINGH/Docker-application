import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VpasswordComponent } from './vpassword.component';

describe('VpasswordComponent', () => {
  let component: VpasswordComponent;
  let fixture: ComponentFixture<VpasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VpasswordComponent]
    });
    fixture = TestBed.createComponent(VpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
