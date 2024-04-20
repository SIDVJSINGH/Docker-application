import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddathleticsComponent } from './addathletics.component';

describe('AddathleticsComponent', () => {
  let component: AddathleticsComponent;
  let fixture: ComponentFixture<AddathleticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddathleticsComponent]
    });
    fixture = TestBed.createComponent(AddathleticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
