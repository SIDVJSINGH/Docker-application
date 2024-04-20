import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveytypeComponent } from './surveytype.component';

describe('SurveytypeComponent', () => {
  let component: SurveytypeComponent;
  let fixture: ComponentFixture<SurveytypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SurveytypeComponent]
    });
    fixture = TestBed.createComponent(SurveytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
