import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesurvtagComponent } from './updatesurvtag.component';

describe('UpdatesurvtagComponent', () => {
  let component: UpdatesurvtagComponent;
  let fixture: ComponentFixture<UpdatesurvtagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatesurvtagComponent]
    });
    fixture = TestBed.createComponent(UpdatesurvtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
