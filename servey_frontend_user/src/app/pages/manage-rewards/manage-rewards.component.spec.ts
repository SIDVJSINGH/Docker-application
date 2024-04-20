import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRewardsComponent } from './manage-rewards.component';

describe('ManageRewardsComponent', () => {
  let component: ManageRewardsComponent;
  let fixture: ComponentFixture<ManageRewardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRewardsComponent]
    });
    fixture = TestBed.createComponent(ManageRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
