import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditraceComponent } from './editrace.component';

describe('EditraceComponent', () => {
  let component: EditraceComponent;
  let fixture: ComponentFixture<EditraceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditraceComponent]
    });
    fixture = TestBed.createComponent(EditraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
