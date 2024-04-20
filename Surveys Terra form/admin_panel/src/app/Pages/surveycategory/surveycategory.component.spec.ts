import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveycategoryComponent } from './surveycategory.component';

describe('SurveycategoryComponent', () => {
  let component: SurveycategoryComponent;
  let fixture: ComponentFixture<SurveycategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveycategoryComponent]
    });
    fixture = TestBed.createComponent(SurveycategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
