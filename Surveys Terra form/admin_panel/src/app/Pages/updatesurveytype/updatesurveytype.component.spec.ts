import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesurveytypeComponent } from './updatesurveytype.component';

describe('UpdatesurveytypeComponent', () => {
  let component: UpdatesurveytypeComponent;
  let fixture: ComponentFixture<UpdatesurveytypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatesurveytypeComponent]
    });
    fixture = TestBed.createComponent(UpdatesurveytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
