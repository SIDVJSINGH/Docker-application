import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditstateComponent } from './editstate.component';

describe('EditstateComponent', () => {
  let component: EditstateComponent;
  let fixture: ComponentFixture<EditstateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditstateComponent]
    });
    fixture = TestBed.createComponent(EditstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
