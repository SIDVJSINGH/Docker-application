import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveytemplComponent } from './surveytempl.component';

describe('SurveytemplComponent', () => {
  let component: SurveytemplComponent;
  let fixture: ComponentFixture<SurveytemplComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveytemplComponent]
    });
    fixture = TestBed.createComponent(SurveytemplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
