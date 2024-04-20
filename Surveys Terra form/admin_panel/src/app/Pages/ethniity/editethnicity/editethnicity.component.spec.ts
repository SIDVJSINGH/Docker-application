import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditethnicityComponent } from './editethnicity.component';

describe('EditethnicityComponent', () => {
  let component: EditethnicityComponent;
  let fixture: ComponentFixture<EditethnicityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditethnicityComponent]
    });
    fixture = TestBed.createComponent(EditethnicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
