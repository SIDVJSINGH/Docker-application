import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddethnicityComponent } from './addethnicity.component';

describe('AddethnicityComponent', () => {
  let component: AddethnicityComponent;
  let fixture: ComponentFixture<AddethnicityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddethnicityComponent]
    });
    fixture = TestBed.createComponent(AddethnicityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
