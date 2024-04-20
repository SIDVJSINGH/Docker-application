import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcreateuserComponent } from './dialogcreateuser.component';

describe('DialogcreateuserComponent', () => {
  let component: DialogcreateuserComponent;
  let fixture: ComponentFixture<DialogcreateuserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogcreateuserComponent]
    });
    fixture = TestBed.createComponent(DialogcreateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
