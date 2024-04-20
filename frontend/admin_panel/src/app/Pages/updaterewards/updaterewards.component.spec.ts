import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdaterewardsComponent } from './updaterewards.component';

describe('UpdaterewardsComponent', () => {
  let component: UpdaterewardsComponent;
  let fixture: ComponentFixture<UpdaterewardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdaterewardsComponent]
    });
    fixture = TestBed.createComponent(UpdaterewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
