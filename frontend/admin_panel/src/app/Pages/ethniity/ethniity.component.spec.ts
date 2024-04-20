import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthniityComponent } from './ethniity.component';

describe('EthniityComponent', () => {
  let component: EthniityComponent;
  let fixture: ComponentFixture<EthniityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EthniityComponent]
    });
    fixture = TestBed.createComponent(EthniityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
