import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditathleticsComponent } from './editathletics.component';

describe('EditathleticsComponent', () => {
  let component: EditathleticsComponent;
  let fixture: ComponentFixture<EditathleticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditathleticsComponent]
    });
    fixture = TestBed.createComponent(EditathleticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
