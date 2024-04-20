import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstateComponent } from './addstate.component';

describe('AddstateComponent', () => {
  let component: AddstateComponent;
  let fixture: ComponentFixture<AddstateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddstateComponent]
    });
    fixture = TestBed.createComponent(AddstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
