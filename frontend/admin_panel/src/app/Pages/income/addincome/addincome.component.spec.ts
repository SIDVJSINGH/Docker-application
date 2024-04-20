import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddincomeComponent } from './addincome.component';

describe('AddincomeComponent', () => {
  let component: AddincomeComponent;
  let fixture: ComponentFixture<AddincomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddincomeComponent]
    });
    fixture = TestBed.createComponent(AddincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
