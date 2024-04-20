import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsportsComponent } from './addsports.component';

describe('AddsportsComponent', () => {
  let component: AddsportsComponent;
  let fixture: ComponentFixture<AddsportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddsportsComponent]
    });
    fixture = TestBed.createComponent(AddsportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
