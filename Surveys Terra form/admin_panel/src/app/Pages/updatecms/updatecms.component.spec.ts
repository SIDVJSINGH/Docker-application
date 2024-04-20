import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecmsComponent } from './updatecms.component';

describe('UpdatecmsComponent', () => {
  let component: UpdatecmsComponent;
  let fixture: ComponentFixture<UpdatecmsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatecmsComponent]
    });
    fixture = TestBed.createComponent(UpdatecmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
