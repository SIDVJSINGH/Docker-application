import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsportsComponent } from './editsports.component';

describe('EditsportsComponent', () => {
  let component: EditsportsComponent;
  let fixture: ComponentFixture<EditsportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditsportsComponent]
    });
    fixture = TestBed.createComponent(EditsportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
